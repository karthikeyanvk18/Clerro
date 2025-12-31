import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { useSidebar } from "@/contexts/SidebarContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";

export default function EditDebt() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    name: "HDFC Home Loan",
    type: "home_loan",
    principal: "2500000",
    interestRate: "6.5",
    tenure: "20",
    monthlyEMI: "19500",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, submit to API
    alert("Debt updated successfully!");
    navigate(`/debt/${id}`);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this debt? This action cannot be undone.")) {
      navigate("/debts");
    }
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />

        <div className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-40 px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" onClick={() => navigate(`/debt/${id}`)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-h3 font-bold">Edit Debt</h1>
              <p className="text-muted-foreground text-sm mt-1">Update debt details</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
          <Card className="p-4 space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">Debt Name</Label>
              <Input
                id="name"
                placeholder="e.g., HDFC Home Loan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="type" className="text-sm font-medium">Type</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full mt-2 px-3 py-2 rounded-lg border bg-background text-sm"
              >
                <option value="home_loan">Home Loan</option>
                <option value="car_loan">Car Loan</option>
                <option value="personal_loan">Personal Loan</option>
                <option value="credit_card">Credit Card</option>
                <option value="education_loan">Education Loan</option>
              </select>
            </div>

            <div>
              <Label htmlFor="principal" className="text-sm font-medium">Principal Amount (₹)</Label>
              <Input
                id="principal"
                type="number"
                placeholder="0"
                value={formData.principal}
                onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="interest" className="text-sm font-medium">Interest Rate (% p.a)</Label>
              <Input
                id="interest"
                type="number"
                placeholder="0"
                step="0.1"
                value={formData.interestRate}
                onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="tenure" className="text-sm font-medium">Tenure (years)</Label>
              <Input
                id="tenure"
                type="number"
                placeholder="0"
                value={formData.tenure}
                onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="emi" className="text-sm font-medium">Monthly EMI (₹)</Label>
              <Input
                id="emi"
                type="number"
                placeholder="0"
                value={formData.monthlyEMI}
                onChange={(e) => setFormData({ ...formData, monthlyEMI: e.target.value })}
                className="mt-2"
              />
            </div>
          </Card>

          <div className="space-y-2">
            <Button type="submit" className="w-full bg-emerald hover:bg-emerald/90 h-10">
              Update Debt
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full h-10"
              onClick={() => navigate(`/debt/${id}`)}
            >
              Cancel
            </Button>
          </div>
        </form>

        <div className="px-4 pb-4">
          <Button variant="destructive" className="w-full" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Debt
          </Button>
        </div>

        <BottomNav />
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => toggleSidebar()} />

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 p-6">
          <div className="mx-auto max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <Button variant="ghost" onClick={() => navigate(`/debt/${id}`)} className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Debt
              </Button>

              <h1 className="text-h1 font-bold">Edit Debt</h1>
              <p className="text-muted-foreground">Update the debt details</p>
            </motion.div>

            <Card className="p-6 mb-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="font-medium">Debt Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., HDFC Home Loan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="type" className="font-medium">Type</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full mt-2 px-3 py-2 rounded-lg border bg-background text-sm"
                    >
                      <option value="home_loan">Home Loan</option>
                      <option value="car_loan">Car Loan</option>
                      <option value="personal_loan">Personal Loan</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="education_loan">Education Loan</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="principal" className="font-medium">Principal Amount (₹)</Label>
                    <Input
                      id="principal"
                      type="number"
                      placeholder="0"
                      value={formData.principal}
                      onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="interest" className="font-medium">Interest Rate (% p.a)</Label>
                    <Input
                      id="interest"
                      type="number"
                      placeholder="0"
                      step="0.1"
                      value={formData.interestRate}
                      onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tenure" className="font-medium">Tenure (years)</Label>
                    <Input
                      id="tenure"
                      type="number"
                      placeholder="0"
                      value={formData.tenure}
                      onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="emi" className="font-medium">Monthly EMI (₹)</Label>
                    <Input
                      id="emi"
                      type="number"
                      placeholder="0"
                      value={formData.monthlyEMI}
                      onChange={(e) => setFormData({ ...formData, monthlyEMI: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1 bg-emerald hover:bg-emerald/90 h-10">
                    Update Debt
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 h-10" onClick={() => navigate(`/debt/${id}`)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>

            <Card className="p-6 border-destructive/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Delete Debt</h3>
                  <p className="text-sm text-muted-foreground">This action cannot be undone</p>
                </div>
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

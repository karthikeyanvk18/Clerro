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
import { ArrowLeft, CheckCircle, CreditCard } from "lucide-react";

export default function MakePayment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();
  const [step, setStep] = useState<"details" | "confirmation" | "success">("details");
  const [formData, setFormData] = useState({
    amount: "19500",
    paymentMethod: "bank_transfer",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const dueAmount = 19500;
  const remainingBalance = 2425000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmation");
  };

  const handleConfirm = () => {
    // In a real app, submit to API
    setStep("success");
  };

  const handleComplete = () => {
    navigate(`/debt/${id}`);
  };

  // Mobile Layout
  if (isMobile) {
    if (step === "success") {
      return (
        <div className="min-h-screen bg-background pb-20 flex flex-col">
          <MobileHeader />

          <div className="flex-1 flex items-center justify-center px-4 py-8">
            <Card className="w-full p-6 text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="flex justify-center"
              >
                <div className="rounded-full bg-emerald/20 p-4">
                  <CheckCircle className="h-12 w-12 text-emerald" />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h1 className="text-h3 font-bold">Payment Successful!</h1>
                <p className="text-muted-foreground text-sm mt-2">Your payment of ₹{parseInt(formData.amount).toLocaleString()} has been processed</p>
              </motion.div>

              <div className="bg-muted rounded-lg p-4 text-left space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment ID:</span>
                  <span className="font-medium">#PMT123456</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">₹{parseInt(formData.amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{new Date(formData.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Method:</span>
                  <span className="font-medium capitalize">{formData.paymentMethod.replace("_", " ")}</span>
                </div>
              </div>

              <Button onClick={handleComplete} className="w-full bg-emerald hover:bg-emerald/90 h-10">
                Back to Debt Details
              </Button>
            </Card>
          </div>

          <BottomNav />
        </div>
      );
    }

    if (step === "confirmation") {
      return (
        <div className="min-h-screen bg-background pb-20">
          <MobileHeader />

          <div className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-40 px-4 py-4">
            <h1 className="text-h3 font-bold">Confirm Payment</h1>
          </div>

          <div className="px-4 py-4 space-y-4">
            <Card className="p-4 space-y-3">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-muted-foreground">Debt:</span>
                <span className="font-medium">HDFC Home Loan</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-muted-foreground">Amount:</span>
                <span className="text-h3 font-bold text-emerald">₹{parseInt(formData.amount).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-muted-foreground">Payment Date:</span>
                <span className="font-medium">{new Date(formData.date).toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Method:</span>
                <span className="font-medium capitalize">{formData.paymentMethod.replace("_", " ")}</span>
              </div>
            </Card>

            {formData.notes && (
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-2">Notes</p>
                <p className="text-sm">{formData.notes}</p>
              </Card>
            )}

            <div className="space-y-2">
              <Button onClick={handleConfirm} className="w-full bg-emerald hover:bg-emerald/90 h-10">
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirm Payment
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full h-10"
                onClick={() => setStep("details")}
              >
                Edit Details
              </Button>
            </div>
          </div>

          <BottomNav />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader />

        <div className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-40 px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" onClick={() => navigate(`/debt/${id}`)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-h3 font-bold">Make Payment</h1>
              <p className="text-muted-foreground text-sm mt-1">Pay your EMI</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
          <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <span className="font-medium">Due Amount: </span>
              <span className="text-h4">₹{dueAmount.toLocaleString()}</span>
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Make sure to pay before due date to avoid penalties</p>
          </Card>

          <Card className="p-4 space-y-4">
            <div>
              <Label htmlFor="amount" className="text-sm font-medium">Payment Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Remaining Balance: ₹{remainingBalance.toLocaleString()}
              </p>
            </div>

            <div>
              <Label htmlFor="method" className="text-sm font-medium">Payment Method</Label>
              <select
                id="method"
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full mt-2 px-3 py-2 rounded-lg border bg-background text-sm"
              >
                <option value="bank_transfer">Bank Transfer</option>
                <option value="upi">UPI</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="net_banking">Net Banking</option>
              </select>
            </div>

            <div>
              <Label htmlFor="date" className="text-sm font-medium">Payment Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="notes" className="text-sm font-medium">Notes (Optional)</Label>
              <textarea
                id="notes"
                placeholder="Add any notes about this payment..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full mt-2 px-3 py-2 rounded-lg border bg-background text-sm resize-none"
                rows={3}
              />
            </div>
          </Card>

          <div className="space-y-2">
            <Button type="submit" className="w-full bg-emerald hover:bg-emerald/90 h-10">
              <CreditCard className="h-4 w-4 mr-2" />
              Continue
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

        <BottomNav />
      </div>
    );
  }

  // Desktop Layout
  if (step === "success") {
    return (
      <div className="min-h-screen bg-background">
        <Header onMenuToggle={() => toggleSidebar()} />

        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="max-w-md w-full">
              <Card className="p-8 text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="flex justify-center"
                >
                  <div className="rounded-full bg-emerald/20 p-6">
                    <CheckCircle className="h-16 w-16 text-emerald" />
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <h1 className="text-h1 font-bold">Payment Successful!</h1>
                  <p className="text-muted-foreground mt-2">Your payment of ₹{parseInt(formData.amount).toLocaleString()} has been processed</p>
                </motion.div>

                <div className="bg-muted rounded-lg p-4 space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment ID:</span>
                    <span className="font-medium">#PMT123456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">₹{parseInt(formData.amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{new Date(formData.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method:</span>
                    <span className="font-medium capitalize">{formData.paymentMethod.replace("_", " ")}</span>
                  </div>
                </div>

                <Button onClick={handleComplete} className="w-full bg-emerald hover:bg-emerald/90 h-11">
                  Back to Debt Details
                </Button>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-background">
        <Header onMenuToggle={() => toggleSidebar()} />

        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          <main className="flex-1 p-6">
            <div className="mx-auto max-w-2xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <h1 className="text-h1 font-bold">Confirm Payment</h1>
                <p className="text-muted-foreground">Review your payment details</p>
              </motion.div>

              <Card className="p-6 space-y-6 mb-6">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-muted-foreground">Debt:</span>
                    <span className="font-medium">HDFC Home Loan</span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="text-h2 font-bold text-emerald">₹{parseInt(formData.amount).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-muted-foreground">Payment Date:</span>
                    <span className="font-medium">{new Date(formData.date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Method:</span>
                    <span className="font-medium capitalize">{formData.paymentMethod.replace("_", " ")}</span>
                  </div>
                </div>

                {formData.notes && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Notes</p>
                    <p className="text-sm">{formData.notes}</p>
                  </div>
                )}
              </Card>

              <div className="flex gap-3">
                <Button onClick={handleConfirm} className="flex-1 bg-emerald hover:bg-emerald/90 h-11">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Payment
                </Button>
                <Button type="button" variant="outline" className="flex-1 h-11" onClick={() => setStep("details")}>
                  Edit Details
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

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

              <h1 className="text-h1 font-bold">Make Payment</h1>
              <p className="text-muted-foreground">Pay your monthly EMI</p>
            </motion.div>

            <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 mb-6">
              <p className="text-blue-900 dark:text-blue-100">
                <span className="font-medium">Due Amount: </span>
                <span className="text-h2">₹{dueAmount.toLocaleString()}</span>
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">Make sure to pay before due date to avoid penalties</p>
            </Card>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="p-6 space-y-4">
                <div>
                  <Label htmlFor="amount" className="font-medium">Payment Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="mt-2 h-10"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Remaining Balance: ₹{remainingBalance.toLocaleString()}
                  </p>
                </div>

                <div>
                  <Label htmlFor="method" className="font-medium">Payment Method</Label>
                  <select
                    id="method"
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full mt-2 px-3 py-2 rounded-lg border bg-background text-sm"
                  >
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="upi">UPI</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="net_banking">Net Banking</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="date" className="font-medium">Payment Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-2 h-10"
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="font-medium">Notes (Optional)</Label>
                  <textarea
                    id="notes"
                    placeholder="Add any notes about this payment..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full mt-2 px-3 py-2 rounded-lg border bg-background text-sm resize-none"
                    rows={4}
                  />
                </div>
              </Card>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1 bg-emerald hover:bg-emerald/90 h-11">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Continue to Review
                </Button>
                <Button type="button" variant="outline" className="flex-1 h-11" onClick={() => navigate(`/debt/${id}`)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

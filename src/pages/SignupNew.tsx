import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2, MapPin, BookOpen, Briefcase, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Basic Info, 2: Profile Details, 3: Job Preferences
  
  const [formData, setFormData] = useState({
    // Step 1: Basic
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Step 2: Profile
    location: "",
    city: "",
    country: "",
    education: "",
    fieldOfStudy: "",
    interests: [] as string[],
    // Step 3: Job Preferences
    lookingForJobs: false,
    preferredJobTypes: [] as string[],
    desiredSalaryRange: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Interest options
  const interestOptions = [
    "Finance", "Technology", "Healthcare", "Education",
    "Entrepreneurship", "Real Estate", "Cryptocurrency",
    "Stock Market", "Business", "Investing"
  ];

  // Job type options
  const jobTypeOptions = [
    "Full-time", "Part-time", "Freelance", "Contract",
    "Remote", "Hybrid", "On-site"
  ];

  // Education options
  const educationOptions = [
    "High School", "Bachelor's", "Master's", "PhD",
    "Diploma", "Certificate", "Professional Degree"
  ];

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = passwordStrength(formData.password);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-emerald-500"];

  // Validation for Step 1
  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  // Validation for Step 2
  const validateStep2 = () => {
    if (!formData.city || !formData.country || !formData.education || !formData.fieldOfStudy) {
      setError("Please fill in all required fields");
      return false;
    }
    if (formData.interests.length === 0) {
      setError("Please select at least one interest");
      return false;
    }
    return true;
  };

  // Handle Next Step
  const handleNextStep = () => {
    setError("");
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  // Handle Previous Step
  const handlePrevStep = () => {
    setError("");
    if (step > 1) setStep(step - 1);
  };

  // Handle Signup Complete
  const handleSignupComplete = async () => {
    setError("");
    setIsLoading(true);

    try {
      // API call would go here
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save user data
      const userData = {
        name: formData.name,
        email: formData.email,
        location: { city: formData.city, country: formData.country },
        education: formData.education,
        fieldOfStudy: formData.fieldOfStudy,
        interests: formData.interests,
        lookingForJobs: formData.lookingForJobs,
        preferredJobTypes: formData.preferredJobTypes,
        desiredSalaryRange: formData.desiredSalaryRange,
      };
      
      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create account. Please try again.");
      setIsLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const toggleJobType = (jobType: string) => {
    setFormData(prev => ({
      ...prev,
      preferredJobTypes: prev.preferredJobTypes.includes(jobType)
        ? prev.preferredJobTypes.filter(j => j !== jobType)
        : [...prev.preferredJobTypes, jobType]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy/5 via-background to-emerald/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-h1 gradient-text mb-2">Cleero</h1>
          <p className="text-muted-foreground">Start your journey to financial freedom and career growth</p>
          
          {/* Step Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s <= step ? "bg-emerald w-8" : "bg-muted w-2"
                }`}
              />
            ))}
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>Sign up to get started with Cleero</CardDescription>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Tell us about yourself and your interests</CardDescription>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <CardTitle>Job Preferences (Optional)</CardTitle>
                  <CardDescription>Help us find the best opportunities for you</CardDescription>
                </motion.div>
              )}
            </AnimatePresence>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <AnimatePresence mode="wait">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <motion.div
                  key="form1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="space-y-1">
                        <div className="flex gap-1 h-1.5">
                          {Array(4)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className={`flex-1 rounded-full transition-colors ${
                                  i < strength ? strengthColors[strength - 1] : "bg-muted"
                                }`}
                              />
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Password strength: <span className="font-semibold">{strengthLabels[strength]}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <div className="flex items-center gap-2 text-xs text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        Passwords match
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <input type="checkbox" id="terms" className="mt-1" required />
                      <label htmlFor="terms" className="text-xs text-muted-foreground">
                        I agree to the Terms of Service and Privacy Policy
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={handleNextStep}
                    className="w-full bg-gradient-to-r from-navy to-emerald hover:opacity-90"
                  >
                    Next: Profile Info
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Profile Information */}
              {step === 2 && (
                <motion.div
                  key="form2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 max-h-96 overflow-y-auto pr-2"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="city"
                          type="text"
                          placeholder="Your city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        type="text"
                        placeholder="Your country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education Level</Label>
                    <select
                      id="education"
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="">Select your education level</option>
                      {educationOptions.map(edu => (
                        <option key={edu} value={edu}>{edu}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fieldOfStudy">Field of Study</Label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fieldOfStudy"
                        type="text"
                        placeholder="e.g., Computer Science, Business, Engineering"
                        value={formData.fieldOfStudy}
                        onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Select Your Interests</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {interestOptions.map(interest => (
                        <label key={interest} className="flex items-center gap-2 p-2 rounded-md border border-input cursor-pointer hover:bg-muted">
                          <input
                            type="checkbox"
                            checked={formData.interests.includes(interest)}
                            onChange={() => toggleInterest(interest)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handlePrevStep}
                      variant="outline"
                      className="flex-1"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="flex-1 bg-gradient-to-r from-navy to-emerald hover:opacity-90"
                    >
                      Next: Job Preferences
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Job Preferences */}
              {step === 3 && (
                <motion.div
                  key="form3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 max-h-96 overflow-y-auto pr-2"
                >
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald/10 border border-emerald/20">
                    <input
                      type="checkbox"
                      id="lookingForJobs"
                      checked={formData.lookingForJobs}
                      onChange={(e) => setFormData({ ...formData, lookingForJobs: e.target.checked })}
                      className="w-5 h-5"
                    />
                    <label htmlFor="lookingForJobs" className="text-sm font-medium cursor-pointer">
                      I'm actively looking for job opportunities
                    </label>
                  </div>

                  {formData.lookingForJobs && (
                    <>
                      <div className="space-y-3">
                        <Label>Preferred Job Types</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {jobTypeOptions.map(jobType => (
                            <label key={jobType} className="flex items-center gap-2 p-2 rounded-md border border-input cursor-pointer hover:bg-muted">
                              <input
                                type="checkbox"
                                checked={formData.preferredJobTypes.includes(jobType)}
                                onChange={() => toggleJobType(jobType)}
                                className="w-4 h-4"
                              />
                              <span className="text-sm">{jobType}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="salary">Desired Salary Range (Optional)</Label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="salary"
                            type="text"
                            placeholder="e.g., $50,000 - $70,000"
                            value={formData.desiredSalaryRange}
                            onChange={(e) => setFormData({ ...formData, desiredSalaryRange: e.target.value })}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-800">
                    <p className="font-semibold mb-1">Jobs Integration Coming Soon:</p>
                    <p>We're integrating with LinkedIn, Glassdoor, Indeed, and other job boards to show you the best opportunities near you!</p>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handlePrevStep}
                      variant="outline"
                      className="flex-1"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleSignupComplete}
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-navy to-emerald hover:opacity-90"
                    >
                      {isLoading ? "Creating Account..." : "Complete Signup"}
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {step === 1 && (
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link to="/login" className="text-emerald font-semibold hover:underline">
                  Sign in
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

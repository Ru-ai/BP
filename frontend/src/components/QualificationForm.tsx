import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle, ArrowRight, ArrowLeft, X } from "lucide-react";
import { useDataStore } from "@/store/useDataStore";

export const QualificationForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { saveUserData, saveUserData2, sendEmail1 } = useDataStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    revenue: "",
    companySize: "",
    industry: "",
    submittedAt: "",
  });

  const calendlyUrl = "https://calendly.com/siddharth-bradpartners/30min";

  const storeLeadData = async (leadData) => {
    try {
      const formattedData = {
        fullName: leadData.name || "",
        email: leadData.email || "",
        phoneNo: leadData.phone || "",
        monthlyRevenue: leadData.revenue || "",
        companySize: leadData.companySize || "",
        industry: leadData.industry || "",
        qualified: leadData.qualified || false,
        source: "QualificationForm"
      };
      
      console.log("QUALIFICATION FORM: Formatted data being sent to Mongo:", formattedData);
      
      saveUserData(formattedData);
      saveUserData2(formattedData);
      if (!leadData.qualified) {
        sendEmail1(leadData.email, leadData.name);
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        revenue: "",
        companySize: "",
        industry: "",
        submittedAt: "",
      });
      
      return true;
    } catch (error) {
      console.error("QUALIFICATION FORM: Error storing lead data:", error);
      return false;
    }
  };

  const isQualified = (revenue: string) => {
    return (revenue === "$15K-$30K" || revenue === "$30K-$50K" || revenue === "$50K+");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.revenue || !formData.companySize || !formData.industry) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    const completeFormData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      qualified: isQualified(formData.revenue),
      monthlyRevenue: formData.revenue
    };
    
    console.log("QUALIFICATION FORM: Submitting lead data to Zapier:", completeFormData);
    console.log("QUALIFICATION FORM: Revenue value:", formData.revenue);
    console.log("QUALIFICATION FORM: MonthlyRevenue value:", completeFormData.monthlyRevenue);
    
    const storedSuccessfully = await storeLeadData(completeFormData);
    
    if (!storedSuccessfully) {
      toast.error("There was an issue processing your application. Please try again later.");
      setIsSubmitting(false);
      return;
    }

    if (isQualified(completeFormData.monthlyRevenue)) {
      toast.success("You qualify! Redirecting to scheduler...");
      
      localStorage.setItem("qualifiedLead", JSON.stringify(completeFormData));
      
      setTimeout(() => {
        window.location.href = calendlyUrl;
      }, 1500);
    } else {
      toast.custom((id) => (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto border-l-4 border-accent relative">
          <button 
            onClick={() => toast.dismiss(id)} 
            className="absolute top-3 right-3 text-navy/50 hover:text-navy transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
          <h3 className="text-lg font-semibold mb-2 text-navy">Thank You for Your Interest</h3>
          <p className="text-navy/80 mb-3">
            While we may not be the perfect fit right now, we want to help you succeed. We've sent some valuable resources to your email that will help guide your agency's growth journey.
          </p>
          <p className="text-navy/70 text-sm">
            Check your inbox for next steps and helpful materials!
          </p>
        </div>
      ), {
        duration: 8000,
        position: "top-center",
      });
    }
    
    localStorage.setItem("unqualifiedLead", JSON.stringify(completeFormData));
    
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        revenue: "",
        companySize: "",
        industry: "",
        submittedAt: "",
      });
      setStep(1);
      setIsSubmitting(false);
    }, 3000);
  };

  return (
    <Card className="w-full max-w-lg mx-auto overflow-hidden relative bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl border border-white/30 transform hover:-translate-y-1 transition-all duration-500 animate-fadeIn">
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-xl"></div>
      
      <div className="bg-gradient-to-r from-accent/20 via-accent to-accent/20 h-1 w-full">
        <div 
          className="bg-accent h-full transition-all duration-500 ease-out"
          style={{ width: step === 1 ? '50%' : '100%' }}
        ></div>
      </div>
      
      <div className="p-8 relative z-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-5">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center mb-4 relative">
                  <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full"></div>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center relative">
                    <span className="text-accent font-medium">1/2</span>
                  </div>
                </div>
                <h3 className="text-2xl font-playfair font-semibold text-navy">Basic Information</h3>
                <p className="text-navy/60 text-sm mt-2">Tell us a bit about yourself</p>
              </div>
              
              <div className="space-y-4">
                <div className="group relative">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-navy/10 bg-white/50 focus:border-accent/50 rounded-xl px-4 py-3 transition-all duration-300 shadow-sm"
                    required
                  />
                  <div className="absolute inset-0 border border-accent/0 rounded-xl group-focus-within:border-accent/20 group-focus-within:shadow-md transition-all duration-300 pointer-events-none"></div>
                </div>
                
                <div className="group relative">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-navy/10 bg-white/50 focus:border-accent/50 rounded-xl px-4 py-3 transition-all duration-300 shadow-sm"
                    required
                  />
                  <div className="absolute inset-0 border border-accent/0 rounded-xl group-focus-within:border-accent/20 group-focus-within:shadow-md transition-all duration-300 pointer-events-none"></div>
                </div>
                
                <div className="group relative">
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border-navy/10 bg-white/50 focus:border-accent/50 rounded-xl px-4 py-3 transition-all duration-300 shadow-sm"
                    required
                  />
                  <div className="absolute inset-0 border border-accent/0 rounded-xl group-focus-within:border-accent/20 group-focus-within:shadow-md transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/10 rounded-full blur-md"></div>
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-accent hover:bg-accent-light text-white py-6 rounded-xl transition-all duration-300 hover:shadow-lg shadow-accent/20 relative"
                  >
                    <span className="mr-2">Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center mb-4 relative">
                  <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full"></div>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center relative">
                    <span className="text-accent font-medium">2/2</span>
                  </div>
                </div>
                <h3 className="text-2xl font-playfair font-semibold text-navy">Company Information</h3>
                <p className="text-navy/60 text-sm mt-2">Just a few more details about your business</p>
              </div>
              
              <div className="space-y-4">
                <div className="group relative">
                  <Select onValueChange={(value) => setFormData({ ...formData, revenue: value })}>
                    <SelectTrigger className="border-navy/10 bg-white/50 focus:border-accent/50 rounded-xl px-4 py-3 h-auto transition-all duration-300 shadow-sm">
                      <SelectValue placeholder="Monthly Revenue" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-md border-navy/10 rounded-xl shadow-lg">
                      <SelectItem value="$10K-$15K">$10K-$15K</SelectItem>
                      <SelectItem value="$15K-$30K">$15K-$30K</SelectItem>
                      <SelectItem value="$30K-$50K">$30K-$50K</SelectItem>
                      <SelectItem value="$50K+">$50K+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="group relative">
                  <Select onValueChange={(value) => setFormData({ ...formData, companySize: value })}>
                    <SelectTrigger className="border-navy/10 bg-white/50 focus:border-accent/50 rounded-xl px-4 py-3 h-auto transition-all duration-300 shadow-sm">
                      <SelectValue placeholder="Company Size" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-md border-navy/10 rounded-xl shadow-lg">
                      <SelectItem value="1-5">1-5 employees</SelectItem>
                      <SelectItem value="6-10">6-10 employees</SelectItem>
                      <SelectItem value="11-25">11-25 employees</SelectItem>
                      <SelectItem value="25+">25+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="group relative">
                  <Select onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                    <SelectTrigger className="border-navy/10 bg-white/50 focus:border-accent/50 rounded-xl px-4 py-3 h-auto transition-all duration-300 shadow-sm">
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-md border-navy/10 rounded-xl shadow-lg">
                      <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-navy/10 bg-white/50 text-navy hover:bg-navy/5 rounded-xl py-6 transition-all duration-300"
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span>Back</span>
                </Button>
                
                <div className="relative flex-1">
                  <div className="absolute inset-0 bg-accent/10 rounded-full blur-md"></div>
                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-light text-white py-6 rounded-xl transition-all duration-300 hover:shadow-lg shadow-accent/20 relative"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </Card>
  );
};

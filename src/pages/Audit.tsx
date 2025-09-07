import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import Header from "@/components/Header";
import { isEmail, isUrl } from "@/lib/validators";
import { useLocation } from "react-router-dom";
import { useAudit } from "@/hooks/useAudit";
import { useAuditEngine } from "@/hooks/useAuditEngine";
import { useNavigate } from "react-router-dom";
const SCRAPE_URL = import.meta.env.VITE_API_SCAPE_URL;

const Audit = () => {
  const location = useLocation();
  const { submitAudit, loading } = useAudit();
  const { scrapeAndRunEngine, loading: engineLoading } = useAuditEngine();
  const [formData, setFormData] = useState({
    email: "",
    landingPageUrl: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [icpData, setIcpData] = useState({
    goal: "",
    targetCustomer: "",
    painPoints: "",
    valueProp: "",
    extraContext: ""
  });
  const navigate = useNavigate();
  
  // Get ICP data from navigation state
  useEffect(() => {
    if (location.state?.icpData) {
      setIcpData(location.state.icpData);
    }
  }, [location.state]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.landingPageUrl.trim()) {
      newErrors.landingPageUrl = "Landing page URL is required";
    } else if (!isUrl(formData.landingPageUrl)) {
      newErrors.landingPageUrl = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Prepare the audit request payload
        const auditPayload = {
          userEmail: formData.email,
          url: formData.landingPageUrl,
          goal: icpData.goal,
          targetCustomer: icpData.targetCustomer,
          painPoints: icpData.painPoints,
          valueProp: icpData.valueProp,
          extraContext: icpData.extraContext
        };

        console.log('Audit payload:', auditPayload);

        // Submit audit request only
        const auditResult = await submitAudit(auditPayload);
        console.log('Audit request successful:', auditResult);  
        navigate(`/audit-viewer?jobId=${auditResult.jobId}`);
        // Handle success - you might want to show a success message or redirect
      } catch (error) {
        console.error('Error submitting audit request:', error);
        // Handle network error - you might want to show an error message
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center p-6 pt-32">
        <Card className="w-full max-w-137.5 shadow-lg">
          <CardContent className="p-8 pt-2">
            <div className="text-center pb-8">
              <h1 className="text-xl font-bold h-5 text-foreground mb-2 tracking-normal">
                Let's create an audit for your <br />SaaS landing page!
              </h1>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full ${errors.email ? 'border-destructive' : ''}`}
                  aria-invalid={Boolean(errors.email) || undefined}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Info className="w-3 h-3" />
                  <span>Helps us send you a magic link and a PDF export.</span>
                </div>
              </div>

              <div>
                <Label htmlFor="landingPageUrl" className="text-sm font-medium text-foreground mb-2 block">
                  Landing page URL
                </Label>
                <Input
                  id="landingPageUrl"
                  type="url"
                  placeholder="convertaudit.com"
                  value={formData.landingPageUrl}
                  onChange={(e) => handleInputChange("landingPageUrl", e.target.value)}
                  className={`w-full ${errors.landingPageUrl ? 'border-destructive' : ''}`}
                  aria-invalid={Boolean(errors.landingPageUrl) || undefined}
                />
                {errors.landingPageUrl && (
                  <p className="text-sm text-destructive mt-1">{errors.landingPageUrl}</p>
                )}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              variant="gradient"
              className="w-full h-12 text-base font-medium mt-8 hover:cursor-pointer"
              disabled={loading || engineLoading}
            >
              {loading || engineLoading ? 'Submitting...' : 'Get my audit'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Audit;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import StepIndicator from "./StepIndicator";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ICPForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    landingPageGoal: "",
    targetCustomer: "",
    // Step 2
    painPoint: "",
    valueProposition: "",
    // Step 3
    currentSolution: "",
    decisionFactors: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.landingPageGoal.trim()) {
        newErrors.landingPageGoal = "Landing page goal is required";
      }
      if (!formData.targetCustomer.trim()) {
        newErrors.targetCustomer = "Target customer is required";
      }
    } else if (step === 2) {
      if (!formData.painPoint.trim()) {
        newErrors.painPoint = "Pain point is required";
      }
      if (!formData.valueProposition.trim()) {
        newErrors.valueProposition = "Value proposition is required";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Navigate to audit page
        navigate('/audit');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="landingPageGoal" className="text-body-sm font-medium text-foreground mb-2 block">
                What's the main goal of this landing page?
              </Label>
              <Textarea
                id="landingPageGoal"
                placeholder="e.g. Collect waitlist, Book demo,..."
                value={formData.landingPageGoal}
                onChange={(e) => handleInputChange("landingPageGoal", e.target.value)}
                className={`w-full min-h-[82px] ${errors.landingPageGoal ? 'border-destructive' : ''}`}
              />
              {errors.landingPageGoal && (
                <p className="text-sm text-destructive mt-1">{errors.landingPageGoal}</p>
              )}
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Info className="w-3 h-3" />
                <span>Helps us evaluate success based on the right outcome.</span>
              </div>
            </div>

            <div>
              <Label htmlFor="targetCustomer" className="text-body-sm font-medium text-foreground mb-2 block">
                Who is your target customer?
              </Label>
              <Textarea
                id="targetCustomer"
                placeholder="e.g Startup founder, B2B SaaS team,..."
                value={formData.targetCustomer}
                onChange={(e) => handleInputChange("targetCustomer", e.target.value)}
                className={`w-full min-h-[82px] ${errors.targetCustomer ? 'border-destructive' : ''}`}
              />
              {errors.targetCustomer && (
                <p className="text-sm text-destructive mt-1">{errors.targetCustomer}</p>
              )}
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Info className="w-3 h-3" />
                <span>Ensures our insights match your intended audience.</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="painPoint" className="text-body-sm font-medium text-foreground mb-2 block">
                What problem or pain point are they facing?
              </Label>
              <Textarea
                id="painPoint"
                placeholder="e.g. Wasting hours filtering candidates, Manual onboarding,..."
                value={formData.painPoint}
                onChange={(e) => handleInputChange("painPoint", e.target.value)}
                className={`w-full min-h-[82px] ${errors.painPoint ? 'border-destructive' : ''}`}
              />
              {errors.painPoint && (
                <p className="text-sm text-destructive mt-1">{errors.painPoint}</p>
              )}
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Info className="w-3 h-3" />
                <span>Makes sure the page clearly addresses their pain point.</span>
              </div>
            </div>

            <div>
              <Label htmlFor="valueProposition" className="text-body-sm font-medium text-foreground mb-2 block">
                What makes your product different or valuable to this audience?
              </Label>
              <Textarea
                id="valueProposition"
                placeholder="e.g. AI filters candidates instantly, No-code setup in 5 mins,..."
                value={formData.valueProposition}
                onChange={(e) => handleInputChange("valueProposition", e.target.value)}
                className={`w-full min-h-[82px] ${errors.valueProposition ? 'border-destructive' : ''}`}
              />
              {errors.valueProposition && (
                <p className="text-sm text-destructive mt-1">{errors.valueProposition}</p>
              )}
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Info className="w-3 h-3" />
                <span>Check if your page clearly communicates your unique value.</span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="currentSolution" className="text-body-sm font-medium text-foreground mb-2 block">
                Anything else we should know before auditing? (Optional)
              </Label>
              <Textarea
                id="currentSolution"
                placeholder="Tell us more..."
                value={formData.currentSolution}
                onChange={(e) => handleInputChange("currentSolution", e.target.value)}
                className="w-full min-h-[100px]"
              />
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Info className="w-3 h-3" />
                <span>Adds extra context that may affect the audit.</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2 font-sans leading-8 tracking-normal">
              Help us understand your ICP so we can give better insights
            </h1>
          </div>

          <StepIndicator currentStep={currentStep} totalSteps={3} />

          {renderStepContent()}

          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <Button
                onClick={handleBack}
                variant="secondary"
                className="flex-1 h-12 text-base font-medium hover:cursor-pointer"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              variant="gradient"
              className={`h-12 text-base font-medium hover:cursor-pointer ${currentStep === 1 ? 'w-full' : 'flex-1'}`}
            >
              {currentStep === 3 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ICPForm;
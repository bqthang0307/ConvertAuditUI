import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import Header from "@/components/Header";

const Audit = () => {
  const [formData, setFormData] = useState({
    email: "",
    landingPageUrl: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log("Audit form data:", formData);
    // Process audit request
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center p-6 pt-24">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-xl font-semibold text-foreground mb-2">
                Let's create an audit for your SaaS landing page!
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
                  className="w-full"
                />
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
                  className="w-full"
                />
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full h-12 text-base font-medium mt-8"
            >
              Get my audit
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Audit;
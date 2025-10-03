import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import Header from "@/components/Header";

const History = () => {
  const reports = [
    {
      website: "https://twobrothersindiaashop.com/",
      requestedAt: "Apr 4, 2025, 5:08:48 PM",
      status: "processing" as const,
    },
    {
      website: "https://www.beautyenergyexchange.com/",
      requestedAt: "Apr 4, 2025, 12:55:14 AM",
      status: "complete" as const,
    },
    {
      website: "https://shop.hauserwirth.com/",
      requestedAt: "Apr 4, 2025, 12:54:41 AM",
      status: "complete" as const,
    },
    {
      website: "https://crosswyndeapts.com/",
      requestedAt: "Apr 4, 2025, 12:51:53 AM",
      status: "complete" as const,
    },
    {
      website: "https://beavercrafttools.com/",
      requestedAt: "Apr 4, 2025, 12:51:26 AM",
      status: "complete" as const,
    },
  ];

  const getStatusBadge = (status: "processing" | "complete") => {
    if (status === "processing") {
      return <Badge className="bg-warning text-warning-foreground">processing</Badge>;
    }
    return <Badge className="bg-excellent text-success-foreground">complete</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground">
            Previous Reports <span className="text-muted-foreground">(latest first)</span>
          </h1>
          <Button variant="gradient" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            REFRESH
          </Button>
        </div>

        <div className="space-y-4">
          {reports.map((report, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-medium text-foreground">Website: {report.website}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Status:</span>
                      {getStatusBadge(report.status)}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Requested at: {report.requestedAt}
                  </p>
                </div>
                
                <div className="ml-6">
                  {report.status === "complete" && (
                    <Button 
                      variant="gradient"
                      onClick={() => window.location.href = "/audit-report"}
                    >
                      VIEW REPORT
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
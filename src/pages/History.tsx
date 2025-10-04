import { useEffect, useState } from "react";
import { useAuditHistory} from "@/hooks/useAuditHistory"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import Header from "@/components/Header";

const History = () => {
  const formatDisplayDate = (isoString?: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  };
  const { getListAuditHistory, loading } = useAuditHistory();
  const [reports, setReports] = useState<any[]>([]);
  useEffect(()=>{
    (async()=>{
      const auditIdString = localStorage.getItem('audit_id');
      if (!auditIdString) return;
      const auditId = BigInt(auditIdString);
      const result = await getListAuditHistory(auditId);
      const items = Array.isArray(result) ? result : (result as any)?.data ?? [];
      setReports(items ?? []);
    })()
  }, [])
  const handleViewReportButton = async (audit_history_id: bigint) => {
    const sigature = localStorage.getItem('backend_signature');
    if (!sigature) return;
    const auditId = localStorage.getItem('audit_id');
    if (!auditId) return;
    window.location.href = `/audit-report?audit-history-id=${audit_history_id}&sig=${sigature}&jobId=${auditId}`
  };

  const getStatusBadge = (status: "running" | "done") => {
    if (status === "running") {
      return <Badge className="bg-warning text-warning-foreground">processing</Badge>;
    }
    return <Badge className="bg-excellent text-success-foreground">complete</Badge>;
  };

  const handleRefreshButton = () => {
    (async()=>{
      const auditIdString = localStorage.getItem('audit_id');
      if (!auditIdString) return;
      const auditId = BigInt(auditIdString);
      const result = await getListAuditHistory(auditId);
      const items = Array.isArray(result) ? result : (result as any)?.data ?? [];
      setReports(items ?? []);
    })()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground">
            Previous Reports <span className="text-muted-foreground">(latest first)</span>
          </h1>
          <Button variant="gradient" size="sm" className="gap-2" onClick={() => handleRefreshButton()}>
            <RefreshCw className="w-4 h-4" />
            REFRESH
          </Button>
        </div>

        <div className="space-y-4">
          {Array.isArray(reports) && reports.map((report) => (
            <Card key={report.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-medium text-foreground">Website: {report.url}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Status:</span>
                      {getStatusBadge(report.status)}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Requested at: {formatDisplayDate(report.changed_at)}
                  </p>
                </div>
                
                <div className="ml-6">
                  {report.status === "done" && (
                    <Button 
                      variant="gradient"
                      onClick={() => handleViewReportButton(report.id)}
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
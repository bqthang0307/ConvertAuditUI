// AuditViewer.tsx
import { useAuditSSE } from "@/hooks/useAuditSSE";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function AuditViewer() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [jobId, setJobId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get jobId from URL parameters
  useEffect(() => {
    const urlJobId = searchParams.get('jobId');
    if (urlJobId) {
      setJobId(urlJobId);
      setError(null);
    } else {
      setError('No job ID provided in URL parameters');
    }
  }, [searchParams]);

  // e.g., set jobId after BE returns it from POST /api/audits
  const { latest, events, connectionStatus } = useAuditSSE(
    jobId ? `${import.meta.env.VITE_API_BASE_URL}/api/audits/stream/${jobId}` : undefined
  );

  // Navigate to audit-report when audit is completed
  useEffect(() => {
    if (latest && latest.type === 'completed') {
      try {
        // Parse the result if it's a string
        const parsedResult = typeof latest.result === 'string' 
          ? JSON.parse(latest.result) 
          : latest.result;
        
        // Navigate with the parsed result
        // navigate(`/audit-report?jobId=${jobId}`, {
        //   state: { result: parsedResult }
        // });
      } catch (error) {
        console.error('Failed to parse result:', error);
        // Navigate anyway, but without parsed result
        // navigate(`/audit-report?jobId=${jobId}`);
      }
    }
  }, [latest, jobId, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-6 pt-32">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Audit Progress Viewer
                </h1>
                <p className="text-muted-foreground">
                  Real-time monitoring of your audit process
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/audit')}
                className="shrink-0"
              >
                Back to Audit
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
      {/* Job ID Display */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Job ID
        </label>
        <div className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-700">
          {jobId || "Loading..."}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <div className="text-sm font-medium text-red-800 mb-1">Error</div>
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {jobId && (
        <div className="space-y-3">
          {/* Connection Status */}
          <div className={`rounded-md p-3 ${
            connectionStatus === 'connected' ? 'bg-green-50 border border-green-200' :
            connectionStatus === 'connecting' ? 'bg-yellow-50 border border-yellow-200' :
            connectionStatus === 'error' ? 'bg-red-50 border border-red-200' :
            'bg-gray-50 border border-gray-200'
          }`}>
            <div className={`text-sm font-medium ${
              connectionStatus === 'connected' ? 'text-green-800' :
              connectionStatus === 'connecting' ? 'text-yellow-800' :
              connectionStatus === 'error' ? 'text-red-800' :
              'text-gray-800'
            }`}>
              Connection Status: {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Latest Event</h3>
            <div className="text-sm text-blue-700">
              {latest ? (
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(
                    latest.type === 'completed' && latest.result
                      ? { ...latest, result: typeof latest.result === 'string' ? JSON.parse(latest.result) : latest.result }
                      : latest,
                    null,
                    2
                  )}
                </pre>
              ) : (
                "No events received yet"
              )}
            </div>
          </div>

          {events.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">
                Event History ({events.length} events)
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {events.map((event, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 border border-gray-200 rounded-md p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600">
                        Event #{i + 1}
                      </span>
                      <span className="text-xs text-gray-500">
                        {event.type}
                      </span>
                    </div>
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(event, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!jobId && !error && (
        <div className="text-center text-gray-500 py-8">
          Loading job ID from URL parameters...
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
}

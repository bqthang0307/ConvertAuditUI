// AuditViewer.tsx
import { useAuditSSE } from "@/hooks/useAuditSSE";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CircularProgress from "@/components/CircularProgress";
import { Button } from "@/components/ui/button";
import { auditService } from "@/services/auditService";

export default function AuditViewer() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [jobId, setJobId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
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

    const email = searchParams.get('email');
    if (email) {
      setEmail(email);
      setError(null);
    } else {
      setError('No job email provided in URL parameters');
    }
  }, [searchParams]);

  // e.g., set jobId after BE returns it from POST /api/audits
  const { latest, events, connectionStatus } = useAuditSSE(
    jobId ? `${import.meta.env.VITE_API_BE_URL}/api/audits/stream/${jobId}` : undefined
  );

  // Navigate to audit-report when audit is completed (fetch happens in AuditReport)
  useEffect(() => {
    if (latest && latest.type === 'completed') {
      // Include the result context in the navigation URL
      const resultContext = latest.result ? latest.result : '';
      console.log('resultContext:', resultContext);
      
      // Extract the auditResultSig from the result
      let auditResultSig = '';
      try {
        // Handle both object and string cases
        const parsedResult = typeof resultContext === 'string' 
          ? JSON.parse(resultContext) 
          : resultContext;
        
        if (parsedResult && typeof parsedResult === 'object' && 'auditResultSig' in parsedResult) {
          auditResultSig = parsedResult.auditResultSig;
        }
      } catch (error) {
        console.error('Error parsing result context:', error);
      }
      if (email && auditResultSig) {
        const reportUrl = `${window.location.origin}/audit-report?jobId=${jobId}&sig=${auditResultSig}`;
        // console.log(`reportUrl:${reportUrl}`)
        // console.log(`auditResultSig for email:${auditResultSig}`)
        auditService.emailsender(email, reportUrl);
      } else {
        console.log('Missing email or auditResultSig:', { email, auditResultSig });
      }
      navigate(`/audit-report?jobId=${jobId}&sig=${auditResultSig}`);
    }
  }, [latest, jobId, navigate]);

  // Calculate progress based on connection status and events
  const getProgress = () => {
    if (!jobId) return 0;
    if (connectionStatus === 'error') return 0;
    if (connectionStatus === 'connecting') return 10;
    if (connectionStatus === 'connected') {
      if (events.length === 0) return 25;
      if (events.length < 3) return 50;
      if (events.length < 6) return 75;
      if (latest && latest.type === 'completed') return 100;
      return 90;
    }
    return 0;
  };

  const getProgressLabel = () => {
    if (!jobId) return "Initializing...";
    if (connectionStatus === 'error') return "Connection Error";
    if (connectionStatus === 'connecting') return "Connecting...";
    if (connectionStatus === 'connected') {
      if (events.length === 0) return "Connected, waiting for data...";
      if (events.length < 3) return "Processing audit data...";
      if (events.length < 6) return "Analyzing results...";
      if (latest && latest.type === 'completed') return "Audit Complete!";
      return "Finalizing audit...";
    }
    return "Starting audit...";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
       {jobId && (        
         <div className="flex justify-center py-8">
           <div className="border border-gray-200 rounded-lg p-6 px-20 bg-white shadow-sm">
             <CircularProgress 
               value={getProgress()} 
               label={getProgressLabel()} 
             />
           </div>
         </div>
       )}
      {/* <div className="p-6 pt-32">
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
          
          <div className="space-y-4"> */}
      {/* Job ID Display */}
      {/* <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Job ID
        </label>
        <div className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-700">
          {jobId || "Loading..."}
        </div>
      </div> */}

      {/* Error Display */}
      {/* {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <div className="text-sm font-medium text-red-800 mb-1">Error</div>
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )} */}

      {/* {jobId && (
        <div className="space-y-3"> */}
          {/* Connection Status */}
          {/* <div className={`rounded-md p-3 ${
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
        </div> */
      /* )} */}

      {/* {!jobId && !error && (
        <div className="text-center text-gray-500 py-8">
          Loading job ID from URL parameters...
        </div>
      )}
          </div>
        </div>
      </div> */}
    </div>
  );
}

import { useState } from 'react';
import { auditService, type AuditEngineRequest } from '@/services/auditEngineService';

export const useAuditEngine = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrapeAndRunEngine = async (data: AuditEngineRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await auditService.scrapeAndRunEngine(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { scrapeAndRunEngine, loading, error };
};

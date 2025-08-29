import { useState } from 'react';
import { auditService, type AuditRequest } from '@/services/auditService';

export const useAudit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitAudit = async (data: AuditRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await auditService.submitAudit(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitAudit, loading, error };
};

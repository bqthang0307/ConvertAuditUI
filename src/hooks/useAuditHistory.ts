import { useState } from 'react';
import { auditHistoryService, type AuditHistoryRequest } from '@/services/auditHistoryService';

export const useAuditHistory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getListAuditHistory = async (audit_id: bigint ) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await auditHistoryService.getListHistory(audit_id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const getAuditHistory = async (audit_history_id: bigint, audit_id: string, backendSignature: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await auditHistoryService.getAuditHistory(audit_id, backendSignature, audit_history_id);
      return result;
    } catch (err) {
      console.log(err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getAuditHistory,getListAuditHistory, loading, error };
};
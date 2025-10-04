import { apiClient } from '@/lib/api';

export interface AuditHistoryRequest {
  userEmail: string;
  url: string;
  goal: string;
  targetCustomer: string;
  painPoints: string;
  valueProp: string;
  extraContext: string;
}

export const auditHistoryService = {
  severicePath: '/api/audit-history',
  async getListHistory(audit_id: BigInt) {
    return apiClient.get(`${this.severicePath}?audit_id=${audit_id}` );
  },
  async getAuditHistory(audit_id: string, backendSignature: string, audit_history_id: BigInt) {
    return apiClient.post(`${this.severicePath}/${audit_history_id}`,{auditId:audit_id, sig:backendSignature});
  },
};
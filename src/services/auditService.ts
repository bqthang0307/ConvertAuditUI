import { apiClient } from '@/lib/api';

export interface AuditRequest {
  userEmail: string;
  url: string;
  goal: string;
  targetCustomer: string;
  painPoints: string;
  valueProp: string;
  extraContext: string;
}

export const auditService = {
  async submitAudit(data: AuditRequest) {
    return apiClient.post('/api/audits', data);
  },
  
  async getAudit(id: string) {
    return apiClient.get(`/api/audits/${id}`);
  }
};
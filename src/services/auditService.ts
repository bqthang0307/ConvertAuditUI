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
  
  async getAudit(id: string, backendSignature: string) {
    return apiClient.get(`/api/audits/${id}?sig=${backendSignature}`);
  },

  async emailsender(email: string, audit_url: string) {
    return apiClient.get(`/api/audits/email?email=${email}&audit_url=${encodeURIComponent(audit_url)}`);
  }
};
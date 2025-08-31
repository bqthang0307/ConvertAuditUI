import { apiClient } from '@/lib/api';

export interface AuditEngineRequest {
  url: string;
  notify_api: string;
  autoscroll: true;
}

export const auditService = {
  async scrapeAndRunEngine(data: AuditEngineRequest) {
    return apiClient.post('/scrape', data);
  },
};
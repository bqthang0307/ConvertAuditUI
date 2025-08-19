# ConvertAudit API Documentation

This document outlines the API endpoints and data structures for the ConvertAudit application.

## Base URL

```
Production: https://api.convertaudit.com
Development: http://localhost:3000
```

## Authentication

Most endpoints require authentication. Include the API key in the request headers:

```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

## Endpoints

### 1. ICP (Ideal Customer Profile) Management

#### Create ICP Profile
```http
POST /api/icp
```

**Request Body:**
```json
{
  "landingPageGoal": "Collect waitlist",
  "targetCustomer": "Startup founders",
  "painPoint": "Manual onboarding process",
  "valueProposition": "No-code setup in 5 minutes",
  "currentSolution": "Additional context about the business",
  "userId": "user_123"
}
```

**Response:**
```json
{
  "id": "icp_456",
  "userId": "user_123",
  "landingPageGoal": "Collect waitlist",
  "targetCustomer": "Startup founders",
  "painPoint": "Manual onboarding process",
  "valueProposition": "No-code setup in 5 minutes",
  "currentSolution": "Additional context about the business",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### Get ICP Profile
```http
GET /api/icp/{icpId}
```

**Response:**
```json
{
  "id": "icp_456",
  "userId": "user_123",
  "landingPageGoal": "Collect waitlist",
  "targetCustomer": "Startup founders",
  "painPoint": "Manual onboarding process",
  "valueProposition": "No-code setup in 5 minutes",
  "currentSolution": "Additional context about the business",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### Update ICP Profile
```http
PUT /api/icp/{icpId}
```

**Request Body:** Same as Create ICP Profile

**Response:** Same as Create ICP Profile

#### Delete ICP Profile
```http
DELETE /api/icp/{icpId}
```

**Response:**
```json
{
  "success": true,
  "message": "ICP profile deleted successfully"
}
```

### 2. Audit Management

#### Create Audit Request
```http
POST /api/audits
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "landingPageUrl": "https://example.com",
  "icpId": "icp_456",
  "userId": "user_123"
}
```

**Response:**
```json
{
  "id": "audit_789",
  "email": "user@example.com",
  "landingPageUrl": "https://example.com",
  "icpId": "icp_456",
  "userId": "user_123",
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00Z",
  "estimatedCompletionTime": "2024-01-15T11:30:00Z"
}
```

#### Get Audit Status
```http
GET /api/audits/{auditId}
```

**Response:**
```json
{
  "id": "audit_789",
  "email": "user@example.com",
  "landingPageUrl": "https://example.com",
  "icpId": "icp_456",
  "userId": "user_123",
  "status": "completed",
  "createdAt": "2024-01-15T10:30:00Z",
  "completedAt": "2024-01-15T11:25:00Z",
  "results": {
    "overallScore": 85,
    "categories": {
      "clarity": 90,
      "trust": 80,
      "urgency": 85,
      "conversion": 85
    },
    "recommendations": [
      {
        "category": "clarity",
        "priority": "high",
        "title": "Improve headline clarity",
        "description": "Your headline could be more specific about the value proposition",
        "impact": "high"
      }
    ]
  }
}
```

#### Get User Audits
```http
GET /api/audits?userId={userId}&limit=10&offset=0
```

**Response:**
```json
{
  "audits": [
    {
      "id": "audit_789",
      "landingPageUrl": "https://example.com",
      "status": "completed",
      "overallScore": 85,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 25,
  "limit": 10,
  "offset": 0
}
```

### 3. User Management

#### Create User
```http
POST /api/users
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "company": "Example Corp"
}
```

**Response:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "company": "Example Corp",
  "credits": 10,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Get User Profile
```http
GET /api/users/{userId}
```

**Response:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "company": "Example Corp",
  "credits": 8,
  "createdAt": "2024-01-15T10:30:00Z",
  "lastLoginAt": "2024-01-15T10:30:00Z"
}
```

#### Update User Profile
```http
PUT /api/users/{userId}
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "company": "New Company"
}
```

**Response:** Same as Get User Profile

### 4. Email and Notifications

#### Send Audit Report
```http
POST /api/notifications/send-audit-report
```

**Request Body:**
```json
{
  "auditId": "audit_789",
  "email": "user@example.com",
  "reportUrl": "https://convertaudit.com/reports/audit_789.pdf"
}
```

**Response:**
```json
{
  "success": true,
  "messageId": "msg_123",
  "sentAt": "2024-01-15T11:30:00Z"
}
```

### 5. Analytics and Metrics

#### Get Audit Analytics
```http
GET /api/analytics/audits?userId={userId}&period=30d
```

**Response:**
```json
{
  "totalAudits": 25,
  "averageScore": 82.5,
  "scoreDistribution": {
    "excellent": 5,
    "good": 12,
    "fair": 6,
    "poor": 2
  },
  "topIssues": [
    {
      "issue": "Missing social proof",
      "frequency": 15,
      "impact": "high"
    }
  ],
  "improvementTrend": [
    {
      "date": "2024-01-01",
      "averageScore": 78
    },
    {
      "date": "2024-01-15",
      "averageScore": 82.5
    }
  ]
}
```

## Error Responses

### Standard Error Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR`: Request data validation failed
- `AUTHENTICATION_ERROR`: Invalid or missing authentication
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

## Rate Limiting

- **Free Tier**: 10 requests per hour
- **Pro Tier**: 100 requests per hour
- **Enterprise**: Custom limits

Rate limit headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248600
```

## Webhooks

### Audit Completed Webhook
```http
POST /your-webhook-url
```

**Payload:**
```json
{
  "event": "audit.completed",
  "auditId": "audit_789",
  "userId": "user_123",
  "landingPageUrl": "https://example.com",
  "overallScore": 85,
  "completedAt": "2024-01-15T11:25:00Z"
}
```

## SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install @convertaudit/sdk
```

```javascript
import { ConvertAudit } from '@convertaudit/sdk';

const client = new ConvertAudit({
  apiKey: 'your-api-key'
});

const audit = await client.createAudit({
  email: 'user@example.com',
  landingPageUrl: 'https://example.com'
});
```

## Support

For API support and questions:
- Email: api-support@convertaudit.com
- Documentation: https://docs.convertaudit.com
- Status page: https://status.convertaudit.com

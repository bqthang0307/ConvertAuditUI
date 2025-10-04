import $ from 'jquery';

const API_BASE_URL = import.meta.env.VITE_API_BE_URL;

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request(endpoint: string, options: any = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const method = (options.method || 'GET') as string;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    const rawBody = options.body ?? options.data;
    const payload =
      rawBody === undefined || method.toUpperCase() === 'GET'
        ? undefined
        : typeof rawBody === 'string'
          ? rawBody
          : headers['Content-Type'] === 'application/x-www-form-urlencoded'
            ? new URLSearchParams(rawBody).toString()
            : JSON.stringify(rawBody);

    return new Promise<any>((resolve, reject) => {
      $.ajax({
        url,
        method: method as any,
        data: payload,
        dataType: 'json',
        contentType: headers['Content-Type'],
        headers,
        success: (responseData: unknown) => resolve(responseData),
        error: (jqXHR: JQuery.jqXHR, _textStatus: JQuery.Ajax.TextStatus, _errorThrown: string | Error) => {
          console.error('API request failed:', _textStatus, _errorThrown);
          reject(new Error(`HTTP error! status: ${jqXHR?.status}`));
        },
      });
    });
  }

  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  async get(endpoint: string) {
    return this.request(endpoint, {
      method: 'GET',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
// Utility for making API calls from frontend
export class ApiClient {
  private baseUrl: string;
  private apiKeys: any;

  constructor(baseUrl: string = 'http://localhost:3001/api') {
    this.baseUrl = baseUrl;
    this.apiKeys = this.getStoredApiKeys();
  }

  private getStoredApiKeys() {
    try {
      const stored = localStorage.getItem('apiKeys');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      'X-API-Keys': JSON.stringify(this.apiKeys),
      ...options.headers
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  }

  async analyzeUrl(url: string) {
    return this.makeRequest('/analyze/url', {
      method: 'POST',
      body: JSON.stringify({ url })
    });
  }

  async chat(message: string, context?: string, provider?: string) {
    return this.makeRequest('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context, provider })
    });
  }

  async generateContent(prompt: string, contentType: string, platform?: string, url?: string, provider?: string) {
    return this.makeRequest('/content/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt, contentType, platform, url, provider })
    });
  }

  async generateEmail(prompt: string, emailType: string, brandInfo?: string, url?: string, provider?: string) {
    return this.makeRequest('/email/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt, emailType, brandInfo, url, provider })
    });
  }

  async generatePersona(description: string, provider?: string) {
    return this.makeRequest('/persona/generate', {
      method: 'POST',
      body: JSON.stringify({ description, provider })
    });
  }

  async validateApiKey(provider: 'openai' | 'anthropic', apiKey: string) {
    return this.makeRequest(`/validate/${provider}`, {
      method: 'POST',
      body: JSON.stringify({ apiKey })
    });
  }

  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return this.makeRequest('/upload/image', {
      method: 'POST',
      body: formData,
      headers: {
        'X-API-Keys': JSON.stringify(this.apiKeys)
      }
    });
  }

  async uploadImages(files: File[]) {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    return this.makeRequest('/upload/images', {
      method: 'POST',
      body: formData,
      headers: {
        'X-API-Keys': JSON.stringify(this.apiKeys)
      }
    });
  }
}
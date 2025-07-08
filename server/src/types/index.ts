export interface ApiKeys {
  openai?: string;
  anthropic?: string;
}

export interface AnalyzeUrlRequest {
  url: string;
  apiKeys: ApiKeys;
}

export interface ChatRequest {
  message: string;
  context?: string;
  apiKeys: ApiKeys;
  provider?: 'openai' | 'anthropic';
}

export interface ContentGenerationRequest {
  prompt: string;
  contentType: string;
  platform?: string;
  tone?: string;
  apiKeys: ApiKeys;
  provider?: 'openai' | 'anthropic';
}

export interface PersonaGenerationRequest {
  description: string;
  apiKeys: ApiKeys;
  provider?: 'openai' | 'anthropic';
}

export interface EmailGenerationRequest {
  prompt: string;
  emailType: string;
  brandInfo?: string;
  apiKeys: ApiKeys;
  provider?: 'openai' | 'anthropic';
}

export interface UrlAnalysisResult {
  title: string;
  description: string;
  content: string;
  keywords: string[];
  brandColors?: string[];
  images?: string[];
  metadata: {
    author?: string;
    publishDate?: string;
    wordCount: number;
  };
}

export interface PersonaData {
  name: string;
  role: string;
  company: string;
  avatar: string;
  age: string;
  location: string;
  income: string;
  education: string;
  goals: string[];
  painPoints: string[];
  solutions: string[];
  characteristics: string[];
  techComfort: string;
  decisionMaking: string;
  communication: string;
  workStyle: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
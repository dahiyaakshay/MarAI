# MarAI Frontend Implementation Documentation
### Complete Technical Reference for React Application

## Table of Contents
1. Architecture Overview
2. Project Structure
3. Core Application Layer
4. Services Implementation
5. Component System
6. Page Components Implementation
7. Conversation Memory System
8. Modal Implementation
9. Asset System Implementation
10. API Integration Patterns
11. UI Patterns & Styling
12. State Management Implementation
13. Export & Download System
14. Development Patterns

## 1. Architecture Overview
### 1.1 Current Technology Stack
- Frontend: React with TypeScript
- Build Tool: Vite (based on vite-env.d.ts reference)
- Styling: Custom CSS with CSS Variables
- Icons: Lucide React
- State Management: React Hooks with localStorage
- Authentication: Opaque token-based authentication with session management
- User Management: Individual user accounts with profile system
- Export Libraries: jsPDF, ExcelJS, file-saver (used in exportService.ts)

### 1.2 Core Files Structure
- Entry Point: main.tsx
- Main App: App.tsx
- Styling: App.css, index.css, Sidebar.css
- Services: apiService.ts, assetLoader.js, exportService.ts
- Components: Layout, Common, Modals (5 modals), Pages (11 main tools)

### 1.3 Core Dependencies
- React 18 with TypeScript
- Lucide React for icons (imported per component)
- Custom CSS with CSS variables for theming
- File System API for asset loading (window.fs.readFile)
- JSZip: Multi-file project packaging
- file-saver: File download handling
- ExcelJS: Excel file processing 

## 2. Project Structure
Based on imports and file organization:
<pre>src/
├── App.css                    # Global styles and theme system
├── App.tsx                    # Main application orchestrator
├── index.css                  # Contains: /* Remove all Tailwind imports to prevent conflicts with custom CSS */
├── main.tsx                   # React entry point
├── vite-env.d.ts             # /// <reference types="vite/client" />
├── components/               
│   ├── Common/              
│   │   ├── DownloadButton.tsx # Export functionality for calendars/content
│   │   └── MultiSelect.tsx    # Multi-option selector with checkboxes
│   ├── Layout/              
│   │   ├── Header.tsx         # Application header
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   └── Sidebar.css        # Sidebar-specific styles
│   ├── Modals/              
│   │   ├── AddClientModal.tsx # Client management modal
│   │   ├── EditModal.tsx      # Generic edit modal
│   │   ├── EditPersonaModal.tsx # Persona editing modal
│   │   ├── GuidelinesModal.tsx # AI prompting education system
│   │   └── PreviewModal.tsx   # Template/wireframe preview modal
│   └── Pages/               
│       ├── AdsAnalysis.tsx         # AI-powered advertising data analysis
│       ├── Auth.tsx                # User authentication (login/signup)
│       ├── ContentCreator.tsx       # Universal content generation tool
│       ├── Dashboard.tsx           # Main dashboard with analytics
│       ├── EmailCalendar.tsx       # Email campaign planning calendar
│       ├── EmailGenerator.tsx      # Email creation with templates/wireframes
│       ├── LandingPageBuilder.tsx  # Multi-platform landing page creation
│       ├── MarketingCalendar.tsx   # Marketing content calendar
│       ├── PersonaBuilder.tsx      # Customer persona builder and manager
│       ├── PromptLibrary.tsx       # AI prompt library and management
│       ├── Settings.tsx           # User settings and API configuration
│       └── SocialCalendar.tsx     # Social media content calendar
├── services/                
│   ├── apiService.ts        # API communication logic
│   ├── authService.ts       # Authentication and session management
│   ├── assetLoader.js       # Template/wireframe loading
│   └── exportService.ts     # Download and export functionality
└── assets/                  # Referenced in assetLoader.js
    └── generator-assets/    
        ├── email/
        │   ├── templates/ (11 templates)
        │   │   ├── announcement/ (2 templates)
        │   │   ├── ecommerce/ (3 templates)
        │   │   ├── newsletter/ (2 templates)
        │   │   └── promotional/ (4 templates)
        │   └── wireframes/ (10 wireframes)
        │       ├── announcement/ (2 wireframes)
        │       ├── e-commerce/ (4 wireframes)
        │       ├── newsletter/ (1 wireframe)
        │       ├── promotional/ (2 wireframes)
        │       └── welcome/ (1 wireframe)
        └── landing-page/
            ├── templates/ (8 templates)
            │   ├── agency/ (1 template)
            │   ├── ecommerce/ (2 templates)
            │   └── saas/ (5 templates)
            └── wireframes/ (10 wireframes)
                ├── agency/ (2 wireframes)
                ├── app/ (1 wireframe)
                ├── ecommerce/ (2 wireframes)
                ├── saas/ (3 wireframes)
                └── startup/ (2 wireframes)</pre>

## 3. Core Application Layer
### 3.1 main.tsx
```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### 3.2 index.css
Contains only:
```css
/* Remove all Tailwind imports to prevent conflicts with custom CSS */
```

### 3.3 App.tsx - Main Application Component
#### Page Data Structure:
```typescript
const pageData = {
  'dashboard': {
    title: 'Dashboard',
    subtitle: 'Overview of your marketing performance'
  },
  'marketing-calendar': {
    title: 'Marketing Calendar',
    subtitle: 'Plan and schedule your marketing campaigns'
  },
  'social-calendar': {
    title: 'Social Media Calendar',
    subtitle: 'Schedule and manage your social media posts'
  },
  'email-calendar': {
    title: 'Email Calendar',
    subtitle: 'Plan and schedule your email campaigns'
  },
  'email-generator': {
    title: 'Email Generator',
    subtitle: 'Generate compelling email content with AI'
  },
  'landing-page-builder': {
    title: 'Landing Page Builder',
    subtitle: 'Create high-converting landing pages with AI'
  },
  'persona-builder': {
    title: 'Persona Builder',
    subtitle: 'Create and manage customer personas'
  },
  'content-creator': {
    title: 'Content Creator',
    subtitle: 'Generate any type of content with AI'
  },
  'ads-analysis': {
    title: 'Ads Analysis',
    subtitle: 'Analyze your advertising data with AI'
  },
  'prompt-library': {
    title: 'Prompt Library',
    subtitle: 'Claude-optimized prompts for all your tools'
  },
  'settings': {
    title: 'Settings',
    subtitle: 'Configure your account and preferences'
  }
};
```

#### State Management:
```typescript
const [activePage, setActivePage] = useState('dashboard');
const [theme, setTheme] = useState('dark');
const [currentClient, setCurrentClient] = useState('default');
const [editModalOpen, setEditModalOpen] = useState(false);
const [addClientModalOpen, setAddClientModalOpen] = useState(false);
const [editPersonaModalOpen, setEditPersonaModalOpen] = useState(false);
const [previewModalOpen, setPreviewModalOpen] = useState(false);
const [guidelinesModalOpen, setGuidelinesModalOpen] = useState(false);
const [editModalData, setEditModalData] = useState(null);
const [previewModalData, setPreviewModalData] = useState(null);
const [guidelinesModalType, setGuidelinesModalType] = useState<'email' | 'landing-page'>('email');

const [clients, setClients] = useState({
  'default': { name: 'Select Client...', data: {} }
});
```

#### Authentication State Management:
```typescript
const [user, setUser] = useState<User | null>(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [authLoading, setAuthLoading] = useState(true);

// Authentication initialization on app startup
useEffect(() => {
  const initializeAuth = async () => {
    try {
      const isValid = await authService.initialize();
      if (isValid) {
        setUser(authService.getUser());
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
    } finally {
      setAuthLoading(false);
    }
  };
  initializeAuth();
}, []);
```

#### Authentication Handlers:
```typescript
const handleAuthSuccess = (user: any, token: string) => {
  setUser(user);
  setIsAuthenticated(true);
};

const handleLogout = async () => {
  try {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// Auth error event listener for automatic logout
useEffect(() => {
  const handleAuthError = () => {
    setUser(null);
    setIsAuthenticated(false);
  };
  
  window.addEventListener('authError', handleAuthError);
  return () => window.removeEventListener('authError', handleAuthError);
}, []);
```

#### Conditional Rendering Implementation:
```typescript
// Loading state during auth initialization
if (authLoading) {
  return (
    <div className="auth-loading">
      <div className="auth-loading-content">
        <div className="logo-icon">MarAI</div>
        <h1>MarAI</h1>
        <div className="loading-spinner"></div>
        <p>Initializing...</p>
      </div>
    </div>
  );
}

// Authentication gate
if (!isAuthenticated) {
  return <Auth onAuthSuccess={handleAuthSuccess} />;
}

// Main application (existing render logic)
```

#### Theme Management:
```typescript
useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    setTheme('light');
    document.body.classList.add('light-theme');
  }
}, []);

const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  document.body.classList.toggle('light-theme');
  localStorage.setItem('theme', newTheme);
};
```

#### Client Management:
```typescript
const saveNewClient = (clientData) => {
  const clientId = 'client' + (Object.keys(clients).length + 1);
  setClients(prev => ({
    ...prev,
    [clientId]: {
      name: clientData.companyName,
      data: clientData
    }
  }));
  setCurrentClient(clientId);
  closeAddClientModal();
};

const openGuidelinesModal = (type: 'email' | 'landing-page') => {
  setGuidelinesModalType(type);
  setGuidelinesModalOpen(true);
  document.body.style.overflow = 'hidden';
};

const closeGuidelinesModal = () => {
  setGuidelinesModalOpen(false);
  document.body.style.overflow = 'auto';
};
```

#### Template Usage Event System:
```typescript
// In PreviewModal onUse handler:
onUse={(data) => {
  // Navigate to appropriate generator and trigger the use functionality
  if (activePage === 'email-generator') {
    setActivePage('email-generator');
  } else if (activePage === 'landing-page-builder') {
    setActivePage('landing-page-builder');
  } else {
    // Default to email generator if called from other pages
    setActivePage('email-generator');
  }
  
  // The respective component will handle the actual template/wireframe usage
  setTimeout(() => {
    const event = new CustomEvent('useTemplateOrWireframe', { detail: data });
    window.dispatchEvent(event);
  }, 100);
}}
```

#### Page Routing:
```typescript
const renderActivePage = () => {
  switch (activePage) {
    case 'dashboard':
      return <Dashboard navigateToPage={navigateToPage} />;
    case 'marketing-calendar':
      return <MarketingCalendar openEditModal={openEditModal} />;
    case 'social-calendar':
      return <SocialCalendar openEditModal={openEditModal} />;
    case 'email-calendar':
      return <EmailCalendar openEditModal={openEditModal} />;
    case 'email-generator':
      return <EmailGenerator openPreviewModal={openPreviewModal} openGuidelinesModal={openGuidelinesModal} />;
    case 'landing-page-builder':
      return <LandingPageBuilder openPreviewModal={openPreviewModal} openGuidelinesModal={openGuidelinesModal} />;
    case 'persona-builder':
      return <PersonaBuilder openEditPersonaModal={openEditPersonaModal} />;
    case 'content-creator':
      return <ContentCreator />;
    case 'ads-analysis':
      return <AdsAnalysis />;
    case 'prompt-library':
      return <PromptLibrary />;
    case 'settings':
      return <Settings />;
    default:
      return <Dashboard navigateToPage={navigateToPage} />;
  }
};
```

## 4. Services Implementation
### 4.1 apiService.ts
#### Type Definitions:
```typescript
interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}
```

#### Core Request Method:
```typescript
private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<ApiResponse> {
  const apiKeys = this.getStoredApiKeys();
  
  const headers = {
  'Content-Type': 'application/json',
  'X-API-Keys': JSON.stringify(apiKeys),
  ...authService.getAuthHeader(),    // New: Add authentication token
  ...options.headers
};

  try {
    const response = await fetch(`http://localhost:3001/api/${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server');
    }
    throw error;
  }
}
```

#### API Key Storage:
```typescript
private getStoredApiKeys() {
  try {
    const stored = localStorage.getItem('apiKeys');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
```

#### Main Generation Method:
```typescript
async generateContent(conversationHistory: ConversationMessage[]): Promise<ApiResponse> {
  return this.makeRequest('generate', {
    method: 'POST',
    body: JSON.stringify({ conversationHistory })
  });
}
```

#### Backward Compatibility Methods:
```typescript
async generateContentFromPrompt(prompt: string): Promise<ApiResponse> {
  const conversationHistory: ConversationMessage[] = [
    { role: 'user', content: prompt }
  ];
  return this.generateContent(conversationHistory);
}

async generateEmail(prompt: string, emailType?: string): Promise<ApiResponse> {
  let fullPrompt = prompt;
  if (emailType) fullPrompt += `\n\nEmail type: ${emailType}`;
  fullPrompt += '\n\nReturn as JSON with subject, content, and html fields.';
  
  return this.generateContentFromPrompt(fullPrompt);
}

async generateMarketingCalendar(prompt: string, options?: any): Promise<ApiResponse> {
  let fullPrompt = `Create a marketing calendar. ${prompt}`;
  if (options) fullPrompt += `\n\nOptions: ${JSON.stringify(options)}`;
  
  return this.generateContentFromPrompt(fullPrompt);
}

async generateSocialCalendar(prompt: string, options?: any): Promise<ApiResponse> {
  let fullPrompt = `Create a social media calendar. ${prompt}`;
  if (options) fullPrompt += `\n\nOptions: ${JSON.stringify(options)}`;
  
  return this.generateContentFromPrompt(fullPrompt);
}

async generateEmailCalendar(prompt: string, options?: any): Promise<ApiResponse> {
  let fullPrompt = `Create an email marketing calendar. ${prompt}`;
  if (options) fullPrompt += `\n\nOptions: ${JSON.stringify(options)}`;
  
  return this.generateContentFromPrompt(fullPrompt);
}

async generatePersona(prompt: string, options?: any): Promise<ApiResponse> {
  let fullPrompt = `Create a customer persona. ${prompt}`;
  if (options) fullPrompt += `\n\nOptions: ${JSON.stringify(options)}`;
  
  return this.generateContentFromPrompt(fullPrompt);
}
```

#### Conversation History Methods:
```typescript
async generateEmailWithHistory(conversationHistory: ConversationMessage[]): Promise<ApiResponse> {
  return this.generateContent(conversationHistory);
}

async generatePersonaWithHistory(conversationHistory: ConversationMessage[]): Promise<ApiResponse> {
  return this.generateContent(conversationHistory);
}

async generateMarketingCalendarWithHistory(conversationHistory: ConversationMessage[]): Promise<ApiResponse> {
  return this.generateContent(conversationHistory);
}

async generateSocialCalendarWithHistory(conversationHistory: ConversationMessage[]): Promise<ApiResponse> {
  return this.generateContent(conversationHistory);
}

async generateEmailCalendarWithHistory(conversationHistory: ConversationMessage[]): Promise<ApiResponse> {
  return this.generateContent(conversationHistory);
}
```

#### Utility Methods:
```typescript
createConversationFromPrompt(prompt: string): ConversationMessage[] {
  return [{ role: 'user', content: prompt }];
}

addMessageToConversation(
  conversationHistory: ConversationMessage[], 
  role: 'user' | 'assistant', 
  content: string
): ConversationMessage[] {
  return [...conversationHistory, { role, content }];
}

estimateConversationTokens(conversationHistory: ConversationMessage[]): number {
  const totalCharacters = conversationHistory.reduce(
    (total, message) => total + message.content.length, 
    0
  );
  return Math.ceil(totalCharacters / 4); // Rough approximation: 1 token ≈ 4 characters
}

trimConversationHistory(
  conversationHistory: ConversationMessage[], 
  maxTokens: number = 45000 // Leave room for new request + response
): ConversationMessage[] {
  let trimmedHistory = [...conversationHistory];
  
  while (this.estimateConversationTokens(trimmedHistory) > maxTokens && trimmedHistory.length > 1) {
    // Remove oldest conversation pair (user + assistant)
    trimmedHistory.splice(0, 2);
  }
  
  return trimmedHistory;
}

async validateAnthropicKey(apiKey: string): Promise<ApiResponse> {
  return this.makeRequest('validate/anthropic', {
    method: 'POST',
    body: JSON.stringify({ apiKey })
  });
}
```

#### Authentication Integration Methods:
```typescript
isUserAuthenticated(): boolean
getCurrentUser(): User | null
getAuthenticationStatus(): { isAuthenticated: boolean; hasApiKey: boolean; canUseAI: boolean }
```

#### Export:
```typescript
export const apiService = new ApiService();
export type { ConversationMessage, ApiResponse };
```

### 4.2 authService.ts
#### Type Definitions:
```typescript
interface User {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
}

interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  error?: string;
  message?: string;
}
```

#### Core Authentication Methods:
```typescript
async signup(signupData: SignupData): Promise<AuthResponse>
async login(loginData: LoginData): Promise<AuthResponse>
async logout(): Promise<void>
async changePassword(passwordData: ChangePasswordData): Promise<AuthResponse>
```

#### Session Management:
```typescript
isAuthenticated(): boolean
validateSession(): Promise<boolean>
initialize(): Promise<boolean>
handleAuthError(): void
```

#### Token & Data Management:
```typescript
getToken(): string | null
getUser(): User | null
setToken(token: string): void       // Private
setUser(user: User): void          // Private
clearAuthData(): void
getAuthHeader(): Record<string, string>
```

#### Utility Methods:
```typescript
getUserEmail(): string | null
getUserId(): number | null
getUserDisplayInfo(): { email: string; initials: string } | null
hasValidSession(): boolean
refreshUser(): Promise<User | null>
```

#### Error Handling Features:
- Network error detection and messaging
- Token expiration handling with auto-logout
- Authentication error event dispatching
- Comprehensive error categorization

### 4.3 assetLoader.js
#### Email Template Loading:
```javascript
export const loadEmailTemplates = async () => {
  try {
    const { emailTemplates } = await import('../assets/generator-assets/email/templates/index.js');
    return emailTemplates || [];
  } catch (error) {
    console.warn('No email templates found or failed to load:', error.message);
    return [];
  }
};
```

#### Email Wireframe Loading:
```javascript
export const loadEmailWireframes = async () => {
  try {
    const { emailWireframes } = await import('../assets/generator-assets/email/wireframes/index.js');
    return emailWireframes || [];
  } catch (error) {
    console.warn('Failed to load email wireframes:', error.message);
    return [];
  }
};
```

#### Landing Page Template Loading:
```javascript
export const loadLandingPageTemplates = async () => {
  try {
    const { landingPageTemplates } = await import('../assets/generator-assets/landing-page/templates/index.js');
    return landingPageTemplates || [];
  } catch (error) {
    console.warn('Failed to load landing page templates:', error.message);
    return [];
  }
};
```

#### Landing Page Wireframe Loading:
```javascript
export const loadLandingPageWireframes = async () => {
  try {
    const { landingPageWireframes } = await import('../assets/generator-assets/landing-page/wireframes/index.js');
    return landingPageWireframes || [];
  } catch (error) {
    console.warn('No landing page wireframes found or failed to load:', error.message);
    return [];
  }
};
```

#### HTML Content Loading:
```javascript
const loadHTMLContent = async (filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      return null; // File not found - let components handle UI
    }
    
    const htmlContent = await response.text();
    console.log(`✅ Loaded HTML content: ${filePath}`);
    return htmlContent;
  } catch (error) {
    console.warn(`⚠️ Could not load HTML content from: ${filePath}`, error.message);
    return null; // Let components handle missing files
  }
};
```

#### Specific HTML Loaders:
```javascript
export const loadEmailTemplateHTML = async (templateId, category) => {
  const filePath = `/assets/generator-assets/email/templates/${category}/${templateId}/template.html`;
  return await loadHTMLContent(filePath);
};

export const loadEmailWireframeHTML = async (wireframeId, category) => {
  const filePath = `/assets/generator-assets/email/wireframes/${category}/${wireframeId}/wireframe.html`;
  return await loadHTMLContent(filePath);
};

export const loadLandingPageTemplateHTML = async (templateId, category) => {
  const filePath = `/assets/generator-assets/landing-page/templates/${category}/${templateId}/template.html`;
  return await loadHTMLContent(filePath);
};

export const loadLandingPageWireframeHTML = async (wireframeId, category) => {
  const filePath = `/assets/generator-assets/landing-page/wireframes/${category}/${wireframeId}/wireframe.html`;
  return await loadHTMLContent(filePath);
};
```

#### Generic Asset Loader:
```javascript
export const loadAssetContent = async (assetType, contentType, category, assetId, fileName = 'template.html') => {
  const filePath = `/assets/generator-assets/${assetType}/${contentType}/${category}/${assetId}/${fileName}`;
  return await loadHTMLContent(filePath);
};
```

#### Utility Functions:
```javascript
export const loadAllAssets = async () => {
  try {
    const [emailTemplates, emailWireframes, landingPageTemplates, landingPageWireframes] = await Promise.all([
      loadEmailTemplates(),
      loadEmailWireframes(),
      loadLandingPageTemplates(),
      loadLandingPageWireframes()
    ]);

    return {
      emailTemplates,
      emailWireframes,
      landingPageTemplates,
      landingPageWireframes,
      totalAssets: emailTemplates.length + emailWireframes.length + landingPageTemplates.length + landingPageWireframes.length
    };
  } catch (error) {
    console.error('Failed to load assets:', error);
    return {
      emailTemplates: [],
      emailWireframes: [],
      landingPageTemplates: [],
      landingPageWireframes: [],
      totalAssets: 0
    };
  }
};

export const getAssetById = (assets, id) => {
  if (!Array.isArray(assets)) {
    console.warn('getAssetById: assets is not an array');
    return null;
  }
  
  return assets.find(asset => asset && asset.id === id) || null;
};

export const validateAsset = (asset) => {
  const requiredFields = ['id', 'name', 'category', 'description'];
  
  return requiredFields.every(field => {
    const hasField = asset && typeof asset[field] === 'string' && asset[field].trim().length > 0;
    if (!hasField) {
      console.warn(`Asset missing required field: ${field}`, asset);
    }
    return hasField;
  });
};

export const filterAssetsByCategory = (assets, category) => {
  if (!Array.isArray(assets)) {
    console.warn('filterAssetsByCategory: assets is not an array');
    return [];
  }
  
  if (!category || category === 'all') {
    return assets;
  }
  
  return assets.filter(asset => asset && asset.category === category);
};

export const getAssetCategories = (assets) => {
  if (!Array.isArray(assets)) {
    console.warn('getAssetCategories: assets is not an array');
    return [];
  }
  
  const categories = assets
    .filter(asset => asset && asset.category)
    .map(asset => asset.category);
    
  return [...new Set(categories)].sort();
};

export const getAssetStats = (assets) => {
  if (!Array.isArray(assets)) {
    return { total: 0, categories: {} };
  }
  
  const stats = {
    total: assets.length,
    categories: {}
  };
  
  assets.forEach(asset => {
    if (asset && asset.category) {
      stats.categories[asset.category] = (stats.categories[asset.category] || 0) + 1;
    }
  });
  
  return stats;
};

export const assetContentExists = async (assetType, contentType, category, assetId, fileName = 'template.html') => {
  const content = await loadAssetContent(assetType, contentType, category, assetId, fileName);
  return content !== null;
};

export const getAssetFilePath = (assetType, contentType, category, assetId, fileName = 'template.html') => {
  return `/assets/generator-assets/${assetType}/${contentType}/${category}/${assetId}/${fileName}`;
};

export const logAssetStats = async () => {
  console.log('🔍 Loading Asset Stats...');
  
  const assets = await loadAllAssets();
  
  console.log('📊 Asset Statistics:');
  console.log(`Total Assets: ${assets.totalAssets}`);
  console.log(`Email Templates: ${assets.emailTemplates.length}`);
  console.log(`Email Wireframes: ${assets.emailWireframes.length}`);
  console.log(`Landing Page Templates: ${assets.landingPageTemplates.length}`);
  console.log(`Landing Page Wireframes: ${assets.landingPageWireframes.length}`);
  
  if (assets.emailTemplates.length > 0) {
    console.log('📧 Email Template Categories:', getAssetCategories(assets.emailTemplates));
  }
  
  if (assets.landingPageTemplates.length > 0) {
    console.log('🚀 Landing Page Template Categories:', getAssetCategories(assets.landingPageTemplates));
  }
  
  return assets;
};
```

### 4.4 exportService.ts
#### Type Definitions:
```typescript
export interface CalendarEvent {
  date: string;
  title: string;
  content: string;
  contentType: string;
  platform: string;
  status: string;
  hashtags?: string[];
  engagementStrategy?: string;
}

export interface PersonaData {
  name: string;
  role: string;
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

export interface ContentData {
  content: string;
  contentType: string;
  title?: string;
}
```

The exportService.ts file contains extensive calendar export, content export, and persona export functionality with PDF and Excel generation capabilities. It includes methods like exportCalendarPDF, exportContentPDF, exportPersonasPDF, exportCalendarExcel, etc.

## 5. Component System
### 5.1 Layout Components
#### Header.tsx
```typescript
interface HeaderProps {
  title: string;
  subtitle: string;
  theme: string;
  toggleTheme: () => void;
  currentClient: string;
  clients: Record<string, { name: string; data: any }>;
  switchClient: (clientId: string) => void;
  openAddClientModal: () => void;
  user: User | null;              // New
  onLogout: () => void;           // New
}
```

Renders theme toggle button, client dropdown, and add client button.

#### User Authentication Display:
```typescript
const getUserInitials = (email: string): string => {
  const emailParts = email.split('@');
  const localPart = emailParts[0];
  
  if (localPart.includes('.')) {
    const nameParts = localPart.split('.');
    return nameParts.slice(0, 2).map(part => part.charAt(0).toUpperCase()).join('');
  } else if (localPart.includes('_')) {
    const nameParts = localPart.split('_');
    return nameParts.slice(0, 2).map(part => part.charAt(0).toUpperCase()).join('');
  } else {
    return localPart.substring(0, 2).toUpperCase();
  }
};
```

#### Sidebar.tsx
Always-dark sidebar with navigation sections:
- General: Dashboard
- Calendar: Marketing Calendar, Social Media Calendar, Email Calendar
- Tools: Email Generator, Landing Page Builder, Persona Builder, Content Creator, Ads Analysis
- Other: Prompt Library, Settings

Uses dedicated Sidebar.css for styling.

### 5.2 Common Components
#### DownloadButton.tsx
```typescript
interface DownloadButtonProps {
  type: 'calendar' | 'content' | 'personas';
  calendarType?: string;
  className?: string;
}
```

Dropdown button supporting PDF and Excel exports through exportService.

#### MultiSelect.tsx
```typescript
interface MultiSelectProps {
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}
```

Multi-selection component with tag-based display and checkbox dropdown.

## 6. Page Components Implementation
### 6.1 ContentCreator.tsx
Purpose: Universal content creation tool supporting 12 content types

#### Content Types Supported:
```typescript
const contentTypes = [
  { value: 'blog', label: 'Blog Post' },
  { value: 'social-media', label: 'Social Media Post' },
  { value: 'emailer', label: 'Email Content' },
  { value: 'case-study', label: 'Case Study' },
  { value: 'press-release', label: 'Press Release' },
  { value: 'whitepaper', label: 'Whitepaper' },
  { value: 'video-script', label: 'Video Script' },
  { value: 'infographic', label: 'Infographic Content' },
  { value: 'product-description', label: 'Product Description' },
  { value: 'landing-copy', label: 'Landing Page Copy' },
  { value: 'ad-copy', label: 'Ad Copy' },
  { value: 'newsletter', label: 'Newsletter Content' }
];
```

#### Key Features:
- Content type selection dropdown
- Real-time preview with mobile/desktop modes
- Download buttons for PDF and Word (placeholder implementation)
- Copy to clipboard functionality
- Conversation memory with session management

#### Preview Implementation:
```typescript
// Preview styling for content display
<div style={{
  maxWidth: previewMode === 'mobile' ? '375px' : '100%',
  width: '100%',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  padding: '30px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'max-width 0.3s ease',
  fontFamily: 'Georgia, serif',
  lineHeight: '1.6',
  color: '#333',
  whiteSpace: 'pre-wrap'
}}>
```

### 6.2 Auth.tsx
Purpose: User authentication page with login and signup functionality

#### Dual Mode Interface:
```typescript
const [mode, setMode] = useState<'login' | 'signup'>('login');

const switchMode = () => {
  setMode(mode === 'login' ? 'signup' : 'login');
  setFormData({ email: '', password: '', confirmPassword: '' });
  setFormErrors({});
};
```

#### Form Validation Implementation:
```typescript
const validateForm = (): boolean => {
  const errors: FormErrors = {};
  
  // Email validation
  if (!formData.email.includes('@')) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Password validation
  if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }
  
  // Confirm password (signup only)
  if (mode === 'signup' && formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};
```

### 6.3 Dashboard.tsx
Purpose: Central hub with analytics, navigation, and overview widgets
#### Quick Actions Implementation:
```typescript
// Navigation structure
const quickActions = [
  { page: 'marketing-calendar', icon: Calendar, title: 'Marketing Calendar' },
  { page: 'social-calendar', icon: Search, title: 'Social Calendar' },
  { page: 'email-calendar', icon: Mail, title: 'Email Calendar' },
  { page: 'email-generator', icon: TrendingUp, title: 'Email Generator' },
  { page: 'persona-builder', icon: Users, title: 'Build Persona' },
  { page: 'settings', icon: Activity, title: 'Settings' }
];
```

#### Stats Cards Implementation:
```typescript
const statsData = [
  { number: '47', label: 'Content Created', change: '+12% This Week', positive: true },
  { number: '23', label: 'Active Campaigns', change: '+8.1% This Month', positive: true },
  { number: '89%', label: 'Content Success Rate', change: '+5.2% This Month', positive: true },
  { number: '156', label: 'Scheduled Posts', change: '-3.1% This Week', positive: false }
];
```

#### Analytics Chart (SVG Implementation):
```typescript
// Custom SVG chart with gradient bars
<svg width="320" height="160" viewBox="0 0 320 160">
  <defs>
    <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.6" />
    </linearGradient>
  </defs>
  {/* 7 bars representing weekly data */}
</svg>
```

#### Persona Slider Implementation:
```typescript
const [personaStartIndex, setPersonaStartIndex] = useState(0);
const visiblePersonas = allPersonas.slice(personaStartIndex, personaStartIndex + 3);

// Navigation functions
const nextPersonas = () => {
  if (personaStartIndex + 3 < allPersonas.length) {
    setPersonaStartIndex(personaStartIndex + 1);
  }
};
```

#### Mini Calendar Implementation:
```typescript
const getDaysInMonth = () => {
  // Complex calendar calculation returning array of day objects
  return days.map(dayData => ({
    day: number,
    isCurrentMonth: boolean,
    isToday: boolean,
    hasEvent: boolean
  }));
};
```

### 6.4 EmailGenerator.tsx
Purpose: Email creation with template/wireframe system
#### Tab System:
```typescript
const [activeTab, setActiveTab] = useState('create-email');
// Tabs: 'create-email', 'templates', 'wireframes'
```

#### Template Mode System:
```typescript
const [templateMode, setTemplateMode] = useState(false);
const [currentTemplateHTML, setCurrentTemplateHTML] = useState('');
const [currentTemplateInfo, setCurrentTemplateInfo] = useState<any>(null);
```

#### Template Loading System:
```typescript
const useTemplate = async (template: any) => {
  try {
    const templateHTML = await loadEmailTemplateHTML(template.id, template.category);
    
    if (templateHTML) {
      setCurrentTemplateHTML(templateHTML);
      setCurrentTemplateInfo(template);
      setTemplateMode(true);
      setEmailPreview(templateHTML);
    }
  } catch (error) {
    // Error handling for missing template files
  }
};
```

#### Email Preview Implementation:
```typescript
<div 
  style={{
    maxWidth: previewMode === 'mobile' ? '375px' : '600px',
    width: '100%',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'max-width 0.3s ease'
  }}
  dangerouslySetInnerHTML={{ __html: emailPreview }} 
/>
```
  
#### Asset Filtering System:
```typescript
const [templateFilter, setTemplateFilter] = useState('all');
const filteredTemplates = templateFilter === 'all' 
  ? templates 
  : templates.filter((t: any) => t.category === templateFilter);

// Filter buttons for categories: newsletter, promotional, welcome, announcement, ecommerce
```

### 6.5 LandingPageBuilder.tsx
Purpose: Multi-platform landing page creation with professional file separation
#### "Dumb Pipeline" Architecture:
- Let Claude decide single vs multi-file based on complexity
- Always-visible UI elements (no conditional rendering)
- Smart response parsing with JSON fallback to HTML

#### Multi-File Content Interface:
```typescript
interface MultiFileContent {
  [filename: string]: string;
}

// Enhanced state management
const [multiFileContent, setMultiFileContent] = useState<MultiFileContent>({});
const [codeView, setCodeView] = useState('preview');
const [isMultiFileMode, setIsMultiFileMode] = useState(false);
```

#### Smart Response Parsing:
```typescript
// Try JSON parsing first (multi-file response)
try {
  const jsonResponse = JSON.parse(cleaned);
  const hasValidFiles = keys.some(key => 
    key.includes('.html') || key.includes('.css') || key.includes('.js') || 
    key.includes('.php') || key.includes('.liquid') || key.includes('.jsx') || 
    key.includes('.vue')
  );
  
  if (hasValidFiles && keys.length > 1) {
    return { isMultiFile: true, files: jsonResponse };
  }
} catch (jsonError) {
  // Fall back to single HTML handling
}
```

#### Code View System (Always Visible):
9 Code View Buttons: Preview, HTML, CSS, JavaScript, PHP, Liquid, JSX, Vue, Tailwind
- Smart Content Detection: Automatically finds matching files by extension
- Fallback Messaging: Helpful messages when specific code types aren't available
- Copy Functionality: Copies current view content (HTML, CSS, JS, etc.)

#### ZIP Download System:
```typescript
const downloadZipPackage = async () => {
  const zip = new JSZip();
  
  if (isMultiFileMode && Object.keys(multiFileContent).length > 0) {
    // Multi-file ZIP with proper folder structure
    Object.entries(multiFileContent).forEach(([filename, content]) => {
      if (filename.includes('/')) {
        const parts = filename.split('/');
        const folder = parts.slice(0, -1).join('/');
        const file = parts[parts.length - 1];
        zip.folder(folder)?.file(file, content);
      } else {
        zip.file(filename, content);
      }
    });
  } else {
    // Single HTML file in ZIP
    zip.file(`${selectedPlatform}-landing-page.html`, landingPagePreview);
  }
  
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${selectedPlatform}-landing-page-project.zip`);
};
```

#### Platform-Specific File Generation:
- Static HTML: index.html + styles.css + script.js
- WordPress: index.php + style.css + functions.php
- Shopify: index.liquid + assets/theme.css + assets/theme.js
- React: App.jsx + App.css + package.json
- Vue: App.vue + style.css + package.json

### 6.6 PersonaBuilder.tsx
Purpose: AI-powered customer persona creation and management
#### Two-Tab System:
```typescript
const [activeTab, setActiveTab] = useState('new-persona');
// Tabs: 'new-persona', 'saved-personas'
```

#### Structured Persona Response Parsing:
```typescript
const parseStructuredMarkdown = (markdownText: string) => {
  // Extract demographic fields
  const extractDemographicField = (fieldName: string) => {
    const pattern = new RegExp(`\\*\\*${fieldName}:\\*\\*\\s*(.+?)(?=\\n|\\r|$)`, 'i');
    const match = markdownText.match(pattern);
    return match ? match[1].trim() : '';
  };

  // Extract section items (goals, pain points, etc.)
  const extractSectionItems = (sectionName: string) => {
    const sectionPattern = new RegExp(`##\\s*\\*?\\*?${sectionName}\\*?\\*?[^\\n]*\\n([\\s\\S]*?)(?=\\n#{2,3}|$)`, 'i');
    const sectionMatch = markdownText.match(sectionPattern);
    
    if (sectionMatch) {
      const content = sectionMatch[1];
      const bulletItems = content.match(/^\s*[-*•]\s*(.+?)$/gm);
      if (bulletItems) {
        return bulletItems
          .map(item => item.replace(/^\s*[-*•]\s*/, '').replace(/\*\*/g, '').trim())
          .filter(item => item.length > 5);
      }
    }
    return [];
  };
};
```

#### Comprehensive Persona Structure:
```typescript
const persona = {
  name: string,
  role: string,
  company: string,
  avatar: string,                    // Generated from initials
  age: string,
  location: string,
  income: string,
  education: string,
  goals: string[],                  // Array of goals
  painPoints: string[],             // Array of pain points
  solutions: string[],              // Preferred solutions
  characteristics: string[],        // Key characteristics
  techComfort: string,             // Behavioral trait
  decisionMaking: string,          // Behavioral trait
  communication: string,           // Behavioral trait
  workStyle: string,               // Behavioral trait
  buyingProcess: {
    decisionTimeline: string,
    budgetRange: string,
    keyInfluencers: string,
    evaluationCriteria: string,
    preferredVendors: string
  }
};
```

#### Saved Personas Management:
```typescript
// Sample personas with detailed view
const personas = [
  {
    id: 1,
    name: 'John Davis',
    role: 'Marketing Manager',
    avatar: 'JD',
    tags: ['B2B', 'Tech Savvy', '35-45']
  },
  // ... more personas
];

const currentPersona = personas.find(p => p.id === selectedPersona) || personas[0];
```

### 6.7 SocialCalendar.tsx
Purpose: Social media content calendar with platform-specific optimization
#### Calendar Event Structure:
```typescript
interface CalendarEvent {
  id: string;
  date: string;           // ISO date format
  time: string;           // HH:MM format
  platform: string;       // Social platform
  contentType: string;    // Type of content
  title: string;
  content: string;
  hashtags: string[];
  engagementStrategy: string;
}
```

#### Platform Configuration:
```typescript
const platforms = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube Shorts' },
  { value: 'snapchat', label: 'Snapchat' },
  { value: 'pinterest', label: 'Pinterest' },
  { value: 'reddit', label: 'Reddit' }
];
```

#### AI Response Parsing for Calendar Events:
```typescript
const parseAIResponseToCalendar = (aiResponse: string): CalendarEvent[] => {
  try {
    // Clean markdown formatting
    let cleanedResponse = aiResponse.trim();
    cleanedResponse = cleanedResponse.replace(/```json\s*/gi, '');
    cleanedResponse = cleanedResponse.replace(/```\s*/g, '');
    
    // Find JSON content
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedResponse = jsonMatch[0];
    }
    
    const parsed = JSON.parse(cleanedResponse);
    
    if (parsed.calendar && Array.isArray(parsed.calendar)) {
      return parsed.calendar.map((event: any, index: number) => ({
        id: `ai-${Date.now()}-${index}`,
        date: event.date || getNextBusinessDay(today, index).toISOString().split('T')[0],
        time: event.time || '09:00',
        platform: event.platform || (selectedPlatforms[0] || 'instagram'),
        contentType: event.contentType || 'post',
        title: event.title || `Social Post ${index + 1}`,
        content: event.content || 'Content generated by AI',
        hashtags: Array.isArray(event.hashtags) ? event.hashtags : [],
        engagementStrategy: event.engagementStrategy || 'Encourage engagement'
      }));
    }
  } catch (error) {
    // Fallback parsing for unstructured responses
    return parseUnstructuredResponse(aiResponse);
  }
  return [];
};
```

#### Platform Color Coding System:
```typescript
const getPlatformColor = (platform: string): string => {
  const colors: Record<string, string> = {
    facebook: '#1877f2',
    instagram: '#e4405f',
    twitter: '#1da1f2',
    linkedin: '#0077b5',
    tiktok: '#000000',
    youtube: '#ff0000',
    snapchat: '#fffc00',
    pinterest: '#bd081c',
    reddit: '#ff4500'
  };
  return colors[platform] || '#666';
};
```

#### Calendar Event Display:
```typescript
// Events shown on calendar days with platform color coding
{dayData.events.slice(0, 3).map((event) => (
  <div 
    key={event.id}
    className="event-item"
    style={{
      backgroundColor: getPlatformColor(event.platform),
      color: 'white',
      fontSize: '10px',
      padding: '2px 4px',
      margin: '1px 0',
      borderRadius: '2px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }}
    title={`${event.platform}: ${event.title}`}
  >
    {event.platform.charAt(0).toUpperCase()}: {event.title.slice(0, 15)}...
  </div>
))}
```

### 6.8 PromptLibrary.tsx
Purpose: Curated AI prompt library with search and customization
#### Prompt Structure:
```typescript
interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;        // The actual prompt text
  category: string;       // Component category
  tags: string[];         // Searchable tags
  useCase: string;        // Description of use case
}
```

#### Category System:
```typescript
const categories = [
  { id: 'all', name: 'All Prompts', icon: Book },
  { id: 'email-generator', name: 'Email Generator', icon: Mail },
  { id: 'landing-page-builder', name: 'Landing Page Builder', icon: Globe },
  { id: 'persona-builder', name: 'Persona Builder', icon: User },
  { id: 'marketing-calendar', name: 'Marketing Calendar', icon: Calendar },
  { id: 'social-calendar', name: 'Social Calendar', icon: Calendar },
  { id: 'email-calendar', name: 'Email Calendar', icon: Calendar },
  { id: 'content-creator', name: 'Content Creator', icon: FileText },
  { id: 'general', name: 'General Purpose', icon: Settings }
];
```

#### Search and Filter Implementation:
```typescript
const filteredPrompts = prompts.filter(prompt => {
  const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
  const matchesSearch = searchTerm === '' || 
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
  
  return matchesCategory && matchesSearch;
});
```

#### Edit and Copy Functionality:
```typescript
const [editingPrompt, setEditingPrompt] = useState<string | null>(null);
const [editedContent, setEditedContent] = useState('');
const [copiedPrompts, setCopiedPrompts] = useState<Set<string>>(new Set());

const copyToClipboard = async (promptId: string, content: string) => {
  try {
    await navigator.clipboard.writeText(content);
    setCopiedPrompts(prev => new Set(prev).add(promptId));
    
    // Remove copied state after 2 seconds
    setTimeout(() => {
      setCopiedPrompts(prev => {
        const newSet = new Set(prev);
        newSet.delete(promptId);
        return newSet;
      });
    }, 2000);
  } catch (error) {
    alert('Failed to copy to clipboard. Please try again.');
  }
};
```

#### Sample Prompt Structure:
```typescript
{
  id: 'email-1',
  title: 'Professional Welcome Email',
  description: 'Create a warm, professional welcome email for new customers',
  content: 'Create a professional welcome email for new customers joining our [COMPANY TYPE] service. Include:\n\n- Warm greeting and thanks for joining\n- Brief overview of what they can expect\n- Next steps or getting started guide\n- Contact information for support\n- Professional but friendly tone\n\nCompany details: [DESCRIBE YOUR COMPANY]\nKey benefits to highlight: [LIST KEY BENEFITS]',
  category: 'email-generator',
  tags: ['welcome', 'onboarding', 'professional'],
  useCase: 'Customer onboarding and relationship building'
}
```

### 6.9 Settings.tsx
Purpose: User profile management and API key configuration
#### Profile Management:
```typescript
const [profile, setProfile] = useState({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  company: 'Marketing Agency Inc.',
  role: 'Marketing Manager'
});

const saveProfile = async () => {
  try {
    setLoading(prev => ({ ...prev, profile: true }));
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, profile: false }));
      alert('Profile saved successfully!');
    }, 500);
  } catch (error) {
    console.error('Failed to save profile:', error);
    alert('Failed to save profile. Please try again.');
  }
};
```

#### Password Change Management:
```typescript
const [passwordData, setPasswordData] = useState({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
});

const [passwordErrors, setPasswordErrors] = useState<{
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  general?: string;
}>({});

const handlePasswordChange = async () => {
  // Validation
  if (passwordData.newPassword.length < 8) {
    setPasswordErrors({ newPassword: 'Password must be at least 8 characters long' });
    return;
  }
  
  if (passwordData.newPassword !== passwordData.confirmNewPassword) {
    setPasswordErrors({ confirmNewPassword: 'Passwords do not match' });
    return;
  }
  
  try {
    await authService.changePassword(passwordData);
    setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    setPasswordErrors({});
    alert('Password changed successfully!');
  } catch (error: any) {
    setPasswordErrors({ general: error.message });
  }
};
```

#### API Key Management:
```typescript
const [apiKey, setApiKey] = useState({
  value: '',
  masked: '',
  isValid: null,
  lastValidated: null
});

const [showApiKey, setShowApiKey] = useState(false);

// API key masking function
const maskApiKey = (key: string) => {
  if (!key || key.length < 8) return '';
  const start = key.substring(0, 4);
  const end = key.substring(key.length - 4);
  const middle = '•'.repeat(Math.max(4, key.length - 8));
  return `${start}${middle}${end}`;
};
```

#### API Key Validation:
```typescript
const validateApiKey = async () => {
  try {
    setLoading(prev => ({ ...prev, apiKey: true }));
    
    const response = await fetch('http://localhost:3001/api/validate/anthropic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: apiKey.value || apiKey.masked })
    });

    const result = await response.json();
    
    const updatedApiKey = {
      ...apiKey,
      isValid: result.success,
      lastValidated: new Date().toISOString()
    };
    
    setApiKey(updatedApiKey);
    localStorage.setItem('apiKeys', JSON.stringify({
      anthropic: updatedApiKey.value
    }));
    
    if (result.success) {
      alert('Claude API key is valid! AI features are now enabled.');
    } else {
      alert(`Claude API key validation failed: ${result.error}`);
    }
  } catch (error) {
    // Network error handling for backend connection issues
    if (error instanceof TypeError && error.message.includes('fetch')) {
      alert('Cannot connect to backend server. Please make sure the backend is running on http://localhost:3001');
    }
  } finally {
    setLoading(prev => ({ ...prev, apiKey: false }));
  }
};
```

#### API Status Display:
```typescript
const getApiStatus = () => {
  if (!apiKey.masked) return { text: 'Not Configured', className: '' };
  if (apiKey.isValid === true) return { text: 'Validated', className: 'validated' };
  if (apiKey.isValid === false) return { text: 'Invalid Key', className: 'error' };
  return { text: 'Not Validated', className: '' };
};

const getStatusIcon = () => {
  if (loading.apiKey) return <Loader size={16} className="animate-spin" />;
  if (apiKey.isValid === true) return <CheckCircle size={16} style={{ color: 'var(--success-color)' }} />;
  if (apiKey.isValid === false) return <XCircle size={16} style={{ color: 'var(--error-color)' }} />;
  return null;
};
```

### 6.10 AdsAnalysis.tsx
Purpose: AI-powered advertising data analysis with file upload support

#### File Processing System:
```typescript
// Excel to CSV Conversion
const buffer = await file.arrayBuffer();
const workbook = new ExcelJS.Workbook();
await workbook.xlsx.load(buffer);
const worksheet = workbook.worksheets[0];

let csvData = '';
worksheet.eachRow((row, rowNumber) => {
  const rowData = row.values.slice(1); // Remove first empty element
  csvData += rowData.join(',') + '\n';
});
```

#### Key Features:
- Supported Formats: CSV, Excel (.xlsx, .xls)
- Processing Pipeline: File Upload → ExcelJS Conversion → Claude Analysis → HTML Report
- Conversation Memory: Full 50k token management system
- Smart Data Integration: Data included only in first message, follow-ups just prompts
- Professional Export: HTML reports with embedded styling

#### Data Flow Pattern:
```typescript
// Include data only in first message
if (conversationHistory.length === 0) {
  promptToSend = `${currentPrompt}

Here is my advertising data to analyze:
${uploadedData}

Please analyze this data and provide insights...`;
} else {
  // Follow-up messages: just the prompt
  promptToSend = currentPrompt;
}
```

#### Export Functionality:
- HTML Download: Complete styled report with CSS embedded
- Copy to Clipboard: Raw HTML for external use
- File Naming: Intelligent naming based on original filename (ads-analysis-{fileName}.html)

### 6.11 EmailCalendar.tsx & MarketingCalendar.tsx
Purpose: Campaign planning calendars with AI integration
#### Shared Calendar Implementation Pattern:
```typescript
// Month navigation
const nextMonth = () => {
  setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
};

const prevMonth = () => {
  setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
};

// Calendar grid generation
const getDaysInMonth = () => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const days = [];
  
  // Previous month days for calendar padding
  const prevMonth = new Date(year, month - 1, 0);
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: prevMonth.getDate() - i,
      isCurrentMonth: false,
      isToday: false,
      hasEvent: false
    });
  }
  
  // Current month days with event checking
  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = year === today.getFullYear() && 
                   month === today.getMonth() && 
                   day === today.getDate();
    const hasEvent = [6, 12, 25].includes(day); // Sample events
    
    days.push({
      day,
      isCurrentMonth: true,
      isToday,
      hasEvent
    });
  }
  
  // Next month padding to fill 42-cell grid (6 rows × 7 days)
  const totalCells = 42;
  const remainingCells = totalCells - days.length;
  for (let day = 1; day <= remainingCells; day++) {
    days.push({
      day,
      isCurrentMonth: false,
      isToday: false,
      hasEvent: false
    });
  }
  
  return days;
};
```

#### MultiSelect Integration:
```typescript
// EmailCalendar specific selectors
<MultiSelect
  options={[
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'promotional', label: 'Promotional' },
    { value: 'welcome', label: 'Welcome Series' },
    { value: 'abandoned-cart', label: 'Abandoned Cart' },
    { value: 'product-launch', label: 'Product Launch' },
    { value: 'educational', label: 'Educational Content' },
    { value: 're-engagement', label: 'Re-engagement' },
    { value: 'survey', label: 'Survey/Feedback' }
  ]}
  value={selectedEmailTypes}
  onChange={setSelectedEmailTypes}
  placeholder="Select email types..."
/>

// MarketingCalendar specific selectors
<MultiSelect
  options={[
    { value: 'blog', label: 'Blog Post' },
    { value: 'infographic', label: 'Infographic' },
    { value: 'social-post', label: 'Social Media Post' },
    { value: 'email', label: 'Email Campaign' },
    { value: 'whitepaper', label: 'Whitepaper' },
    { value: 'video-script', label: 'Video Script' },
    { value: 'press-release', label: 'Press Release' },
    { value: 'case-study', label: 'Case Study' }
  ]}
  value={selectedContentTypes}
  onChange={setSelectedContentTypes}
  placeholder="Select content types..."
/>
```

#### Day Click Handler for Modal Integration:
```typescript
const handleDayClick = (day: number) => {
  const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  const dateString = selectedDate.toISOString().split('T')[0];
  openEditModal({ date: dateString });
};
```

## 7. Conversation Memory System
### 7.1 Core Interface
All AI-integrated components implement this exact conversation pattern:
```typescript
interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Standard State Management Pattern
const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
const [tokenCount, setTokenCount] = useState(0);
const [sessionActive, setSessionActive] = useState(true);
const [sessionId, setSessionId] = useState(Date.now().toString());
```

### 7.2 Token Management Constants
#### Used across all AI components:
```typescript
const TOKEN_LIMIT = 50000;              // 50k tokens per session
const TOKEN_WARNING_THRESHOLD = 0.8;    // Warning at 80%
const TOKEN_CRITICAL_THRESHOLD = 0.95;  // Critical at 95%

// Token estimation function
const estimateTokens = (text: string): number => {
  return Math.ceil(text.length / 4);
};
```

### 7.3 Session Management Implementation
#### Reset Session Function (standardized across components):
```typescript
const resetSession = () => {
  setConversationHistory([]);
  setTokenCount(0);
  setSessionActive(true);
  setSessionId(Date.now().toString());
  // Component-specific resets
  setEmailPreview('');           // EmailGenerator
  setLandingPagePreview('');     // LandingPageBuilder
  setGeneratedPersona(null);     // PersonaBuilder
  setCalendarEvents([]);         // SocialCalendar
};
```

### 7.4 Token Status UI Component
#### Implemented in all AI components:
```typescript
const getTokenStatus = () => {
  const percentage = tokenCount / TOKEN_LIMIT;
  if (percentage >= TOKEN_CRITICAL_THRESHOLD) {
    return { color: '#ff4444', status: 'critical' };
  } else if (percentage >= TOKEN_WARNING_THRESHOLD) {
    return { color: '#ff8800', status: 'warning' };
  } else {
    return { color: '#4CAF50', status: 'good' };
  }
};
```

## 8. Modal Implementation
### 8.1 AddClientModal.tsx
Client creation form with sections:
- Company Information: companyName, industry, website
- Primary Contact: contactName, contactEmail, phone, contactRole
- Marketing Details: targetAudience, budget, goals

- Industry Options: technology, healthcare, finance, retail, manufacturing, education, other
- Budget Options: 0-10k, 10k-50k, 50k-100k, 100k+
- Goal Options: brand-awareness, lead-generation, sales, engagement, retention

### 8.2 EditModal.tsx
Dynamic content editor with calendar-type configurations:
- Marketing Calendar: Blog posts, infographics, social posts, emails, whitepapers, video scripts, press releases, case studies
- Social Calendar: Posts, stories, reels, carousels
- Email Calendar: Newsletters, promotional, welcome series, abandoned cart

Each has platform-specific options and campaign types.

### 8.3 EditPersonaModal.tsx
Pre-populated persona editing form with sections:
- Basic Information: name, role, age, location
- Demographics: income, education
- Goals & Pain Points: goals, painPoints (textareas)
- Behavioral Traits: techComfort, decisionMaking, communication, workStyle
- Solutions & Characteristics: solutions, characteristics (textareas)

### 8.4 PreviewModal.tsx
Asset preview system that:
- Loads content using assetLoader functions
- Wraps content differently for email vs landing page
- Displays in iframe with proper styling
- Provides "Use Template/Wireframe" functionality

#### Content Loading Logic:
- Determines content type (email/landing-page) and asset type (template/wireframe)
- Calls appropriate assetLoader function
- Wraps content with proper HTML structure
- Handles loading states and errors

### 8.5 GuidelinesModal.tsx
Purpose: Comprehensive AI prompting education system

#### Four-Tab Interface:
```typescript
interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'email' | 'landing-page';
}

const tabs = [
  { id: 'design', label: 'Design & Branding', icon: Palette },
  { id: 'content', label: 'Content Structure', icon: Layout },
  { id: 'tracking', label: 'Tracking & Analytics', icon: Target },
  { id: 'examples', label: 'Example Prompts', icon: Code }
];
```

#### Dynamic Content System:
- Design & Branding: Colors, typography, logos, platform-specific constraints
- Content Structure: Email components vs landing page sections, accessibility guidelines
- Tracking & Analytics: GA4, Facebook Pixel, marketing automation, GDPR compliance
- Example Prompts: Complete copyable examples with best practices

#### Copy-to-Clipboard System:
```typescript
const copyToClipboard = async (text: string, sectionId: string) => {
  await navigator.clipboard.writeText(text);
  setCopiedSections(prev => new Set(prev).add(sectionId));
  
  setTimeout(() => {
    setCopiedSections(prev => {
      const newSet = new Set(prev);
      newSet.delete(sectionId);
      return newSet;
    });
  }, 2000);
};
```

#### Content Highlights:
- Email-specific: 600px width constraints, inline styles, email-client compatibility
- Landing Page-specific: Responsive design, platform considerations, multi-file output
- Universal: Color specifications, tracking setup, accessibility guidelines

## 9. Asset System Implementation
### 9.1 Asset Structure
<pre>public/assets/generator-assets/
├── email/
│   ├── templates/
│   │   ├── announcement/
│   │   │   └── announcement-01/
│   │   │       ├── metadata.json
│   │   │       ├── preview.png
│   │   │       └── template.html
│   │   ├── ecommerce/
│   │   ├── newsletter/
│   │   ├── promotional/
│   │   └── welcome/
│   └── wireframes/
│       ├── complex/
│       ├── grid/
│       ├── header-footer/
│       ├── sidebar/
│       └── simple/
└── landing-page/
    ├── templates/
    │   ├── agency/
    │   ├── app/
    │   ├── course/
    │   ├── ecommerce/
    │   ├── event/
    │   ├── portfolio/
    │   ├── saas/
    │   └── startup/
    └── wireframes/
        ├── feature-grid/
        ├── hero-focused/
        ├── long-form/
        ├── minimal/
        └── product-showcase/</pre>
        
### 9.2 Index Files Structure
#### Email Templates (src/assets/generator-assets/email/templates/index.js):
```javascript
import announcement01 from './announcement/announcement-01/metadata.json';

export const emailTemplates = [
  announcement01,
];

export const emailTemplateCategories = [
  'newsletter',
  'promotional', 
  'welcome',
  'announcement',
  'ecommerce'
];

export const emailTemplateCount = emailTemplates.length;
```

#### Email Wireframes (src/assets/generator-assets/email/wireframes/index.js):
**10 wireframes** with categories: announcement, e-commerce, newsletter, promotional, welcome

#### Landing Page Templates (src/assets/generator-assets/landing-page/templates/index.js):
**8 templates** with categories: agency, ecommerce, saas

#### Landing Page Wireframes (src/assets/generator-assets/landing-page/wireframes/index.js):
**10 wireframes** with categories: agency, app, ecommerce, saas, startup

### 9.3 Existing Template Example
#### announcement-01 metadata.json:
```json
{
  "id": "announcement-01",
  "name": "Company Announcement",
  "category": "announcement", 
  "description": "Professional company announcement email template with header, main content, and call-to-action",
  "tags": ["announcement", "professional", "company", "news"],
  "author": "MarAI Team",
  "version": "1.0.0",
  "platforms": ["email"],
  "features": ["Responsive", "Professional Design", "Call-to-Action"],
  "preview": {
    "image": "preview.png",
    "description": "Company announcement email preview"
  },
  "files": {
    "html": "template.html"
  },
  "prompt": "Create a professional company announcement email with clear messaging and call-to-action"
}
```

### 9.3 Preview Image Handling
#### Implementation in components:
```typescript
const getTemplatePreviewImage = (template: any) => {
  if (template.preview && template.preview.image) {
    return `/assets/generator-assets/email/templates/${template.category}/${template.id}/${template.preview.image}`;
  }
  return null;
};

// Template Preview Component with error handling
const TemplatePreview: React.FC<{ template: any }> = ({ template }) => {
  const [imageError, setImageError] = useState(false);
  const imageSrc = getTemplatePreviewImage(template);

  return (
    <div className="template-preview">
      {imageSrc && !imageError ? (
        <img 
          src={imageSrc}
          alt={`${template.name} preview`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px 8px 0 0'
          }}
          onError={() => setImageError(true)}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-secondary)',
          fontSize: '14px',
          textAlign: 'center',
          padding: '20px'
        }}>
          <div>
            <Mail size={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
            <div>Template Preview</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>
              {template.category} • {template.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
```

### 9.4 Template Usage System
#### Template and Wireframe Integration:
```typescript
// Global event system for template/wireframe usage
useEffect(() => {
  const handleUseTemplateOrWireframe = (event: any) => {
    const data = event.detail;
    if (data.type === 'template') {
      useTemplate(data);
    } else if (data.type === 'wireframe') {
      useWireframe(data);
    }
  };

  window.addEventListener('useTemplateOrWireframe', handleUseTemplateOrWireframe);
  
  return () => {
    window.removeEventListener('useTemplateOrWireframe', handleUseTemplateOrWireframe);
  };
}, []);
```

#### Filter System for Templates:
```typescript
// EmailGenerator filters
const templateFilters = ['all', 'newsletter', 'promotional', 'welcome', 'announcement', 'ecommerce'];

// LandingPageBuilder filters  
const landingFilters = ['all', 'saas', 'ecommerce', 'agency', 'startup', 'portfolio', 'app'];

const filteredTemplates = templateFilter === 'all' 
  ? templates 
  : templates.filter((t: any) => t.category === templateFilter);
```

## 10. API Integration Patterns
### 10.1 Standardized API Call Pattern
#### Used across all AI-integrated components:
```typescript
const callClaude = async (conversationHistory: ConversationMessage[]) => {
  const apiKeys = JSON.parse(localStorage.getItem('apiKeys') || '{}');
  
  const response = await fetch('http://localhost:3001/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Keys': JSON.stringify(apiKeys)
    },
    body: JSON.stringify({ conversationHistory })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }

  return await response.json();
};
```

### 10.2 Component-Specific Prompt Building
#### EmailGenerator Prompt Structure:
```typescript
if (templateMode && currentTemplateHTML) {
  // TEMPLATE MODE: Include current template HTML + user's edit request
  promptToSend = `Here is the current email template:

${currentTemplateHTML}

User's request: ${currentPrompt}

IMPORTANT EMAIL TEMPLATE EDITING REQUIREMENTS:
- Edit the above email template based on the user's request
- Maintain email-client compatibility 
- Keep max-width: 600px (email standard)
- Use inline styles ONLY (no external CSS)
- Do not include <html>, <head>, or <body> tags
- Return the complete updated HTML email template
- Focus on the user's specific changes while preserving the template structure`;
} else {
  // SCRATCH MODE: Create new email from user prompt
  promptToSend = `${currentPrompt}

IMPORTANT EMAIL REQUIREMENTS:
- Create HTML email content (not a full webpage)  
- Use max-width: 600px (email standard)
- Use inline styles ONLY (no external CSS)
- Make it email-client compatible
- Focus on email design principles, not webpage design
- Do not include <html>, <head>, or <body> tags
- Return only the email content that goes inside the email body`;
}
```

#### PersonaBuilder Structured Prompt:
```typescript
const personaPrompt = `${currentPrompt}

IMPORTANT PERSONA REQUIREMENTS:
Create a comprehensive customer persona with the following EXACT structure and format:

## **DEMOGRAPHIC PROFILE**
**Name:** [Full name with nickname if applicable]
**Age:** [Specific age or age range]
**Location:** [City, State/Country]
**Income:** [Annual salary range]
**Education:** [Degree and field]
**Job Title:** [Exact job title]
**Company Size:** [Company description and size]

## **GOALS & MOTIVATIONS**
- [Primary goal 1]
- [Primary goal 2]
- [Primary goal 3]
- [Primary goal 4]
- [Primary goal 5]

## **PAIN POINTS & CHALLENGES**
- [Pain point 1]
- [Pain point 2]
- [Pain point 3]
- [Pain point 4]
- [Pain point 5]

## **BEHAVIORAL TRAITS**
**Tech Comfort:** [Technology comfort level]
**Decision Making:** [Decision making style]
**Communication:** [Preferred communication methods]
**Work Style:** [Work style description]

## **SOLUTIONS & CHARACTERISTICS**
**Preferred Solutions:**
- [Solution 1]
- [Solution 2]
- [Solution 3]
- [Solution 4]

**Key Characteristics:**
- [Characteristic 1]
- [Characteristic 2]
- [Characteristic 3]
- [Characteristic 4]

## **BUYING PROCESS & INFLUENCES**
**Decision Timeline:** [How long typical buying process takes]
**Budget Range:** [Typical budget for solutions]
**Key Influencers:** [Who influences their decisions]
**Evaluation Criteria:** [What they evaluate when buying]
**Preferred Vendors:** [Types of vendors they prefer]

Make it detailed, realistic, and actionable for marketing purposes.`;
```

#### SocialCalendar JSON Response Requirements:
```typescript
fullPrompt += `\nIMPORTANT SOCIAL MEDIA CALENDAR REQUIREMENTS:
- Create a social media calendar with 7-14 posts optimized for the selected platforms
- Each post should be tailored to the specific platform's format, character limits, and audience behavior
- Include engaging content, relevant hashtags, and platform-specific strategies
- Return response as JSON with this exact structure:

{
  "calendar": [
    {
      "date": "2025-07-14",
      "time": "09:00", 
      "title": "Post Title",
      "content": "Engaging post content optimized for the platform...",
      "platform": "instagram",
      "contentType": "post",
      "hashtags": ["#RelevantHashtag", "#BrandHashtag"],
      "engagementStrategy": "Ask followers to share their experiences"
    }
  ]
}

Make sure each post is tailored to the specific platform's format, character limits, and audience behavior.`;
```

### 10.3 Response Parsing Implementations
#### EmailGenerator HTML Parsing:
```typescript
const parseEmailResponse = (aiResponse: string) => {
  let cleaned = aiResponse.trim();
  
  // Remove markdown code blocks
  cleaned = cleaned.replace(/^```\w*\s*/i, '');
  cleaned = cleaned.replace(/\s*```\s*$/i, '');
  cleaned = cleaned.replace(/<br>/g, '\n');
  
  // Extract content from full HTML documents
  if (cleaned.includes('<!DOCTYPE') || cleaned.includes('<html>')) {
    const bodyMatch = cleaned.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
      cleaned = bodyMatch[1];
    }
    
    cleaned = cleaned.replace(/<\/?html[^>]*>/gi, '');
    cleaned = cleaned.replace(/<\/?head[^>]*>/gi, '');
    cleaned = cleaned.replace(/<\/?body[^>]*>/gi, '');
    cleaned = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  }
  
  return {
    subject: 'Claude Generated Email', 
    content: cleaned,
    html: cleaned
  };
};
```

#### PersonaBuilder Markdown Parsing:
```typescript
const extractDemographicField = (fieldName: string) => {
  const pattern = new RegExp(`\\*\\*${fieldName}:\\*\\*\\s*(.+?)(?=\\n|\\r|$)`, 'i');
  const match = markdownText.match(pattern);
  
  if (match) {
    const value = match[1].trim();
    return value;
  }
  return '';
};

const extractSectionItems = (sectionName: string) => {
  const sectionPattern = new RegExp(`##\\s*\\*?\\*?${sectionName}\\*?\\*?[^\\n]*\\n([\\s\\S]*?)(?=\\n#{2,3}|$)`, 'i');
  const sectionMatch = markdownText.match(sectionPattern);
  
  if (sectionMatch) {
    const content = sectionMatch[1];
    const bulletItems = content.match(/^\s*[-*•]\s*(.+?)$/gm);
    if (bulletItems) {
      const items = bulletItems
        .map(item => item.replace(/^\s*[-*•]\s*/, '').replace(/\*\*/g, '').trim())
        .filter(item => item.length > 5);
      
      return items;
    }
  }
  return [];
};
```

### 10.4 Error Handling Pattern
#### Standardized across all components:
```typescript
try {
  const response = await callClaude(newConversationHistory);
  
  // Component-specific response processing
  const processedData = parseComponentResponse(response.data.content);
  
  // Update component state
  setComponentPreview(processedData);
  
  // Update conversation history
  const finalConversationHistory = [
    ...newConversationHistory,
    { role: 'assistant', content: response.data.content }
  ];
  setConversationHistory(finalConversationHistory);
  
  // Success message
  setMessages(prev => [
    ...prev.slice(0, -1),
    { type: 'ai', content: '✅ Success message for component' }
  ]);
} catch (error: any) {
  setMessages(prev => [
    ...prev.slice(0, -1),
    { type: 'ai', content: `❌ Error: ${error.message}` }
  ]);
} finally {
  setLoading(false);
}
```

## 11. UI Patterns & Styling
### 11.1 CSS Variables System (App.css)
#### Dark Theme (Default):
```css
:root {
  --bg-primary: #0f1419;
  --bg-secondary: #0d1117;
  --bg-card: #161b22;
  --bg-hover: #21262d;
  --border-color: #21262d;
  --border-hover: #30363d;
  --text-primary: #f0f6fc;
  --text-secondary: #c9d1d9;
  --text-muted: #7d8590;
  --text-subtle: #8b949e;
  --accent-color: #ff6b35;
  --accent-hover: #e55a2b;
  --success-color: #56d364;
  --error-color: #f85149;
  --warning-color: #f1c40f;
  --gradient-start: #21262d;
  --gradient-end: #30363d;
  
  /* Platform-specific colors */
  --platform-static: #2196f3;
  --platform-wordpress: #21759b;
  --platform-shopify: #95bf47;
  --platform-react: #61dafb;
  --platform-vue: #4fc08d;
}
```

#### Light Theme:
```css
body.light-theme {
  --bg-primary: #ffffff;
  --bg-secondary: #f6f8fa;
  --bg-card: #ffffff;
  --bg-hover: #f6f8fa;
  --border-color: #d0d7de;
  --border-hover: #afb8c1;
  --text-primary: #24292f;
  --text-secondary: #57606a;
  --text-muted: #6e7781;
  --text-subtle: #8c959f;
  --gradient-start: #f6f8fa;
  --gradient-end: #e1e4e8;
  
  /* Platform-specific colors for light theme */
  --platform-static: #1976d2;
  --platform-wordpress: #0073aa;
  --platform-shopify: #7ab55c;
  --platform-react: #20232a;
  --platform-vue: #35495e;
}
```

### 11.2 Sidebar-Specific Styling (Sidebar.css)
Always-dark styling regardless of theme:
```css
.sidebar {
  width: 240px;
  background-color: #161b22;
  border-right: 1px solid #21262d;
  display: flex;
  flex-direction: column;
}
```

### 11.3 Responsive Design
```css
@media (max-width: 768px) {
  .sidebar {
    width: 60px;
  }
  
  .nav-item span:last-child {
    display: none;
  }
  
  .logo h2 {
    display: none;
  }
  
  .nav-title {
    display: none;
  }
}
```

### 11.4 Layout Patterns
#### Two-Column Layout (Calendar Components):
```typescript
<div className="calendar-layout">
  <div className="calendar-section">
    {/* Left: Calendar grid */}
  </div>
  <div className="chat-section">
    {/* Right: AI chat interface */}
  </div>
</div>
```

#### Three-Section Layout (EmailGenerator, LandingPageBuilder):
```typescript
<div className="email-generator-layout">
  <div className="email-chat-section">
    {/* Left: Chat and configuration */}
  </div>
  <div className="email-preview-section">
    {/* Right: Preview area */}
  </div>
</div>
```

Dashboard Grid System:
```typescript
<div className="quick-actions">
  {/* 6-column action grid */}
</div>

<div className="grid grid-4">
  {/* 4-column stats cards */}
</div>

<div className="dashboard-top-row">
  {/* 3-column main content */}
</div>

<div className="dashboard-bottom-row">
  {/* 3-column widgets */}
</div>
```

### 11.5 Component Styling Patterns
#### Card Structure:
```typescript
<div className="card">
  <div className="card-header">
    <div className="card-title">Title</div>
    <div className="card-subtitle">Subtitle</div>
  </div>
  <div className="card-content">
    {/* Content */}
  </div>
</div>
```

#### Button Variants:
```typescript
<button className="btn">Primary Button</button>
<button className="btn btn-secondary">Secondary Button</button>
<button className="btn validate-btn">Validate Button (Settings)</button>
```

#### Form Elements:
```typescript
<div className="form-group">
  <label className="input-label">Label</label>
  <input className="form-input" />
</div>

<div className="form-grid form-grid-2">
  {/* 2-column form layout */}
</div>
```

### 11.6 Tab System Implementation
#### Used in EmailGenerator, LandingPageBuilder, PersonaBuilder:
```typescript
// Navigation
<div className="email-generator-nav">
  <button 
    className={`tab-btn ${activeTab === 'create-email' ? 'active' : ''}`}
    onClick={() => setActiveTab('create-email')}
  >
    Create Email
  </button>
  <button 
    className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`}
    onClick={() => setActiveTab('templates')}
  >
    Templates ({templates.length})
  </button>
</div>

// Content
{activeTab === 'create-email' && (
  <div className="email-tab active">
    {/* Tab content */}
  </div>
)}
```

### 11.7 Preview Toggle Implementation
#### Mobile/Desktop Preview Pattern:
```typescript
<div className="preview-toggle">
  <button 
    className={`toggle-btn ${previewMode === 'desktop' ? 'active' : ''}`}
    onClick={() => setPreviewMode('desktop')}
  >
    <Monitor size={12} />
    Desktop
  </button>
  <button 
    className={`toggle-btn ${previewMode === 'mobile' ? 'active' : ''}`}
    onClick={() => setPreviewMode('mobile')}
  >
    <Smartphone size={12} />
    Mobile
  </button>
</div>
```

### 11.8 Chat Interface Pattern
#### Standardized across AI components:
```typescript
<div className="chat-messages">
  {messages.map((message, index) => (
    <div key={index} className={`message ${message.type}`}>
      {message.content}
    </div>
  ))}
</div>

<div className="chat-input-area">
  <textarea 
    className="chat-input" 
    placeholder="Enter your message..."
    value={chatInput}
    onChange={(e) => setChatInput(e.target.value)}
    onKeyPress={handleKeyPress}
    disabled={loading || !canContinueConversation()}
  />
  <button 
    className="send-btn" 
    onClick={sendMessage}
    disabled={loading || !chatInput.trim() || !canContinueConversation()}
  >
    <Send size={16} />
  </button>
</div>
```

## 12. State Management Implementation
### 12.1 localStorage Usage
#### Theme Persistence (App.tsx):
```typescript
useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    setTheme('light');
    document.body.classList.add('light-theme');
  }
}, []);

const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  document.body.classList.toggle('light-theme');
  localStorage.setItem('theme', newTheme);
};
```

#### API Key Storage (apiService.ts):
```typescript
private getStoredApiKeys() {
  try {
    const stored = localStorage.getItem('apiKeys');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
```

#### Profile Data (Settings.tsx):
```typescript
// Save profile
localStorage.setItem('userProfile', JSON.stringify(profile));

// Load profile
const savedProfile = localStorage.getItem('userProfile');
if (savedProfile) {
  const parsedProfile = JSON.parse(savedProfile);
  setProfile(parsedProfile);
}
```

### 12.2 Authentication State Management
#### User Session Persistence (App.tsx):
```typescript
const [user, setUser] = useState<User | null>(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [authLoading, setAuthLoading] = useState(true);

// Initialize authentication on app startup
useEffect(() => {
  const initializeAuth = async () => {
    try {
      const isValid = await authService.initialize();
      if (isValid) {
        setUser(authService.getUser());
        setIsAuthenticated(true);
      }
    } finally {
      setAuthLoading(false);
    }
  };
  initializeAuth();
}, []);
```

#### Authentication Event Handling:
```typescript
// Global auth error listener for automatic logout
useEffect(() => {
  const handleAuthError = () => {
    setUser(null);
    setIsAuthenticated(false);
  };
  window.addEventListener('authError', handleAuthError);
  return () => window.removeEventListener('authError', handleAuthError);
}, []);
```

### 12.3 Modal State Pattern
#### Centralized Modal Management (App.tsx):
```typescript
const openEditModal = (data = null) => {
  setEditModalData(data);
  setEditModalOpen(true);
  document.body.style.overflow = 'hidden';
};

const closeEditModal = () => {
  setEditModalOpen(false);
  setEditModalData(null);
  document.body.style.overflow = 'auto';
};
```

### 12.4 Component Communication Patterns
#### Modal Integration:
```typescript
// Props passed to components
interface EmailCalendarProps {
  openEditModal: (data?: any) => void;
}

interface EmailGeneratorProps {
  openPreviewModal: (data: any) => void;
}

// Modal data structure
openEditModal({ 
  date: dateString,
  time: '09:00',
  title: '',
  content: '',
  contentType: '',
  platform: '',
  campaignType: '',
  status: 'draft',
  audience: '',
  tags: ''
});
```

#### Authentication Props Integration:
```typescript
// App.tsx passes user authentication data to Header
<Header 
  title={currentData.title}
  subtitle={currentData.subtitle}
  theme={theme}
  toggleTheme={toggleTheme}
  currentClient={currentClient}
  clients={clients}
  switchClient={switchClient}
  openAddClientModal={openAddClientModal}
  user={user}              // New: User data
  onLogout={handleLogout}  // New: Logout handler
/>

// Auth component receives authentication success callback
<Auth onAuthSuccess={handleAuthSuccess} />
```

#### Authentication Event System:
```typescript
// Global authentication error handling
window.dispatchEvent(new CustomEvent('authError'));

// Components listen for auth errors
window.addEventListener('authError', handleAuthError);
```

#### Global Event System (Template Usage):
```typescript
// Emit event
window.dispatchEvent(new CustomEvent('useTemplateOrWireframe', {
  detail: {
    type: 'template',
    contentType: 'email',
    id: template.id,
    name: template.name,
    category: template.category
  }
}));

// Listen for event
useEffect(() => {
  const handleUseTemplateOrWireframe = (event: any) => {
    const data = event.detail;
    if (data.type === 'template') {
      useTemplate(data);
    }
  };
  window.addEventListener('useTemplateOrWireframe', handleUseTemplateOrWireframe);
  return () => {
    window.removeEventListener('useTemplateOrWireframe', handleUseTemplateOrWireframe);
  };
}, []);
```

### 12.5 State Persistence Patterns
#### Calendar Events (SocialCalendar.tsx):
```typescript
// Store events globally for export service
useEffect(() => {
  (window as any).currentCalendarEvents = calendarEvents;
  (window as any).currentCalendarType = 'social';
}, [calendarEvents]);
```

#### Conversation History Management:
```typescript
// Add user message
const newConversationHistory: ConversationMessage[] = [
  ...conversationHistory,
  { role: 'user', content: promptToSend }
];

// Add AI response
const finalConversationHistory: ConversationMessage[] = [
  ...newConversationHistory,
  { role: 'assistant', content: response.data.content }
];
setConversationHistory(finalConversationHistory);
```

## 13. Export & Download System
### 13.1 DownloadButton Component
Location: src/components/Common/DownloadButton.tsx
#### Usage Pattern:
```typescript
<DownloadButton type="calendar" calendarType="email" />
<DownloadButton type="content" calendarType="email" />
<DownloadButton type="personas" />
```

### 13.2 Content Download Implementation
#### Email Code Download (EmailGenerator.tsx):
```typescript
const downloadEmailCode = () => {
  if (!emailPreview) {
    alert('Please generate content first');
    return;
  }

  const emailHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claude Generated Email</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        ${emailPreview}
    </div>
</body>
</html>`;

  const blob = new Blob([emailHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'claude-generated-email.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  alert('Email downloaded successfully!');
};
```

#### Landing Page Download (LandingPageBuilder.tsx):
```typescript
const downloadLandingPageCode = () => {
  if (!landingPagePreview) {
    alert('Please generate a landing page first');
    return;
  }

  const blob = new Blob([landingPagePreview], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${selectedPlatform}-landing-page.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  alert('Landing page downloaded successfully!');
};
```

### 13.3 Copy to Clipboard Implementation
#### Used across ContentCreator, EmailGenerator, LandingPageBuilder, PromptLibrary:
```typescript
const copyToClipboard = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content);
    alert('Content copied to clipboard!');
  } catch (error) {
    alert('Failed to copy to clipboard. Please try again.');
  }
};

// PromptLibrary specific with visual feedback
const copyToClipboard = async (promptId: string, content: string) => {
  try {
    await navigator.clipboard.writeText(content);
    setCopiedPrompts(prev => new Set(prev).add(promptId));
    
    // Remove the copied state after 2 seconds
    setTimeout(() => {
      setCopiedPrompts(prev => {
        const newSet = new Set(prev);
        newSet.delete(promptId);
        return newSet;
      });
    }, 2000);
  } catch (error) {
    alert('Failed to copy to clipboard. Please try again.');
  }
};
```

### 13.4 External Preview Implementation
#### LandingPageBuilder Open in New Tab:
```typescript
const openInNewTab = () => {
  if (!landingPagePreview) {
    alert('Please generate a landing page first');
    return;
  }

  const newWindow = window.open();
  if (newWindow) {
    newWindow.document.write(landingPagePreview);
    newWindow.document.close();
  }
};
```

### 13.5 Export Service Integration
#### Placeholder implementations referencing exportService.ts:
```typescript
// ContentCreator.tsx
const downloadContentPDF = () => {
  if (!contentPreview) {
    alert('Please generate content first');
    return;
  }
  console.log('PDF download requested for content type:', selectedContentType);
  alert('PDF download functionality will be added to exportService.ts');
};

const downloadContentWord = () => {
  if (!contentPreview) {
    alert('Please generate content first');
    return;
  }
  console.log('Word download requested for content type:', selectedContentType);
  alert('Word download functionality will be added to exportService.ts');
};
```

## 14. Development Patterns
### 14.1 Error Handling Pattern (assetLoader.js)
```javascript
try {
  const { emailTemplates } = await import('../assets/generator-assets/email/templates/index.js');
  return emailTemplates || [];
} catch (error) {
  console.warn('No email templates found or failed to load:', error.message);
  return [];
}
```

### 14.2 API Error Handling (apiService.ts)
typescript
```try {
  const response = await fetch(`http://localhost:3001/api/${endpoint}`, {
    ...options,
    headers
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
} catch (error) {
  if (error instanceof TypeError && error.message.includes('fetch')) {
    throw new Error('Cannot connect to backend server');
  }
  throw error;
}
```

### 14.3 Authentication Error Handling Pattern
#### Used across authentication-integrated components:
```typescript
try {
  await authService.login(loginData);
  handleAuthSuccess(user, token);
} catch (error: any) {
  if (error.message?.includes('Cannot connect to backend server')) {
    setFormErrors({ general: 'Cannot connect to server. Please check your connection.' });
  } else if (error.message?.includes('Invalid credentials')) {
    setFormErrors({ general: 'Invalid email or password. Please try again.' });
  } else {
    setFormErrors({ general: error.message || 'Authentication failed. Please try again.' });
  }
}
```

#### Session Expiration Handling:
```typescript
// Automatic logout on token expiration
const handleAuthError = () => {
  authService.clearAuthData();
  window.dispatchEvent(new CustomEvent('authError'));
};

// Global listener for auth errors
window.addEventListener('authError', () => {
  setUser(null);
  setIsAuthenticated(false);
});
```

### 14.4 Component Props Pattern
All components use TypeScript interfaces for props with proper typing.

### 14.5 Import/Export Pattern
- Components: Default exports with named interface exports
- Services: Named exports with singleton instances (apiService)
- Utilities: Named exports for functions

### 14.6 Browser Compatibility
- Uses modern JavaScript features (async/await, optional chaining)
- Clipboard API for copy functionality
- Natural language image URL integration
- CSS Grid and Flexbox for layouts

### 14.7 Performance Considerations
- Lazy loading of assets through assetLoader service
- Conversation history kept in memory (not persisted)
- Image error handling with fallback displays
- Efficient re-rendering with proper React keys

### 14.8 Security Considerations
- API keys stored in localStorage (client-side only)
- No sensitive data sent to client components
- File upload validation (image types, size limits)
- Proper error boundaries and input validation

#### Authentication Security:
- Opaque token storage in localStorage with automatic cleanup
- Session validation on app initialization and API requests
- Automatic logout on token expiration or authentication errors
- Password strength requirements (minimum 8 characters)
- Secure password change flow with current password verification
- Protection against session hijacking with server-side token validation
- Input validation and sanitization for authentication forms
- Error handling that doesn't expose sensitive information

#### Session Management Security:
```typescript
// Token expiration handling
if (response.status === 401) {
  authService.handleAuthError();  // Clear tokens and redirect
  throw new Error('Session expired');
}

// Secure token storage with cleanup
clearAuthData(): void {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
}
```

### 14.9 TypeScript Usage
- Interface definitions for all major data structures
- Proper typing for event handlers and props
- Type-safe state management patterns
- Generic typing for reusable components

### 14.10 Error Handling Strategy
- Graceful degradation for missing assets
- Network error handling with user feedback
- Fallback parsing for AI responses
- Input validation and boundary checking

## 15. Key Implementation Notes
### 15.1 File System Integration
The application references window.fs.readFile API but this appears to be a custom implementation not standard browser File API.

### 15.2 Asset Loading Strategy
- Templates and wireframes are loaded dynamically from index.js files
- HTML content is fetched via HTTP requests
- Graceful degradation for missing files
- Error handling with user-friendly messages

### 15.3 Conversation Context Management
- 50k token limit enforced across all AI components
- Visual indicators for session status
- Automatic session reset functionality
- Context preservation across multiple interactions

### 15.4 Platform-Specific Features
- Email generator focuses on email-client compatibility with GuidelinesModal education
- Landing page builder supports multiple frameworks with multi-file ZIP output
- Social calendar includes platform-specific optimizations
- Content creator supports universal content types
- Ads analysis provides data intelligence with Excel/CSV processing

### 15.5 Authentication System Integration
#### Session Management Strategy:
- Opaque token-based authentication with server-side validation
- Automatic session initialization on app startup with loading states
- Conditional rendering pattern: Loading → Auth Gate → Main Application
- Global authentication error handling with automatic logout

#### User Interface Integration:
- Seamless integration with existing Header component and user dropdown
- Smart avatar generation from email addresses with initials fallback
- Password management integrated into Settings page
- Professional branded authentication forms with real-time validation

#### API Request Enhancement:
- Automatic token inclusion in all API requests via authService integration
- Authentication-aware error handling with session expiration detection
- User context availability for enhanced AI features when authenticated
- Backward compatibility maintained for all existing functionality
  
### 15.6 New Capabilities Added
- **GuidelinesModal**: Comprehensive AI prompting education system with 4-tab interface
- **AdsAnalysis**: Professional data analysis with Excel processing and HTML reports
- **Multi-File Landing Pages**: ZIP packaging with platform-specific code separation
- **Asset Library**: 39 templates/wireframes vs previously mostly empty placeholders
- **Enhanced User Education**: Context-specific prompting guidelines for better AI results
- **User Authentication System**: Complete login/signup functionality with opaque token-based session management
- **Password Management**: Integrated password change functionality in Settings with validation and security requirements
- **User Interface Integration**: Professional avatar generation, user dropdown menu, and authentication-gated application access
- **Session Persistence**: Automatic session restoration on app startup with branded loading states and error handling
- **API Authentication**: Enhanced API service with automatic token inclusion and authentication-aware error handling

This documentation represents the complete implementation of the MarAI frontend including the comprehensive authentication system. All features, patterns, and implementations described are currently functional and deployed in the application.

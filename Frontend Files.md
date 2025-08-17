# MarAI Frontend Implementation Documentation

## Overview: MarAI
MarAI is a comprehensive AI-powered marketing platform built with React TypeScript that provides multiple marketing tools in one integrated system. It's designed to help marketers create, plan, analyze, and manage various marketing assets and campaigns using artificial intelligence.

## Project Structure
<pre>src/
│   App.css
│   App.tsx
│   index.css
│   main.tsx
│   vite-env.d.ts
│
├───assets
│   └───generator-assets
│       ├───email
│       │   ├───templates
│       │   │   │   index.js
│       │   │   │
│       │   │   ├───announcement
│       │   │   │   ├───announcement-01
│       │   │   │   │       metadata.json
│       │   │   │   │
│       │   │   │   └───announcement-02
│       │   │   │           metadata.json
│       │   │   │
│       │   │   ├───ecommerce
│       │   │   │   ├───ecommerce-01
│       │   │   │   │       metadata.json
│       │   │   │   │
│       │   │   │   ├───ecommerce-02
│       │   │   │   │       metadata.json
│       │   │   │   │
│       │   │   │   └───ecommerce-03
│       │   │   │           metadata.json
│       │   │   │
│       │   │   ├───newsletter
│       │   │   │   ├───newsletter-01
│       │   │   │   │       metadata.json
│       │   │   │   │
│       │   │   │   └───newsletter-02
│       │   │   │           metadata.json
│       │   │   │
│       │   │   └───promotional
│       │   │       ├───promotional-01
│       │   │       │       metadata.json
│       │   │       │
│       │   │       ├───promotional-02
│       │   │       │       metadata.json
│       │   │       │
│       │   │       ├───promotional-03
│       │   │       │       metadata.json
│       │   │       │
│       │   │       └───promotional-04
│       │   │               metadata.json
│       │   │
│       │   └───wireframes
│       │       │   index.js
│       │       │
│       │       ├───announcement
│       │       │   ├───announcement-wireframe-01
│       │       │   │       metadata.json
│       │       │   │
│       │       │   └───announcement-wireframe-02
│       │       │           metadata.json
│       │       │
│       │       ├───e-commerce
│       │       │   ├───ecommerce-wireframe-01
│       │       │   │       metadata.json
│       │       │   │
│       │       │   ├───ecommerce-wireframe-02
│       │       │   │       metadata.json
│       │       │   │
│       │       │   ├───ecommerce-wireframe-03
│       │       │   │       metadata.json
│       │       │   │
│       │       │   └───ecommerce-wireframe-04
│       │       │           metadata.json
│       │       │
│       │       ├───newsletter
│       │       │   └───newsletter-wireframe-01
│       │       │           metadata.json
│       │       │
│       │       ├───promotional
│       │       │   ├───promotional-wireframe-01
│       │       │   │       metadata.json
│       │       │   │
│       │       │   └───promotional-wireframe-02
│       │       │           metadata.json
│       │       │
│       │       └───welcome
│       │           └───welcome-wireframe-01
│       │                   metadata.json
│       │
│       └───landing-page
│           ├───templates
│           │   │   index.js
│           │   │
│           │   ├───agency
│           │   │   └───agency-01
│           │   │           metadata.json
│           │   │
│           │   ├───ecommerce
│           │   │   ├───ecommerce-01
│           │   │   │       metadata.json
│           │   │   │
│           │   │   └───ecommerce-02
│           │   │           metadata.json
│           │   │
│           │   └───saas
│           │       ├───saas-01
│           │       │       metadata.json
│           │       │
│           │       ├───saas-02
│           │       │       metadata.json
│           │       │
│           │       ├───saas-03
│           │       │       metadata.json
│           │       │
│           │       ├───saas-04
│           │       │       metadata.json
│           │       │
│           │       └───saas-05
│           │               metadata.json
│           │
│           └───wireframes
│               │   index.js
│               │
│               ├───agency
│               │   ├───agency-wireframe-01
│               │   │       metadata.json
│               │   │
│               │   └───agency-wireframe-02
│               │           metadata.json
│               │
│               ├───app
│               │   └───app-wireframe-01
│               │           metadata.json
│               │
│               ├───ecommerce
│               │   ├───ecommerce-wireframe-01
│               │   │       metadata.json
│               │   │
│               │   └───ecommerce-wireframe-02
│               │           metadata.json
│               │
│               ├───saas
│               │   ├───saas-wireframe-01
│               │   │       metadata.json
│               │   │
│               │   ├───saas-wireframe-02
│               │   │       metadata.json
│               │   │
│               │   └───saas-wireframe-03
│               │           metadata.json
│               │
│               └───startup
│                   ├───startup-wireframe-01
│                   │       metadata.json
│                   │
│                   └───startup-wireframe-02
│                           metadata.json
│
├───components
│   ├───Common
│   │       AnalysisReport.tsx
│   │       DownloadButton.tsx
│   │       MultiSelect.tsx
│   │       SaveButton.tsx
│   │
│   ├───Layout
│   │       Header.tsx
│   │       Sidebar.css
│   │       Sidebar.tsx
│   │
│   ├───Modals
│   │       AddClientModal.tsx
│   │       DeleteClientModal.tsx
│   │       EditClientModal.tsx
│   │       EditModal.tsx
│   │       EditPersonaModal.tsx
│   │       GuidelinesModal.tsx
│   │       PreviewModal.tsx
│   │
│   └───Pages
│           AdsAnalysis.tsx
│           Auth.tsx
│           ContentCreator.tsx
│           Dashboard.tsx
│           EmailCalendar.tsx
│           EmailGenerator.tsx
│           LandingPageBuilder.tsx
│           MarketingCalendar.tsx
│           PersonaBuilder.tsx
│           PromptLibrary.tsx
│           SavedAssets.tsx
│           Settings.tsx
│           SocialCalendar.tsx
│
├───services
│       apiService.ts
│       assetLoader.js
│       authService.ts
│       clientService.ts
│       dataAnalysisService.ts
│       exportService.ts
│
└───utils
        analysisUtils.ts</pre>

## Architecture Overview
### Technology Stack
- Frontend: React 18+ with TypeScript
- Build Tool: Vite
- Styling: Custom CSS with CSS Variables (no external frameworks)
- State Management: React hooks (useState, useEffect)
- Authentication: Custom authService
- Data Management: Custom clientService with API integration

## Core Application State
### Authentication State
```typescript
const [user, setUser] = useState<User | null>(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [authLoading, setAuthLoading] = useState(true);
```

### Navigation State
```typescript
const [activePage, setActivePage] = useState('dashboard');
```

### Theme State
```typescript
const [theme, setTheme] = useState('dark');
// Toggles between 'dark' and 'light', persisted to localStorage
```

### Client Management State
```typescript
const [clients, setClients] = useState<Client[]>([]);
const [currentClient, setCurrentClient] = useState<Client | null>(null);
const [clientsLoading, setClientsLoading] = useState(false);
const [clientsError, setClientsError] = useState<string | null>(null);
```

### Modal Management State
```typescript
const [editModalOpen, setEditModalOpen] = useState(false);
const [addClientModalOpen, setAddClientModalOpen] = useState(false);
const [editClientModalOpen, setEditClientModalOpen] = useState(false);
const [deleteClientModalOpen, setDeleteClientModalOpen] = useState(false);
const [editPersonaModalOpen, setEditPersonaModalOpen] = useState(false);
const [previewModalOpen, setPreviewModalOpen] = useState(false);
const [guidelinesModalOpen, setGuidelinesModalOpen] = useState(false);

// Modal data state
const [editModalData, setEditModalData] = useState(null);
const [editClientData, setEditClientData] = useState<Client | null>(null);
const [deleteClientData, setDeleteClientData] = useState<Client | null>(null);
const [previewModalData, setPreviewModalData] = useState(null);
const [guidelinesModalType, setGuidelinesModalType] = useState<'email' | 'landing-page'>('email');
```

## Page Configuration System
### Page Data Structure
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
  'saved-assets': {
    title: 'Saved Assets',
    subtitle: 'Manage and reuse your saved content across all tools'
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

## Data Models
### User Interface
```typescript
interface User {
  id: number;
  email: string;
  name: string;
  // Additional user properties from authService
}
```

### Client Interface
typescript
```interface Client {
  id: number;
  company_name: string;
  industry: string;
  website?: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  contact_role?: string;
  target_audience?: string;
  budget_range?: string;
  goals: string[]; // Array of goals
  description?: string;
  brand_guidelines?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}
```

## Service Layer
### Authentication Service (authService)
#### Methods:
- initialize(): Initialize authentication on app start
- logout(): Clear authentication state
- Handles token management and user session

### Client Service (clientService)
#### Methods:
- getClients(): Fetch all clients for authenticated user
- createClient(clientData): Create new client
- updateClient(clientId, updates): Update existing client
- deleteClient(clientId): Delete client

#### Expected API Response Format:
```typescript
{
  success: boolean;
  data: {
    clients?: Client[]; // For getClients
    client?: Client;    // For createClient/updateClient
  };
  error?: string;
}
```

## CSS Architecture
### Theme System
#### CSS Variables Structure:
```css
:root {
  /* Background Colors */
  --bg-primary: #0f1419;
  --bg-secondary: #0d1117;
  --bg-card: #161b22;
  --bg-hover: #21262d;
  
  /* Border Colors */
  --border-color: #21262d;
  --border-hover: #30363d;
  
  /* Text Colors */
  --text-primary: #f0f6fc;
  --text-secondary: #c9d1d9;
  --text-muted: #7d8590;
  --text-subtle: #8b949e;
  
  /* Accent Colors */
  --accent-color: #ff6b35;
  --accent-hover: #e55a2b;
  
  /* Status Colors */
  --success-color: #56d364;
  --error-color: #f85149;
  --warning-color: #f1c40f;
  
  /* Platform Colors */
  --platform-static: #2196f3;
  --platform-wordpress: #21759b;
  --platform-shopify: #95bf47;
  --platform-react: #61dafb;
  --platform-vue: #4fc08d;
}

body.light-theme {
  /* Light theme overrides for all variables */
}
```

## Layout System
### Grid Classes:
```css
.grid { display: grid; gap: 24px; }
.grid-2 { grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); }
.grid-3 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.grid-4 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
```

### Button System:
```css
.btn { /* Primary button */ }
.btn-secondary { /* Secondary button */ }
.btn-cancel { /* Cancel button */ }
.btn-save { /* Save button */ }
.btn-delete { /* Delete button */ }
```

### Modal System:
```css
.modal-overlay { /* Fixed overlay with backdrop blur */ }
.modal { /* Modal container */ }
.modal-header { /* Modal header */ }
.modal-content { /* Modal content area */ }
.modal-actions { /* Modal action buttons */ }
```

## Application Flow
### Initialization Sequence
1. App loads → authLoading: true
2. authService.initialize() called
3. If authenticated → load clients via clientService.getClients()
4. Set first client as current if available
5. Render main application

### Authentication Flow
1. Unauthenticated users see <Auth /> component
2. Successful auth calls handleAuthSuccess(userData, token)
3. Sets isAuthenticated: true and loads clients
4. Auth errors trigger logout and state cleanup

### Client Management Flow
1. Clients loaded on authentication
2. Current client automatically set to first available
3. Client switching updates currentClient state
4. All pages receive currentClient as prop

### Navigation System
1. activePage state controls which page component renders
2. navigateToPage(pageId) updates active page
3. Page metadata from pageData used for headers
4. All pages receive common props: currentClient, clients, refreshClients

### Modal Management
1. Each modal has open/close state and data state
2. Opening modal sets document.body.style.overflow = 'hidden'
3. Closing modal restores document.body.style.overflow = 'auto'
4. Modal data cleared on close

## Inter-Component Communication
### Event System
#### Custom Events Used:
```typescript
// For template/wireframe usage
window.dispatchEvent(new CustomEvent('useTemplateOrWireframe', { detail: data }));

// For saved asset reuse
window.dispatchEvent(new CustomEvent('reuseSavedAsset', { detail: { asset } }));

// For calendar content population
window.dispatchEvent(new CustomEvent('populateCalendarContent', { detail: { asset } }));

// For authentication errors
window.dispatchEvent(new CustomEvent('authError'));
```

### Prop Passing Pattern
#### Common Props Structure:
```typescript
const commonProps = {
  currentClient,
  clients,
  refreshClients
};
```
All page components receive these props for consistent data access.

## Error Handling
### Authentication Errors
- 401 errors trigger authError event
- Event listener clears all auth state
- User redirected to login

### Client Management Errors
- API errors shown via alert() (TODO: improve UX)
- Loading states during operations
- Automatic retry not implemented

### General Error Strategy
- Try/catch blocks around async operations
- Console logging for debugging
- Basic user feedback via alerts

## Development Patterns
### State Management Pattern
- All state in App.tsx
- Props drilling for data access
- Event system for cross-component communication

### Modal Pattern
- Centralized modal state management
- Modal components receive data via props
- Body overflow management for proper UX

### Theme Management
- CSS variables for theming
- Theme toggle updates CSS class on body
- Theme preference persisted to localStorage

### API Integration Pattern
- Services return standardized response format
- Error handling in calling components
- Loading states managed per operation

## File Dependencies
### Critical Dependencies
- authService and clientService must be implemented
- All page components must accept currentClient, clients, refreshClients props
- Modal components must follow established props pattern

### CSS Dependencies
- App.css contains all styling - no external CSS frameworks
- Theme variables must be maintained for consistency
- Responsive design built into CSS classes

## Analysis Utilities (analysisUtils.ts)
### Core Data Parsing & Validation
```typescript
// Enhanced number parsing with K/M/B/T suffix support
export const parseFormattedNumber = (value: string | number): number | null => {
  // Handles direct numbers, string conversions, and suffix multipliers (K, M, B, T)
  // Includes validation for non-numeric placeholders and formatting chars
}

// Safe division with fallback to prevent NaN/Infinity
export const safeDivide = (numerator: number, denominator: number, fallback: number = 0): number => {
  // Validates inputs, handles division by zero, ensures finite results
}

// Number validation with default fallbacks
export const validateNumber = (value: any, defaultValue: number = 0): number => {
  // Ensures all numeric inputs are finite and non-negative
}
```

### Metric Calculations
```typescript
// All metric functions use validated inputs and safe division
export const calculateROAS = (revenue: number | string, adSpend: number | string): number
export const calculateCTR = (clicks: number | string, impressions: number | string): number
export const calculateConversionRate = (conversions: number | string, clicks: number | string): number
export const calculateCPC = (adSpend: number | string, clicks: number | string): number
export const calculateCostPerConversion = (adSpend: number | string, conversions: number | string): number
export const calculateProfitMargin = (revenue: number | string, adSpend: number | string): number
export const calculateCAC = (adSpend: number | string, newCustomers: number | string): number
export const calculateAOV = (revenue: number | string, orders: number | string): number
```

### Industry Benchmarks & Performance Analysis
```typescript
export const INDUSTRY_BENCHMARKS = {
  ROAS: { excellent: 6.0, good: 4.0, average: 2.5, poor: 1.5 },
  CTR: { excellent: 3.0, good: 2.0, average: 1.0, poor: 0.5 },
  CONVERSION_RATE: { excellent: 5.0, good: 3.0, average: 2.0, poor: 1.0 },
  CPC: { excellent: 0.5, good: 1.0, average: 2.0, poor: 5.0 }
};

export interface BenchmarkComparison {
  value: number;
  benchmark: number;
  performance: 'excellent' | 'good' | 'average' | 'poor' | 'critical';
  percentageDifference: number;
  recommendation: string;
}
```

### Data Validation System
```typescript
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Validates advertising data rows with required fields and business logic
export const validateAdDataRow = (row: any): ValidationResult
// Validates CSV headers against required and recommended columns
export const validateCSVHeaders = (headers: string[]): ValidationResult
```

## API Service (apiService.ts)
### Core Authentication & Client Management
```typescript
interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface Client {
  id: number;
  user_id: number;
  company_name: string;
  industry?: string;
  website?: string;
  contact_name?: string;
  contact_email?: string;
  // ... additional client fields
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface GenerationOptions {
  client_id?: number;
  content_type?: string;
  title?: string;
  metadata?: Record<string, any>;
}
```

### Main AI Content Generation
```typescript
// Enhanced method - send conversation history to Claude with optional client context
async generateContent(
  conversationHistory: ConversationMessage[], 
  options?: GenerationOptions
): Promise<ApiResponse> {
  // Adds client context if provided
  // Logs generation details for debugging
  // Returns structured API response
}

// Analysis Q&A functionality for ads analysis
async generateAnalysisInsight(
  analysisHTML: string,
  userQuestion: string,
  client?: Client
): Promise<string> {
  // Creates structured prompt with analysis context
  // Uses existing generateContent method
  // Handles client context and metadata
}
```

### Client Management Methods
```typescript
// CRUD operations for clients
async getClients(): Promise<ApiResponse>
async getClient(clientId: number): Promise<ApiResponse>
async createClient(clientData: CreateClientData): Promise<ApiResponse>
async updateClient(clientId: number, updates: UpdateClientData): Promise<ApiResponse>
async deleteClient(clientId: number): Promise<ApiResponse>

// Client content and analytics
async getClientContent(clientId: number): Promise<ApiResponse>
async getClientStats(clientId: number): Promise<ApiResponse>
async getDashboardAnalytics(): Promise<ApiResponse>
```

### Authentication System
```typescript
// Enhanced user authentication with profile management
async signup(signupData: SignupData): Promise<ApiResponse>
async login(loginData: LoginData): Promise<ApiResponse>
async logout(): Promise<ApiResponse>
async verifyEmail(verificationData: VerificationData): Promise<ApiResponse>
async forgotPassword(forgotData: ForgotPasswordData): Promise<ApiResponse>
async resetPassword(resetData: ResetPasswordData): Promise<ApiResponse>

// Profile management
async updateProfile(profileData: UpdateProfileData): Promise<ApiResponse>
async changePassword(passwordData: ChangePasswordData): Promise<ApiResponse>
async getCurrentUser(): Promise<ApiResponse>
```

### Saved Assets System
```typescript
interface SavedAsset {
  id: number;
  user_id: number;
  asset_type: AssetType;
  title: string;
  content: string;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

// Asset management with 100-item limit enforcement
async getSavedAssets(filters?: SavedAssetFilters): Promise<ApiResponse>
async createSavedAsset(data: CreateSavedAssetData): Promise<ApiResponse>
async updateSavedAsset(assetId: number, data: UpdateSavedAssetData): Promise<ApiResponse>
async deleteSavedAsset(assetId: number): Promise<ApiResponse>
```

### Legacy & Compatibility Methods
```typescript
// Backward compatibility - converts single prompts to conversation format
async generateContentFromPrompt(prompt: string, options?: GenerationOptions): Promise<ApiResponse>

// Legacy methods for specific content types
async generateEmail(prompt: string, emailType?: string, client?: Client | null): Promise<ApiResponse>
async generatePersona(prompt: string, options?: any, client?: Client | null): Promise<ApiResponse>
async generateLandingPage(prompt: string, platform?: string, client?: Client | null): Promise<ApiResponse>
```

## Asset Loader Service (assetLoader.js)
### Dynamic Template/Wireframe Loading
```javascript
// Core loading functions for different asset types
export const loadEmailTemplates = async () => {
  // Imports from '../assets/generator-assets/email/templates/index.js'
  // Returns array of email template objects or empty array
}

export const loadEmailWireframes = async () => {
  // Imports from '../assets/generator-assets/email/wireframes/index.js'
  // Returns array of email wireframe objects or empty array
}

export const loadLandingPageTemplates = async () => {
  // Imports from '../assets/generator-assets/landing-page/templates/index.js'
  // Returns array of landing page template objects or empty array
}

export const loadLandingPageWireframes = async () => {
  // Imports from '../assets/generator-assets/landing-page/wireframes/index.js'
  // Returns array of landing page wireframe objects or empty array
}
```

### Universal HTML Content Loading
```javascript
// Most flexible function - works with any path structure
const loadHTMLContent = async (filePath) => {
  // Fetches HTML content from any file path
  // Returns HTML string or null if not found
  // Handles fetch errors gracefully
}

// Specific content loaders
export const loadEmailTemplateHTML = async (templateId, category)
export const loadEmailWireframeHTML = async (wireframeId, category)
export const loadLandingPageTemplateHTML = async (templateId, category)
export const loadLandingPageWireframeHTML = async (wireframeId, category)

// Generic asset content loader
export const loadAssetContent = async (assetType, contentType, category, assetId, fileName = 'template.html')
```

### Asset Management Utilities
```javascript
// Asset validation and filtering
export const validateAsset = (asset) => {
  // Checks for required fields: id, name, category, description
  // Returns boolean validation result
}

export const filterAssetsByCategory = (assets, category)
export const getAssetCategories = (assets)
export const getAssetStats = (assets)

// File system utilities
export const assetContentExists = async (assetType, contentType, category, assetId, fileName)
export const getAssetFilePath = (assetType, contentType, category, assetId, fileName)
```

## Authentication Service (authService.ts)
### Core Authentication Management
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

### Authentication Methods
```typescript
class AuthService {
  private baseUrl: string = 'http://localhost:3001/api/auth';
  private tokenKey: string = 'authToken';
  private userKey: string = 'currentUser';

  // Core authentication
  async signup(signupData: SignupData): Promise<AuthResponse>
  async login(loginData: LoginData): Promise<AuthResponse>
  async logout(): Promise<ApiResponse>
  async logoutAll(): Promise<ApiResponse>

  // Password management
  async changePassword(passwordData: ChangePasswordData): Promise<ApiResponse>
  
  // Session management
  async getCurrentUser(): Promise<{ success: boolean; data?: User; error?: string }>
  async validateSession(): Promise<boolean>
  async refreshUser(): Promise<User | null>
}
```

### Token & Session Management
```typescript
// Local storage management
private setToken(token: string): void
private setUser(user: User): void
getToken(): string | null
getUser(): User | null
clearAuthData(): void

// Authentication state
isAuthenticated(): boolean
hasValidSession(): boolean
getAuthHeader(): Record<string, string>

// Error handling
handleAuthError(): void // Clears auth data and dispatches custom event
```

### User Utilities
```typescript
// User information helpers
getUserEmail(): string | null
getUserId(): number | null
getUserDisplayInfo(): { email: string; initials: string } | null

// Session initialization
async initialize(): Promise<{ isAuthenticated: boolean; user: User | null }>
```

## Client Service (clientService.ts)
### Client Data Models
```typescript
interface Client {
  id: number;
  user_id: number;
  company_name: string;
  industry?: string;
  website?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_role?: string;
  target_audience?: string;
  budget_range?: string;
  goals?: string[];
  description?: string;
  brand_colors?: Record<string, any>;
  brand_guidelines?: string;
  notes?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

interface ClientContent {
  id: number;
  client_id: number;
  content_type: string;
  title: string;
  content: string;
  metadata: Record<string, any>;
  tags?: string[];
  status: 'active' | 'archived' | 'draft' | 'deleted';
  version: number;
  ai_provider: string;
  ai_model?: string;
  token_count?: number;
  generation_time_ms?: number;
  template_used?: string;
  platform?: string;
  is_favorite: boolean;
  created_at: Date;
  updated_at: Date;
}
```

### Core CRUD Operations
```typescript
class ClientService {
  private readonly baseUrl = 'http://localhost:3001/api/clients';

  // Client management
  async getClients(includeStats: boolean = false): Promise<ApiResponse<ClientSummary[]>>
  async getClient(clientId: number): Promise<ApiResponse<Client & { stats: ClientStats }>>
  async createClient(clientData: CreateClientData): Promise<ApiResponse<Client>>
  async updateClient(clientId: number, updateData: UpdateClientData): Promise<ApiResponse<Client>>
  async deleteClient(clientId: number): Promise<ApiResponse<void>>

  // Content management
  async getClientContent(clientId: number, filters: ContentFilters = {}): Promise<ApiResponse<ClientContent[]>>
  async getClientStats(clientId: number): Promise<ApiResponse<ClientStats>>
  async getClientRecentContent(clientId: number, limit: number = 10): Promise<ApiResponse<ClientContent[]>>
}
```

### Advanced Operations
```typescript
// Search and analytics
async searchClients(searchTerm: string, limit: number = 20): Promise<ApiResponse<ClientSummary[]>>
async getDashboardAnalytics(): Promise<ApiResponse<DashboardData>>
async getRecentActivity(limit: number = 10): Promise<ApiResponse<any[]>>

// Bulk operations
async bulkArchiveClients(clientIds: number[]): Promise<ApiResponse<any>>

// Content operations
async toggleContentFavorite(contentId: number): Promise<ApiResponse<ClientContent>>
async deleteContent(contentId: number): Promise<ApiResponse<void>>
async duplicateContent(contentId: number, newTitle: string): Promise<ApiResponse<ClientContent>>
async updateContent(contentId: number, updateData: any): Promise<ApiResponse<ClientContent>>
async searchAllContent(searchTerm: string, filters: ContentFilters = {}): Promise<ApiResponse<ClientContent[]>>
```

### Validation & Formatting Utilities
```typescript
// Data validation
validateClientData(clientData: CreateClientData | UpdateClientData): { 
  isValid: boolean; 
  errors: Record<string, string> 
}

// Display formatting
formatClientForDisplay(client: Client | ClientSummary): {
  displayName: string;
  displayIndustry: string;
  displayBudget: string;
  displayContact: string;
  displayWebsite: string;
}

// Content type mapping
getContentTypeLabel(contentType: string): string

// Date formatting
formatDate(date: Date | string): string
formatRelativeTime(date: Date | string): string
```

## Export Service (exportService.ts)
### Export Data Models
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

### PDF Export Functions
```typescript
class ExportService {
  // Calendar exports
  exportCalendarPDF(calendarType: string): void
  exportContentPDF(calendarType: string): void

  // Content Creator exports
  exportContentCreatorPDF(contentData: ContentData): void
  async exportContentCreatorWord(contentData: ContentData): Promise<void>

  // Persona exports
  exportPersonasPDF(): void
}
```

### Excel Export Functions
```typescript
// Excel exports using ExcelJS
async exportCalendarExcel(calendarType: string): Promise<void>
async exportContentExcel(calendarType: string): Promise<void>
async exportPersonasExcel(): Promise<void>
```

### Data Source Management
```typescript
// Real-time data integration
private getCurrentCalendarEvents(): CalendarEvent[]
// Gets events from global scope: (window as any).currentCalendarEvents
// Falls back to sample data if no real events

// Sample data generation
private generateSampleCalendarData(calendarType: string): CalendarEvent[]
private generateSamplePersonas(): PersonaData[]
```

### Content Formatting Utilities
```typescript
// PDF content formatting
private formatContentForPDF(content: string): Array<{type: string, text: string}>
// Detects headings, subheadings, bullet points, and paragraphs

// Word document formatting
private formatContentForWord(content: string): string
// Converts to HTML structure with proper styling

// Content type labeling
private getContentTypeLabel(contentType: string): string
// Maps content types to display labels
```

## Key Architecture Features
### Error Handling Strategy
- Comprehensive input validation across all services
- Fallback values and graceful degradation
- Authentication error handling with automatic cleanup
- API error mapping with user-friendly messages

### Data Persistence
- LocalStorage for authentication tokens and user data
- API-based persistence for clients, content, and assets
- Automatic session validation and refresh

### Scalability Features
- Modular service architecture
- Conversation-based AI interactions for context retention
- Client-scoped content organization
- Flexible asset loading system
- Comprehensive export capabilities

### Integration Points
- Claude API integration through conversation history
- File system integration for template/wireframe loading
- Export library integration (jsPDF, ExcelJS, file-saver)
- Authentication middleware across all services

## Data Analysis Service (dataAnalysisService.ts)
### Universal Data Interfaces
```typescript
export interface UniversalRawData {
  [key: string]: string; // Any column name with string values
}

export interface UniversalProcessedData {
  [key: string]: any; // Any column with processed values
  _metadata?: {
    originalRow: number;
    dataType: 'numerical' | 'categorical' | 'date' | 'mixed';
  };
}

export interface DataSchema {
  totalRecords: number;
  columns: ColumnMapping[];
  identifierColumns: string[];
  metricColumns: string[];
  demographicColumns: string[];
  geographicColumns: string[];
  temporalColumns: string[];
  deviceColumns: string[];
  behavioralColumns: string[];
  detectedDataType: 'advertising' | 'sales' | 'marketing' | 'financial' | 'general' | 'unknown';
}
```

### Column Mapping System
```typescript
private columnMappingPatterns = {
  // Core identifiers
  id: ['id', 'campaign_id', 'campaign id', 'campaignid'],
  campaign: ['campaign', 'campaign_name', 'campaign name'],
  platform: ['platform', 'channel', 'source', 'network'],
  
  // Core metrics
  spend: ['spend', 'cost', 'ad_spend', 'budget', 'investment'],
  revenue: ['revenue', 'income', 'sales', 'returns'],
  clicks: ['clicks', 'click', 'visits', 'sessions'],
  impressions: ['impressions', 'views', 'reach', 'exposure'],
  conversions: ['conversions', 'sales', 'purchases', 'leads'],
  
  // Demographics
  age: ['age', 'age_group', 'age_range'],
  gender: ['gender', 'sex', 'male', 'female'],
  
  // Geographic
  country: ['country', 'nation', 'region_country'],
  state: ['state', 'province', 'region'],
  city: ['city', 'metro', 'urban_area']
};
```

### Number Parsing with K/M/B Support
```typescript
private parseFormattedNumber(value: string | number): number {
  // Handles suffix multipliers (K, M, B, T)
  let multiplier = 1;
  if (cleaned.includes('k')) multiplier = 1000;
  else if (cleaned.includes('m')) multiplier = 1000000;
  else if (cleaned.includes('b')) multiplier = 1000000000;
  else if (cleaned.includes('t')) multiplier = 1000000000000;
  
  // Remove formatting chars: [$£€¥₹,%\s]
  // Returns parsed number * multiplier with validation
}
```

### Main Analysis Flow
```typescript
public async analyzeCSV(csvContent: string): Promise<UniversalAnalysisResults> {
  // 1. Parse CSV with Papa Parse
  // 2. Analyze data schema and detect column types
  // 3. Clean and process data universally
  // 4. Calculate comprehensive metrics
  // 5. Perform enhanced group analysis
  // 6. Find top performers across categories
  // 7. Generate intelligent insights
  // 8. Generate actionable suggestions
}
```

## Analysis Utilities (analysisUtils.ts)
### Core Parsing Functions
```typescript
export const parseFormattedNumber = (value: string | number): number | null => {
  // Enhanced number parsing with K/M/B/T suffix support
  // Handles currency symbols, commas, spaces
  // Returns null for invalid inputs
}

export const safeDivide = (numerator: number, denominator: number, fallback: number = 0): number => {
  // Prevents NaN and Infinity results
  // Validates inputs and returns fallback for invalid operations
}

export const validateNumber = (value: any, defaultValue: number = 0): number => {
  // Safe number validation with default fallback
  // Ensures non-negative values for metrics
}
```

### Metric Calculations
```typescript
export const calculateROAS = (revenue: number | string, adSpend: number | string): number
export const calculateCTR = (clicks: number | string, impressions: number | string): number
export const calculateConversionRate = (conversions: number | string, clicks: number | string): number
export const calculateCPC = (adSpend: number | string, clicks: number | string): number
export const calculateProfitMargin = (revenue: number | string, adSpend: number | string): number
```

### Industry Benchmarks
```typescript
export const INDUSTRY_BENCHMARKS = {
  ROAS: { excellent: 6.0, good: 4.0, average: 2.5, poor: 1.5 },
  CTR: { excellent: 3.0, good: 2.0, average: 1.0, poor: 0.5 },
  CONVERSION_RATE: { excellent: 5.0, good: 3.0, average: 2.0, poor: 1.0 },
  CPC: { excellent: 0.5, good: 1.0, average: 2.0, poor: 5.0 }
};
```

### Formatting Functions
```typescript
export const formatCurrency = (value: number | string, currency: string = '$', decimals: number = 2): string
export const formatPercentage = (value: number | string, decimals: number = 2): string
export const formatLargeNumber = (value: number | string, decimals: number = 1): string // K, M, B notation
```

## Header Component (Header.tsx)
### User Management Interfaces
```typescript
interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  profession?: string;
  country?: string;
  emailVerified: boolean;
  created_at: string;
}

interface Client {
  id: number;
  user_id: number;
  company_name: string;
  industry?: string;
  contact_name?: string;
  target_audience?: string;
  budget_range?: string;
  goals?: string[];
  is_active: boolean;
}
```

### Header Props Structure
```typescript
interface HeaderProps {
  title: string;
  subtitle: string;
  theme: string;
  toggleTheme: () => void;
  currentClient: Client | null;
  clients: Client[];
  switchClient: (clientId: number) => void;
  openAddClientModal: () => void;
  openEditClientModal?: (client: Client) => void;
  openDeleteClientModal?: (client: Client) => void;
  user: User | null;
  onLogout: () => void;
  navigateToPage?: (page: string) => void;
}
```

### Key Features
```typescript
// User profile display with initials generation
const getUserInitials = (user: User): string => {
  // Uses firstName/lastName, falls back to email-based generation
}

// Client validation and filtering
const getValidClients = () => {
  return clients.filter(client => 
    client && 
    typeof client.id === 'number' && 
    client.company_name && 
    client.company_name.trim().length > 0
  );
};

// Client management actions
const handleEditClient = () => { openEditClientModal(currentClient) }
const handleDeleteClient = () => { openDeleteClientModal(currentClient) }
```

## Sidebar Component (Sidebar.tsx)
### Navigation Structure
```typescript
interface SidebarProps {
  activePage: string;
  navigateToPage: (pageId: string) => void;
}
```

### Page Organization
```typescript
// Navigation sections with icons and labels
const navSections = {
  General: ['dashboard'],
  Calendar: ['marketing-calendar', 'social-calendar', 'email-calendar'],
  Tools: ['email-generator', 'landing-page-builder', 'persona-builder', 'content-creator', 'ads-analysis'],
  Library: ['saved-assets', 'prompt-library', 'settings']
};
```

## Sidebar Styles (Sidebar.css)
### Key Style Features
```css
.sidebar {
  width: 240px;
  background-color: #161b22; /* Always dark theme */
  border-right: 1px solid #21262d;
}

.nav-item.active {
  background-color: rgba(255, 107, 53, 0.1);
  color: #ff6b35; /* Brand accent color */
  border-left-color: #ff6b35;
}

/* Responsive collapse */
@media (max-width: 768px) {
  .sidebar { width: 60px; }
  .nav-item span:last-child { display: none; }
}
```

## Download Button Component (DownloadButton.tsx)
### Component Interface
```typescript
interface DownloadButtonProps {
  type: 'calendar' | 'content' | 'personas';
  calendarType?: string;
  className?: string;
}
```

### Export Functionality
```typescript
const handleDownload = (format: 'pdf' | 'excel' | 'word') => {
  // Uses exportService for different data types
  if (type === 'calendar' && calendarType) {
    exportService.exportCalendarPDF(calendarType);
    exportService.exportCalendarExcel(calendarType);
  }
  // Similar patterns for 'content' and 'personas'
};
```

### Dropdown Structure
```typescript
// Dropdown options with descriptions
const options = [
  { format: 'pdf', title: 'Export as PDF', description: 'Formatted document with styling' },
  { format: 'excel', title: 'Export as Excel', description: 'Spreadsheet for data analysis' }
];
```

## Multi-Select Component (MultiSelect.tsx)
### Component Interface
```typescript
interface MultiSelectProps {
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}
```

### Key Features
```typescript
// Option toggle logic
const handleOptionToggle = (optionValue: string) => {
  const newValue = value.includes(optionValue)
    ? value.filter(v => v !== optionValue)
    : [...value, optionValue];
  onChange(newValue);
};

// Tag removal
const removeTag = (optionValue: string) => {
  onChange(value.filter(v => v !== optionValue));
};

// Outside click handling
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
}, []);
```

## SaveButton.tsx
### Core Functionality
Purpose: Reusable save button component for saving various content types to asset library with user limit management
#### Key Props:
```typescript
interface SaveButtonProps {
  content: string;
  assetType: 'marketing' | 'social' | 'email' | 'email-built' | 'landing' | 'persona' | 'content' | 'ads';
  defaultTitle?: string;
  metadata?: Record<string, any>;
  onSaveSuccess?: (savedAsset: any) => void;
  onSaveError?: (error: string) => void;
}
```

### Asset Limit Management
- Hard limit: 100 saved assets per user
- User stats tracking: remainingSlots and totalAssets from apiService.getSavedAssetStats()
- Validation: Prevents saving when limit reached or no content available

### Modal System
#### SaveConfirmationModal Component:
- Title validation (required, max 255 characters)
- Character counter (255 limit)
- Loading states with disabled interactions
- Keyboard shortcuts (Enter to save, Escape to close)

### State Management
```typescript
const [isModalOpen, setIsModalOpen] = useState(false);
const [loading, setLoading] = useState(false);
const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
const [userStats, setUserStats] = useState<any>(null);
```

### API Integration
- Save endpoint: apiService.createSavedAsset({ assetType, title, content, metadata })
- Stats endpoint: apiService.getSavedAssetStats()
- Auto-refresh stats after successful save

#### Auto-title Generation
Generates fallback titles from content:
- Extracts first line (50 chars max)
- Formats as "[content]... (type)"
- Falls back to "type - date" format

### Error Handling & UX
- Visual feedback: Success/error states with animations (successPulse, errorShake)
- Auto-clear states: 3-5 second timeouts for status messages
- Comprehensive validation: Content existence, character limits, API responses

## AnalysisReport.tsx
### Core Functionality
Purpose: Comprehensive data analysis report component with multiple visualization types and Q&A conversation support
#### Main Props:
```typescript
interface UniversalAnalysisReportProps {
  results: UniversalAnalysisResults;
  qaConversation?: QAItem[];
  className?: string;
}
```

### Data Structure Support
#### UniversalAnalysisResults Schema:
- dataSchema: Column detection and data type identification
- overall: Total metrics and calculated metrics (ROAS, ROI, margins)
- groupedAnalysis: Performance data grouped by categories
- topPerformers: Best performing items by category
- insights: AI-generated insights with impact levels
- suggestions: Actionable recommendations

### CSS-Based Chart System
#### Three chart types implemented:
1. CSSBarChart: Vertical bars with hover tooltips
2. CSSPieChart: SVG-based pie chart with legend
3. CSSHorizontalBarChart: Horizontal bars for rankings

### Chart validation logic:
- validateChartData(): Filters valid objects
- safeNumber(): Handles formatted strings (2.5M, 1.2K, 45.6%)
- safePercentage(): Converts decimals to percentages

### Data Formatting System
#### Metric formatting functions:
- formatMetricValue(): Currency, percentages, large numbers based on key patterns
- formatCalculatedMetricValue(): ROAS (2.5x), margins (25%), currency
- Icon mapping for different metric types (spend→💰, clicks→👆)

### Q&A Conversation Support
#### QAItem Structure:
```typescript
interface QAItem {
  question: string;
  answer: string;
  timestamp: string;
}
```

- Displays conversation history with timestamps
- Styled question/answer sections with distinct colors
- HTML entity escaping for security

### Performance Tables
#### UniversalPerformanceTable Component:
- Dynamic column generation from schema.metricColumns
- Top 10 items display with record counts
- Color-coded metrics (positive/negative performance)

### Insights & Recommendations
#### UniversalInsightCard:
- Impact levels: high/medium/low with color coding
- Insight types: success/warning/danger/info
- Structured title, description, recommendation format

### HTML Export Capability
#### generateUniversalAnalysisHTML():
- Complete standalone HTML report generation
- Embedded CSS styles for offline viewing
- Client information and Q&A conversation inclusion
- All chart types rendered as HTML/CSS/SVG

### Responsive Design
- Grid-based layout with minmax(280px, 1fr)
- Mobile-first approach with @media (max-width: 768px)
- Chart adaptations for small screens

### Error Handling
- Graceful degradation for missing data
- "No data available" fallbacks
- Safe number parsing with default values
- Chart validation before rendering

### Key Helper Functions
- getCategoryIcon(): Maps categories to icons
- getPerformanceClass(): Determines excellent/good/poor ratings
- formatLargeNumber(): Human-readable number formatting
- getMetricCellClass(): Table cell styling based on values

## AddClientModal.tsx
Purpose: Modal component for adding new client records with comprehensive form validation and API integration.
### Key Data Structure
```typescript
interface FormData {
  companyName: string;
  industry: string;
  website: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  contactRole: string;
  targetAudience: string;
  budget: string;
  goals: string[];  // Array of goal values
  description: string;
  brandGuidelines: string;
  notes: string;
}

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clientData: any) => void;  // Receives form data for API call
}
```

### Key Features
- Form Validation: Email validation, URL validation (must start with http), required company name
- Goals System: Multi-select checkboxes with predefined options (brand-awareness, lead-generation, sales, engagement, retention, market-expansion, customer-acquisition, thought-leadership)
- Industry Options: Dropdown with 12+ industry types (technology, healthcare, finance, etc.)
- Budget Ranges: Predefined ranges from $0-5k to $100k+
- Form Sections: Company Information, Primary Contact, Marketing Details
- State Management: Loading states, error handling, form reset on close/success

### API Integration Pattern
```typescript
const handleSave = async () => {
  if (!validateForm()) return;
  setLoading(true);
  try {
    await onSave(formData);  // Parent handles API call
    resetForm();
    onClose();
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

## DeleteClientModal.tsx
Purpose: Confirmation modal for client deletion with statistics display and data preservation warning.
### Key Data Structure
```typescript
interface Client {
  id: number;
  user_id: number;
  company_name: string;
  industry?: string;
  website?: string;
  contact_name?: string;
  contact_email?: string;
  // ... other client fields
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

interface ClientStats {
  content_count: number;
  email_count: number;
  landing_page_count: number;
  persona_count: number;
  calendar_count: number;
  last_activity?: Date;
}
```

### Key Features
- Stats Loading: Fetches client statistics from /api/clients/${client.id}/stats endpoint
- Confirmation System: Requires typing exact company name to confirm deletion
- Data Preservation Warning: Shows content will be preserved and moved to "Unassigned"
- Statistics Display: Shows content counts, last activity date
- Industry/Budget Label Mapping: Converts codes to human-readable labels

### API Endpoints
- GET /api/clients/${client.id}/stats - Fetch client statistics
- DELETE /api/clients/${client.id} - Delete client

### Confirmation Logic
```typescript
const handleDelete = async () => {
  if (confirmationText !== client.company_name) {
    setError('Please type the company name exactly to confirm deletion');
    return;
  }
  // Proceed with deletion
};
```

## EditClientModal.tsx
Purpose: Modal for editing existing client information with pre-populated form data.
### Key Features
- Form Pre-population: Uses useEffect to populate form with existing client data
- Same Validation: Identical validation rules as AddClientModal
- Update API: PUT request to /api/clients/${client.id}
- Goals Handling: Preserves existing goals array, allows modifications
- Field Mapping: Maps client database fields to form fields

### Form Population Pattern
```typescript
useEffect(() => {
  if (client) {
    setFormData({
      companyName: client.company_name || '',
      industry: client.industry || '',
      // ... map all fields from client object
      goals: client.goals || [],
    });
    setError(null);
  }
}, [client]);
```

### Update Request Structure
```typescript
const updateData = {
  company_name: formData.companyName.trim(),
  industry: formData.industry || undefined,
  // ... only include fields that have values
  goals: formData.goals.length > 0 ? formData.goals : undefined,
};
```

## EditModal.tsx
Purpose: Generic modal for editing calendar content with dynamic options based on calendar type.
### Key Data Structure
```typescript
interface FormData {
  date: string;
  time: string;
  title: string;
  content: string;
  contentType: string;
  platform: string;
  campaignType: string;
  status: string;
  audience: string;
  tags: string;
}
```

### Calendar Type Configurations
```typescript
const calendarOptions = {
  'marketing-calendar': {
    title: 'Edit Marketing Content',
    contentTypes: ['blog', 'infographic', 'social-post', 'email', 'whitepaper', 'video-script', 'press-release', 'case-study'],
    platforms: ['website', 'facebook', 'instagram', 'twitter', 'linkedin', 'email'],
    campaignTypes: ['brand-awareness', 'lead-generation', 'product-launch', 'promotional']
  },
  'social-calendar': {
    contentTypes: ['post', 'story', 'reel', 'carousel'],
    platforms: ['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok'],
    campaignTypes: ['engagement', 'viral', 'influencer', 'community']
  },
  'email-calendar': {
    contentTypes: ['newsletter', 'promotional', 'welcome', 'abandoned-cart'],
    platforms: ['mailchimp', 'hubspot', 'sendgrid', 'klaviyo'],
    campaignTypes: ['broadcast', 'automated', 'drip', 'trigger']
  }
};
```

### Dynamic Content Rendering
- Form sections: Schedule (date/time), Content Details, Campaign Settings, Additional Options
- Status options: draft, scheduled, published, paused
- Platform and campaign type options change based on calendarType prop

## EditPersonaModal.tsx
Purpose: Modal for editing user persona information with comprehensive behavioral and demographic data.
### Key Data Structure
```typescript
interface FormData {
  name: string;
  role: string;
  age: string;
  location: string;
  income: string;
  education: string;
  goals: string;
  painPoints: string;
  techComfort: string;
  decisionMaking: string;
  communication: string;
  workStyle: string;
  solutions: string;
  characteristics: string;
}
```

### Form Sections
- Basic Information: Name, role, age, location
- Demographics: Income level, education
- Goals & Pain Points: Text areas for detailed descriptions
- Behavioral Traits: Tech comfort, decision-making style, communication preferences, work style
- Solutions & Characteristics: Problem solutions and unique traits

### Pre-populated Data Example
- Includes realistic persona data for "John Davis, Marketing Manager"
- Multi-line text areas with example content for goals, pain points, solutions

## GuidelinesModal.tsx
Purpose: Comprehensive reference modal providing AI prompt guidelines for email and landing page generation.
### Key Features
- Tab Navigation: 4 tabs (Design & Branding, Content Structure, Tracking & Analytics, Example Prompts)
- Copy to Clipboard: Interactive copying of prompt examples and guidelines
- Type-Specific Content: Different guidelines for 'email' vs 'landing-page' types
- Complete Example Prompts: Ready-to-use prompt templates

### Tab Structure
```typescript
const tabs = [
  { id: 'design', label: 'Design & Branding', icon: Palette },
  { id: 'content', label: 'Content Structure', icon: Layout },
  { id: 'tracking', label: 'Tracking & Analytics', icon: Target },
  { id: 'examples', label: 'Example Prompts', icon: Code }
];
```

### Content Categories
- Design Tab: Logo/Images, Color Palette, Typography, Email-specific design constraints, Responsive design
- Content Tab: Email components (subject, preheader, header, CTA, footer), Landing page sections (hero, features, testimonials, pricing)
- Tracking Tab: Google Analytics, Social media pixels, Marketing automation, Email tracking, Conversion tracking
- Examples Tab: Complete prompt templates with all sections filled out

### Copy Functionality
```typescript
const copyToClipboard = async (text: string, sectionId: string) => {
  await navigator.clipboard.writeText(text);
  setCopiedSections(prev => new Set(prev).add(sectionId));
  // Auto-clear after 2 seconds
};
```

## PreviewModal.tsx
Purpose: Universal preview modal for displaying templates, wireframes, and saved assets with different rendering modes.
### Key Data Types
```typescript
interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;  // Can be template, wireframe, or saved asset
  onUse?: (data: any) => void;
}

// Asset type mappings
const ASSET_TYPE_LABELS = {
  'marketing': 'Marketing',
  'social': 'Social Media',
  'email': 'Email',
  'email-built': 'Emails Built',
  'landing': 'Landing Pages',
  'persona': 'Personas',
  'content': 'Content',
  'ads': 'Ads'
};
```

### Content Loading Logic
1. Saved Assets: Direct content display from database
2. Templates/Wireframes: Load from asset loader service
3. Email Content: Wrapped in centered 600px container with background
4. Landing Page Content: Full-width iframe rendering

### Asset Service Integration
```typescript
import { 
  loadEmailTemplateHTML, 
  loadEmailWireframeHTML, 
  loadLandingPageTemplateHTML, 
  loadLandingPageWireframeHTML 
} from '../../services/assetLoader';
```

### Rendering Modes
- HTML Content: iframe with proper DOCTYPE and styling
- Text Content: Pre-formatted text with syntax highlighting
- Email Wrapper: Max-width 600px, centered, with email background
- Landing Page Wrapper: Full-width iframe

### Action Buttons
- Saved Assets: Close, Download, Reuse in Tool (for email/landing), Load in Calendar (for marketing/social/email)
- Templates/Wireframes: Close, Use Template/Wireframe

### Download Functionality
```typescript
const handleDownloadAsset = (asset: any) => {
  const fileExtension = asset.asset_type === 'landing' || asset.asset_type === 'email-built' ? 'html' : 'txt';
  const fileName = `${asset.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${fileExtension}`;
  // Create blob and download
};
```

### Common Patterns Across All Modals
#### Modal Structure
- Overlay with click-outside-to-close
- Header with title and close button
- Scrollable content area
- Action buttons footer
- Loading states and error handling

#### State Management Pattern
```typescript
const [formData, setFormData] = useState({...});
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

#### API Authentication
All API calls include:
```typescript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('authToken')}`
}
```

#### CSS Integration
Most modals use inline styles combined with CSS classes, with responsive design considerations and CSS custom properties for theming.

## SocialCalendar.tsx
### Core Architecture
- Conversation Memory System: Implements token-based session management with 50k token limit per session
- Calendar Event Management: Stores events in calendarEvents state with date-based filtering and display
- Client Context Integration: Uses currentClient prop for personalized content generation

### Key State Management
```typescript
interface CalendarEvent {
  id: string;
  date: string;
  time: string;
  platform: string;
  contentType: string;
  title: string;
  content: string;
  hashtags: string[];
  engagementStrategy: string;
}

const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
const [tokenCount, setTokenCount] = useState(0);
const [sessionActive, setSessionActive] = useState(true);
const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
```

### API Integration Pattern
```typescript
const callClaude = async (conversationHistory: ConversationMessage[]) => {
  const generationOptions = {
    client_id: currentClient?.id,
    content_type: 'social_calendar' as const,
    title: generateCalendarTitle(),
    metadata: {
      platforms: selectedPlatforms,
      contentTypes: selectedContentTypes,
      frequencies: selectedFrequencies,
      client_company: currentClient?.company_name,
      client_industry: currentClient?.industry,
      target_audience: currentClient?.target_audience
    }
  };
  return await apiService.generateContent(conversationHistory, generationOptions);
};
```

### Calendar Event Parsing
- Handles JSON response parsing with fallback to unstructured text parsing
- Creates platform-optimized social media posts with hashtags and engagement strategies
- Implements date string generation without timezone issues

### Session Management Features
- Token estimation (1 token ≈ 4 characters)
- Session reset functionality with state cleanup
- Warning/critical thresholds at 80%/95% token usage

## Dashboard.tsx
### Core Architecture
- Real-time Data Integration: Loads dashboard analytics and client data via clientService
- Multi-widget Layout: Displays stats cards, analytics charts, activity feeds, and calendar views
- Client Context Awareness: Adapts content based on selected client

### Key Data Structures
```typescript
interface DashboardData {
  content_overview: {
    total_content: number;
    content_this_month: number;
    email_count: number;
    landing_page_count: number;
    persona_count: number;
    ads_count: number;
  };
  content_breakdown: Record<string, number>;
  client_overview: {
    active_clients: number;
    new_clients_this_month: number;
  };
  recent_personas: Array<{id: string, name: string, role: string, avatar: string}>;
  recent_activities: Array<{title: string, description: string, time: string, icon: string}>;
  upcoming_content: Array<{date: string, title: string, description: string, platform: string}>;
  calendar_events: Array<{date: string}>;
}
```

### Widget Management System
- Paginated content display with navigation controls for personas, activities, and upcoming content
- Interactive content analytics chart with hover tooltips
- Mini-calendar with event indicators

### Data Loading Pattern
```typescript
useEffect(() => {
  const loadDashboardData = async () => {
    const [analyticsData, clientsData] = await Promise.all([
      clientService.getDashboardAnalytics(),
      clientService.getClients()
    ]);
    setDashboardData(analyticsData);
    setClients(clientsData);
  };
  loadDashboardData();
}, [currentClient]);
```

### Navigation Integration
- Quick action buttons for all tools with navigation callbacks
- Client context banner display with industry information

## EmailCalendar.tsx
### Core Architecture
- Email Campaign Management: Specialized for email marketing with campaign types and frequencies
- Template-based Generation: Focuses on subject lines, content themes, and scheduling optimization
- Deliverability Optimization: Includes best practices and engagement metrics

### Key Configuration Options
```typescript
const emailTypes = [
  'newsletter', 'promotional', 'welcome', 'abandoned-cart', 
  'product-launch', 'educational', 're-engagement', 'survey'
];

const campaignTypes = [
  'broadcast', 'automated', 'drip', 'trigger', 'ab-test', 'transactional'
];

const frequencies = [
  'daily', 'weekly', 'bi-weekly', 'monthly', 'quarterly', 'triggered', 'one-time'
];
```

### Email-Specific API Call
```typescript
const callClaude = async (conversationHistory: ConversationMessage[]) => {
  return await fetch('http://localhost:3001/api/generate', {
    body: JSON.stringify({ 
      conversationHistory,
      client_id: currentClient?.id,
      content_type: 'email_calendar',
      title: generateCalendarTitle(),
      metadata: {
        email_types: selectedEmailTypes,
        campaign_types: selectedCampaignTypes,
        frequencies: selectedFrequencies,
        tool: 'email-calendar'
      }
    })
  });
};
```

### Calendar Event Structure
```typescript
interface EmailEvent {
  id: string;
  date: string;
  time: string;
  title: string; // Subject line
  content: string; // Email content description
  emailType: string;
  campaignType: string;
}
```

### Calendar Population System
- Event listener for loading saved calendar content from assets
- Date string generation with proper formatting (YYYY-MM-DD)
- Calendar event display with orange color coding for email campaigns

## MarketingCalendar.tsx
### Core Architecture
- Multi-platform Marketing: Supports various content types across different platforms
- Strategic Content Planning: Timeline-based content planning with performance metrics
- Cross-channel Integration: Coordinates content across website, social, and email channels

### Content Type Configuration
```typescript
const contentTypes = [
  'blog', 'infographic', 'social-post', 'email', 
  'whitepaper', 'video-script', 'press-release', 'case-study'
];

const platforms = [
  'facebook', 'instagram', 'twitter', 'linkedin', 
  'reddit', 'tiktok', 'youtube', 'website', 'email'
];
```

### Marketing-Specific API Integration
```typescript
const callClaude = async (conversationHistory: ConversationMessage[]) => {
  return await fetch('http://localhost:3001/api/generate', {
    body: JSON.stringify({ 
      conversationHistory,
      client_id: currentClient?.id,
      content_type: 'marketing_calendar',
      title: generateCalendarTitle(),
      metadata: {
        content_types: selectedContentTypes,
        platforms: selectedPlatforms,
        frequencies: selectedFrequencies,
        tool: 'marketing-calendar'
      }
    })
  });
};
```

### Marketing Event Structure
```typescript
interface MarketingEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  content: string;
  contentType: string; // blog, infographic, etc.
  platform: string; // facebook, website, etc.
}
```

## Shared Patterns Across All Tools
1. Session Management Pattern
All calendar tools implement identical token-based session management:
- 50k token limit per session
- Token estimation at 1:4 character ratio
- Warning at 80%, critical at 95%
- Session reset with complete state cleanup

2. Client Context Integration
```typescript
interface Client {
  id: number;
  company_name: string;
  industry?: string;
  target_audience?: string;
  brand_guidelines?: string;
}

// Used in all tools for personalized content generation
if (currentClient) {
  fullPrompt += `Client Context:
    Company: ${currentClient.company_name}
    Industry: ${currentClient.industry}
    Target Audience: ${currentClient.target_audience}`;
}
```

3. Calendar Event Management
- Consistent date string format: YYYY-MM-DD
- Time storage in HH:MM format
- Event filtering by date for calendar display
- Modal integration for event editing

4. Save/Load System
- SaveButton component for asset storage with metadata
- Event listener system for loading saved calendars
- JSON-based content serialization

5. Multi-Select Configuration
All tools use MultiSelect components for:
- Content types
- Platforms/channels
- Frequencies/schedules

6. Error Handling Pattern
- Try-catch blocks around API calls
- JSON parsing fallbacks for AI responses
- User-friendly error messages in chat interface

7. Calendar UI Components
- Month navigation with ChevronLeft/Right
- Day grid generation with proper month boundaries
- Event indicators with platform-specific color coding
- Click handlers for day selection and event creation

## Auth.tsx - Authentication System
### Core Authentication Modes
- AuthMode Types: 'login' | 'signup' | 'verification' | 'forgot-password' | 'reset-password'
- Multi-step authentication flow with email verification and password recovery

### Key State Management
```typescript
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  profession: string;
  country: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  profession?: string;
  country?: string;
  general?: string;
}
```

### API Integration Points
- Backend Base URL: http://localhost:3001/api/auth/
- Endpoints Used:
   - POST /login - User authentication
   - POST /signup - Account creation
   - POST /verify-email - Email verification with 6-digit code
   - POST /forgot-password - Password reset request
   - POST /reset-password - Password reset completion
   - POST /send-verification - Resend verification code

### Authentication Flow Logic
```typescript
const handleLogin = async () => {
  const response = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: formData.email, password: formData.password })
  });
  
  if (response.ok) {
    localStorage.setItem('authToken', data.data.token);
    onAuthSuccess(data.data.user, data.data.token);
  }
};
```

### Form Validation System
- Email validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
- Password requirements: Minimum 8 characters
- Profile validation: Optional fields with 2+ character minimum
- Real-time error clearing on input change

### Token Storage
- localStorage key: 'authToken'
- Bearer token format for API requests

## Settings.tsx - User Profile & Configuration Management
### User Profile Structure
```typescript
interface UserProfile {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  profession?: string;
  country?: string;
  emailVerified: boolean;
  created_at: string;
}

interface UserProfileSummary {
  displayName: string;
  initials: string;
  profileCompletion: number;
  emailVerified: boolean;
}
```

### API Key Management System
```typescript
const apiKey = {
  value: '',
  masked: '',
  isValid: null,
  lastValidated: null
}
```

### Key API Endpoints
- Profile Management: PUT /api/auth/profile - Update user profile
- Password Change: POST /api/auth/change-password
- Email Verification: POST /api/auth/send-verification
- User Data Retrieval: GET /api/auth/me
- API Key Validation: POST /api/validate/anthropic

### Password Change Logic
```typescript
const handlePasswordChange = async () => {
  const response = await fetch('http://localhost:3001/api/auth/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
      confirmNewPassword: passwordData.confirmNewPassword
    })
  });
};
```

### API Key Storage Format
```typescript
// localStorage format for API keys
localStorage.setItem('apiKeys', JSON.stringify({
  anthropic: updatedApiKey.value
}));
```

### Profile Validation Rules
- Name fields: 2+ characters minimum
- Email: Read-only, change requires support
- Country selection: Predefined list of 18 countries
- Professional info: Optional but validated if provided

## SavedAssets.tsx - Asset Management System
### Asset Data Structure
```typescript
interface SavedAsset {
  id: number;
  user_id: number;
  asset_type: AssetType;
  title: string;
  content: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

type AssetType = 
  | 'marketing' 
  | 'social' 
  | 'email' 
  | 'email-built' 
  | 'landing' 
  | 'persona' 
  | 'content' 
  | 'ads';
```

### Asset Statistics Tracking
```typescript
interface SavedAssetStats {
  totalAssets: number;
  assetsByType: Record<AssetType, number>;
  remainingSlots: number;
}
```

### Filter System Configuration
```typescript
const filterTabs: FilterTab[] = [
  { id: 'all', label: 'All Assets', icon: Package, assetType: 'all' },
  { id: 'marketing', label: 'Marketing', icon: BarChart3, assetType: 'marketing' },
  { id: 'social', label: 'Social Media', icon: Share2, assetType: 'social' },
  { id: 'email', label: 'Email', icon: Mail, assetType: 'email' },
  // ... more filter tabs
];
```

### API Service Integration
```typescript
// Key API calls through apiService
const loadAssets = async () => {
  const response = await apiService.getSavedAssets({
    type: activeFilter === 'all' ? undefined : activeFilter,
    limit: 50
  });
};

const handleSearch = async () => {
  const response = await apiService.searchSavedAssets({
    searchTerm: searchTerm.trim(),
    assetType: activeFilter === 'all' ? undefined : activeFilter
  });
};
```

### Asset Actions System
- Preview: Calendar assets navigate to respective pages, modal assets open in preview
- Reuse: Only for ['email', 'email-built', 'landing'] asset types
- Download: Creates HTML blob for download
- Delete: Confirmation dialog with stats update

### Navigation Integration
```typescript
const handlePreviewAsset = (asset: SavedAsset) => {
  // Calendar tools navigation
  if (['marketing', 'social', 'email'].includes(asset.asset_type)) {
    const pageMapping = {
      'marketing': 'marketing-calendar',
      'social': 'social-calendar', 
      'email': 'email-calendar'
    };
    navigateToPage(pageMapping[asset.asset_type]);
    // Event dispatch for content population
    window.dispatchEvent(new CustomEvent('populateCalendarContent', {
      detail: { asset }
    }));
  }
};
```

## ContentCreator.tsx - AI Content Generation Tool
### Content Types Configuration
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

### Conversation Memory System
```typescript
interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Token management
const TOKEN_LIMIT = 50000;
const TOKEN_WARNING_THRESHOLD = 0.8;
const TOKEN_CRITICAL_THRESHOLD = 0.95;

const estimateTokens = (text: string): number => {
  return Math.ceil(text.length / 4);
};
```

### Client Context Integration
```typescript
interface Client {
  id: number;
  user_id: number;
  company_name: string;
  industry?: string;
  website?: string;
  target_audience?: string;
  brand_guidelines?: string;
  // ... other client fields
}
```

### AI API Integration
```typescript
const callClaude = async (conversationHistory: ConversationMessage[], clientContext?: { 
  client_id: number; 
  content_type: string; 
  title: string 
}) => {
  const apiKeys = JSON.parse(localStorage.getItem('apiKeys') || '{}');
  
  const requestBody: any = { conversationHistory };
  if (clientContext) {
    requestBody.client_id = clientContext.client_id;
    requestBody.content_type = clientContext.content_type;
    requestBody.title = clientContext.title;
    requestBody.metadata = {
      tool: 'content-creator',
      content_type: clientContext.content_type,
      preview_mode: previewMode,
      generated_at: new Date().toISOString()
    };
  }
  
  const response = await fetch('http://localhost:3001/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Keys': JSON.stringify(apiKeys),
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify(requestBody)
  });
};
```

### Client Content Saving
```typescript
const saveContentToClient = async (content: string, title: string) => {
  if (!currentClient) return;
  
  await clientService.saveContentToClient(currentClient.id, {
    content_type: selectedContentType,
    title: title,
    content: content,
    metadata: {
      tool: 'content-creator',
      preview_mode: previewMode,
      generated_at: new Date().toISOString()
    }
  });
};
```

### Content Processing
```typescript
const parseContentResponse = (aiResponse: string) => {
  let cleaned = aiResponse.trim();
  
  // Remove markdown code blocks
  cleaned = cleaned.replace(/^```\w*\s*/i, '');
  cleaned = cleaned.replace(/\s*```\s*$/i, '');
  
  return { content: cleaned };
};
```

### Session Management
- Session State: Active/inactive based on token limit
- Session Reset: Clears conversation history and resets counters
- Token Tracking: Real-time calculation with visual indicators
- Preview Modes: Desktop/Mobile responsive preview

### Export Functionality
- Copy to Clipboard: Direct text copy
- PDF/Word Export: Planned integration with exportService
- Save Asset: Integration with SaveButton component

## AdsAnalysis.tsx - Universal Data Analysis Tool
### Core Architecture
```typescript
interface Client {
  id: number;
  user_id: number;
  company_name: string;
  industry?: string;
  // ... additional client fields
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface QAItem {
  question: string;
  answer: string;
  timestamp: string;
}

interface DataValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  rowCount: number;
  columnCount: number;
  hasNumericData: boolean;
  detectedFormat: 'csv' | 'excel' | 'unknown';
}
```

### Key State Management
```typescript
// File and data states
const [uploadedData, setUploadedData] = useState('');
const [fileName, setFileName] = useState('');
const [dataLoaded, setDataLoaded] = useState(false);

// Analysis states
const [analysisResults, setAnalysisResults] = useState<UniversalAnalysisResults | null>(null);
const [qaConversation, setQaConversation] = useState<QAItem[]>([]);

// Session management
const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
const [tokenCount, setTokenCount] = useState(0);
const [sessionActive, setSessionActive] = useState(true);

// Token limits
const TOKEN_LIMIT = 50000;
const TOKEN_WARNING_THRESHOLD = 0.8;
const TOKEN_CRITICAL_THRESHOLD = 0.95;
```

### Critical Functions
#### Data Validation System:
```typescript
const validateCSVData = (csvData: string): DataValidationResult => {
  // Validates CSV structure, column consistency, numeric data detection
  // Returns validation results with errors/warnings
}
```

#### Universal Analysis Engine:
```typescript
const performSmartAnalysis = async (csvData: string): Promise<UniversalAnalysisResults> => {
  // Validates data first
  // Calls universalDataAnalysisService.analyzeCSV(csvData)
  // Handles comprehensive error checking
}
```

#### File Processing (Excel/CSV):
```typescript
const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  // Supports .csv, .xlsx, .xls formats
  // Uses ExcelJS for Excel conversion
  // Validates converted data before processing
}
```

#### AI Q&A System:
```typescript
const handleTextAnalysis = async () => {
  // Manages Q&A conversations on top of analysis
  // Uses generateUniversalAnalysisHTML for context
  // Calls apiService.generateAnalysisInsight()
}
```

### Service Dependencies
- universalDataAnalysisService.analyzeCSV() - Core analysis engine
- apiService.generateAnalysisInsight() - AI Q&A functionality
- generateUniversalAnalysisHTML() - HTML report generation
- ExcelJS - Excel file processing

### Key Features
- Universal data type detection (advertising, sales, marketing, financial)
- Session token management with limits
- Q&A conversation history on analysis results
- Client context integration
- Comprehensive error handling and validation
- Export capabilities (HTML, download, copy)

## EmailGenerator.tsx - AI Email Creation Tool
### Core Architecture
```typescript
interface EmailGeneratorProps {
  openPreviewModal: (data: any) => void;
  openGuidelinesModal: (type: 'email' | 'landing-page') => void;
  currentClient: Client | null;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}
```

### State Management
```typescript
// UI and navigation
const [activeTab, setActiveTab] = useState('create-email'); // 'create-email' | 'templates' | 'wireframes'
const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop' | 'mobile'

// Conversation system
const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
const [tokenCount, setTokenCount] = useState(0);
const [sessionActive, setSessionActive] = useState(true);

// Template system
const [templateMode, setTemplateMode] = useState(false);
const [currentTemplateHTML, setCurrentTemplateHTML] = useState('');
const [currentTemplateInfo, setCurrentTemplateInfo] = useState<any>(null);

// Content generation
const [emailPreview, setEmailPreview] = useState('');
const [generatedTitle, setGeneratedTitle] = useState('');

// Asset management
const [templates, setTemplates] = useState([]);
const [wireframes, setWireframes] = useState([]);
```

### Critical Functions
#### AI Content Generation:
```typescript
const callClaudeWithClientContext = async (conversationHistory: ConversationMessage[]) => {
  // Enhanced API call with client context
  // Uses apiService.generateContent with metadata
  // Handles authentication and client validation
}

const sendMessage = async () => {
  // Manages two modes: TEMPLATE MODE vs SCRATCH MODE
  // Builds context-aware prompts with client information
  // Includes email-specific requirements and constraints
}
```

#### Template/Wireframe System:
```typescript
const useTemplate = async (template: any) => {
  // Loads actual template HTML via loadEmailTemplateHTML()
  // Enables template mode for editing
  // Handles file not found scenarios
}

const useWireframe = async (wireframe: any) => {
  // Similar to template loading but for wireframes
  // Uses loadEmailWireframeHTML()
}
```

#### Asset Loading:
```typescript
useEffect(() => {
  const loadAssets = async () => {
    const [templatesData, wireframesData] = await Promise.all([
      loadEmailTemplates(),
      loadEmailWireframes()
    ]);
    // Populates templates and wireframes state
  };
}, []);
```

#### Response Processing:
```typescript
const parseEmailResponse = (aiResponse: string) => {
  // Cleans markdown code blocks
  // Extracts content from full HTML documents
  // Removes unwanted HTML tags and styles
}
```

### Service Dependencies
- apiService.generateContent() - AI content generation
- loadEmailTemplates(), loadEmailWireframes() - Asset loading
- loadEmailTemplateHTML(), loadEmailWireframeHTML() - Template content loading

### Key Features
- Dual mode operation (scratch creation vs template editing)
- Client context integration in AI prompts
- Multi-tab interface (create, templates, wireframes)
- Desktop/mobile preview modes
- Template and wireframe asset management
- Session token management
- Export and save functionality

## PersonaBuilder.tsx - AI Persona Generation Tool
### Core Architecture
```typescript
interface PersonaBuilderProps {
  openEditPersonaModal: () => void;
  currentClient: any;
}
```

### State Management
```typescript
// Conversation system (same pattern as other tools)
const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
const [tokenCount, setTokenCount] = useState(0);
const [sessionActive, setSessionActive] = useState(true);

// Persona generation
const [generatedPersona, setGeneratedPersona] = useState<any>(null);
const [messages, setMessages] = useState([/* initial AI greeting */]);

// Token configuration (consistent across tools)
const TOKEN_LIMIT = 50000;
const TOKEN_WARNING_THRESHOLD = 0.8;
const TOKEN_CRITICAL_THRESHOLD = 0.95;
```

### Critical Functions
#### AI Persona Generation:
```typescript
const sendMessage = async () => {
  // Builds comprehensive persona prompt with client context
  // Includes structured format requirements
  // Uses enhanced API call: callClaude(newConversationHistory)
}

const callClaude = async (conversationHistory: ConversationMessage[]) => {
  // Enhanced API call with client context and metadata
  // Uses apiService.generateContent with persona-specific parameters
}
```

#### Persona Parsing System:
```typescript
const parsePersonaResponse = (aiResponse: string) => {
  // First attempts JSON parsing for backward compatibility
  // Falls back to structured markdown parsing
}

const parseStructuredMarkdown = (markdownText: string) => {
  // Extracts demographic fields using regex patterns
  // Processes sections: GOALS, PAIN POINTS, BEHAVIORAL TRAITS
  // Handles buying process information
  // Generates avatar initials from name
}
```

#### Content Processing Functions:
```typescript
const extractDemographicField = (fieldName: string) => {
  // Regex-based field extraction from markdown
}

const extractSectionItems = (sectionName: string) => {
  // Extracts bullet point lists from markdown sections
}

const generatePersonaTitle = (persona: any): string => {
  // Creates meaningful titles for persona content
}
```

### Expected Persona Data Structure
```typescript
const persona = {
  name: string,
  role: string,
  company: string,
  avatar: string, // Generated initials
  age: string,
  location: string,
  income: string,
  education: string,
  goals: string[],
  painPoints: string[],
  solutions: string[],
  characteristics: string[],
  techComfort: string,
  decisionMaking: string,
  communication: string,
  workStyle: string,
  buyingProcess: {
    decisionTimeline: string,
    budgetRange: string,
    keyInfluencers: string,
    evaluationCriteria: string,
    preferredVendors: string
  }
}
```

### Service Dependencies
- apiService.generateContent() - AI persona generation
- clientService.saveContentToClient() - Client data persistence

## Shared Patterns Across All Tools
#### 1. Session Management Pattern
```typescript
// Consistent token management across all tools
const TOKEN_LIMIT = 50000;
const TOKEN_WARNING_THRESHOLD = 0.8;
const TOKEN_CRITICAL_THRESHOLD = 0.95;

const estimateTokens = (text: string): number => Math.ceil(text.length / 4);
const canContinueConversation = (): boolean => sessionActive && tokenCount < TOKEN_LIMIT;
const getTokenStatus = () => { /* returns color and status based on thresholds */ }
```

#### 2. Client Context Integration
```typescript
// All tools check for currentClient and integrate context
if (currentClient) {
  // Add client-specific context to prompts
  // Include company name, industry, brand guidelines
  // Show client selection status in UI
}
```

#### 3. Conversation History Pattern
```typescript
// Consistent conversation management
const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);

// Update pattern:
const newConversationHistory: ConversationMessage[] = [
  ...conversationHistory,
  { role: 'user', content: userPrompt },
  { role: 'assistant', content: aiResponse }
];
setConversationHistory(newConversationHistory);
```

#### 4. Save Integration
```typescript
// All tools use SaveButton component with similar metadata structure
<SaveButton
  content={generatedContent}
  assetType="tool-specific-type"
  defaultTitle={generatedTitle}
  metadata={{ 
    tool: 'tool-name',
    clientId: currentClient?.id,
    clientName: currentClient?.company_name,
    // tool-specific metadata
  }}
  onSaveSuccess={(savedAsset) => {
    // Update UI with success message
  }}
/>
```

#### 5. Error Handling Pattern
```typescript
try {
  // Main operation
} catch (error: any) {
  console.error('Operation error:', error);
  setMessages(prev => [
    ...prev.slice(0, -1), // Remove loading message
    { type: 'ai', content: `⚠ Error: ${error.message}` }
  ]);
} finally {
  setLoading(false);
}
```

#### Key Service Dependencies for All Tools
1. apiService.generateContent() - Central AI content generation
2. apiService.generateAnalysisInsight() - Analysis-specific AI calls
3. universalDataAnalysisService - Data analysis engine
4. clientService - Client data management
5. Asset loading services - Template/wireframe management
6. SaveButton component - Content persistence
7. ExcelJS - File processing capabilities

#### Architectural Principles
1. Consistent State Management: All tools follow the same conversation/session pattern
2. Client Context Integration: Every tool considers current client context
3. Token Management: Unified session limits and monitoring
4. Error Handling: Comprehensive error states and user feedback
5. Save Integration: Standardized content saving with metadata
6. Modular Design: Each tool is self-contained but follows shared patterns

## LandingPageBuilder.tsx - AI Landing Page Builder
A React component that provides an AI-powered landing page builder with multi-platform support, template/wireframe integration, and client context awareness.
### Key Interfaces & Types
```typescript
interface Client {
  id: number;
  user_id: number;
  company_name: string;
  industry?: string;
  website?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_role?: string;
  target_audience?: string;
  budget_range?: string;
  goals?: string[];
  description?: string;
  brand_guidelines?: string;
  notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface MultiFileContent {
  [filename: string]: string;
}
```

### Core State Management
```typescript
// Platform Selection
const [selectedPlatform, setSelectedPlatform] = useState('static');
const platforms = [
  { id: 'static', name: 'Static HTML', description: 'Pure HTML, CSS, JavaScript' },
  { id: 'wordpress', name: 'WordPress', description: 'HTML, CSS, JavaScript, PHP' },
  { id: 'shopify', name: 'Shopify', description: 'Liquid, CSS, JavaScript' },
  { id: 'react', name: 'React', description: 'JSX, CSS/Tailwind, JavaScript' },
  { id: 'vue', name: 'Vue.js', description: 'Vue, CSS/Tailwind, JavaScript' }
];

// Conversation & Token Management
const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
const [tokenCount, setTokenCount] = useState(0);
const [sessionActive, setSessionActive] = useState(true);
const TOKEN_LIMIT = 50000;

// Template/Wireframe Management
const [templateMode, setTemplateMode] = useState(false);
const [currentTemplateHTML, setCurrentTemplateHTML] = useState('');
const [currentTemplateInfo, setCurrentTemplateInfo] = useState<any>(null);

// Multi-file & Code View
const [multiFileContent, setMultiFileContent] = useState<MultiFileContent>({});
const [codeView, setCodeView] = useState('preview');
const [isMultiFileMode, setIsMultiFileMode] = useState(false);
```

### Platform-Specific Instructions System
```typescript
const getPlatformInstructions = (platform: string): string => {
  switch (platform) {
    case 'static':
      return `IMPORTANT: Create a complete HTML document with inline CSS and JavaScript. Return as single HTML file.`;
    case 'react':
      return `IMPORTANT: Create a React component landing page. Use inline styles or Tailwind classes. Make it a complete, working React component`;
    case 'shopify':
      return `IMPORTANT: Create a Shopify Liquid template. Use {{ 'styles.css' | asset_url }} for CSS references. Use proper Liquid syntax`;
    // ... other platforms
  }
};
```

### AI Integration & Client Context
```typescript
const callClaude = async (conversationHistory: ConversationMessage[]) => {
  const response = await apiService.generateContent(conversationHistory, {
    client_id: currentClient?.id,
    content_type: 'landing_page',
    title: generateTitle(),
    metadata: {
      platform: selectedPlatform,
      template_used: currentTemplateInfo?.id,
      template_mode: templateMode,
      multi_file_mode: isMultiFileMode,
      tool: 'landing-page-builder'
    }
  });
  return response;
};
```

### Code Extraction & Multi-File Support
```typescript
const extractCodeFromHTML = (content: string): MultiFileContent => {
  // Platform-specific extraction logic
  if (selectedPlatform === 'react') {
    // Extract React component structure
    files['src/App.jsx'] = content.includes('import') ? content : `import React from 'react';\n\n${content}`;
  } else if (selectedPlatform === 'vue') {
    // Extract Vue component
    files['src/App.vue'] = content;
  } else if (selectedPlatform === 'shopify') {
    // Extract Liquid template
    files['templates/index.liquid'] = content;
  }
  // ... CSS/JS extraction logic
};
```

### Template/Wireframe Loading
```typescript
const useTemplate = async (template: any) => {
  const templateHTML = await loadLandingPageTemplateHTML(template.id, template.category);
  setCurrentTemplateHTML(templateHTML);
  setCurrentTemplateInfo(template);
  setTemplateMode(true);
  setLandingPagePreview(templateHTML);
};

const useWireframe = async (wireframe: any) => {
  const wireframeHTML = await loadLandingPageWireframeHTML(wireframe.id, wireframe.category);
  setCurrentTemplateHTML(wireframeHTML);
  setCurrentTemplateInfo(wireframe);
  setTemplateMode(true);
};
```

### Preview & Download System
```typescript
// Platform conversion for preview
const convertToPreviewHTML = (content: string): string => {
  let previewContent = content;
  if (selectedPlatform === 'shopify') {
    previewContent = previewContent.replace(/\{\{\s*'([^']+)'\s*\|\s*asset_url\s*\}\}/g, '$1');
  }
  if (selectedPlatform === 'wordpress') {
    previewContent = previewContent.replace(/<\?php[\s\S]*?\?>/g, '');
  }
  // ... other platform conversions
  return previewContent;
};

// ZIP package download
const downloadZipPackage = async () => {
  const zip = new JSZip();
  const extractedFiles = extractCodeFromHTML(landingPagePreview);
  Object.entries(extractedFiles).forEach(([filename, content]) => {
    zip.file(filename, content);
  });
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${selectedPlatform}-landing-page-project.zip`);
};
```

### UI Structure
#### Tab Navigation
- create-landing: Main AI builder interface
- templates: Template gallery with category filtering
- wireframes: Wireframe gallery with category filtering

#### Main Interface Components
- Platform selector with 5 supported platforms
- Client context display with warning for no client
- Token usage tracking with visual progress bar
- Chat interface for AI interaction
- Live preview with desktop/mobile toggle
- Code view tabs (Preview, HTML, CSS, JavaScript, PHP, Liquid, JSX, Vue, Tailwind)

#### Asset Management
- Template loading from /assets/generator-assets/landing-page/templates/
- Wireframe loading from /assets/generator-assets/landing-page/wireframes/
- Category-based filtering (saas, ecommerce, agency, startup, portfolio, app)

### Event Handling
- useTemplateOrWireframe custom event for asset selection
- reuseSavedAsset custom event for loading saved content
- Session management with automatic token counting
- Auto-save integration with metadata tracking

### Key Dependencies
- JSZip for project packaging
- file-saver for download functionality
- apiService for AI integration
- loadLandingPage* functions for asset loading
- SaveButton component for content persistence

## PromptLibrary 
React functional component that provides a searchable, categorized library of marketing prompts with editing capabilities, pagination, and clipboard integration.

### Key Interfaces & Types
#### Core Data Structure
```typescript
interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  useCase: string;
}
```

#### Category Structure
```typescript
const categories = [
  { id: 'all', name: 'All Prompts', icon: Book },
  { id: 'marketing-calendar', name: 'Marketing Calendar', icon: Calendar },
  { id: 'social-calendar', name: 'Social Media Calendar', icon: Calendar },
  { id: 'email-calendar', name: 'Email Calendar', icon: Calendar },
  { id: 'email-generator', name: 'Email Generator', icon: Mail },
  { id: 'landing-page-builder', name: 'Landing Page Builder', icon: Globe },
  { id: 'persona-builder', name: 'Persona Builder', icon: User },
  { id: 'content-creator', name: 'Content Creator', icon: FileText },
  { id: 'ads-analysis', name: 'Ads Analysis', icon: BarChart3 }
];
```

### State Management
#### Primary State Variables
```typescript
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('all');
const [editingPrompt, setEditingPrompt] = useState<string | null>(null);
const [editedContent, setEditedContent] = useState('');
const [copiedPrompts, setCopiedPrompts] = useState<Set<string>>(new Set());
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(20);
```

### Core Functions
#### Filtering Logic
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

#### Pagination Implementation
```typescript
const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentPrompts = filteredPrompts.slice(startIndex, endIndex);
```

#### Clipboard Operations
```typescript
const copyToClipboard = async (promptId: string, content: string) => {
  try {
    await navigator.clipboard.writeText(content);
    setCopiedPrompts(prev => new Set(prev).add(promptId));
    
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

#### Edit Mode Management
```typescript
const startEditing = (promptId: string, content: string) => {
  setEditingPrompt(promptId);
  setEditedContent(content);
};

const cancelEditing = () => {
  setEditingPrompt(null);
  setEditedContent('');
};

const copyEditedPrompt = async (promptId: string) => {
  await copyToClipboard(promptId, editedContent);
  setEditingPrompt(null);
  setEditedContent('');
};
```

### Data Structure
Prompt Categories (12 prompts each, 108 total)
- marketing-calendar: Q4 campaigns, product launches, annual strategies, events, seasonal campaigns, multi-channel coordination, lifecycle marketing, competitive response, partnership marketing, crisis communication, budget optimization, ROI tracking
- social-calendar: Instagram growth, LinkedIn B2B, TikTok viral content, Facebook communities, Twitter thought leadership, YouTube series, Pinterest visual marketing, multi-platform repurposing, crisis management, influencer collaboration, social commerce, community management
- email-calendar: Welcome series automation, monthly newsletters, abandoned cart recovery, customer re-engagement, product launch campaigns, seasonal promotions, lifecycle journeys, event-driven campaigns, educational courses, feedback surveys, VIP loyalty programs, performance optimization
- email-generator: Professional welcome emails, product announcements, re-engagement campaigns, newsletter content, promotional sales, event invitations, survey requests, thank you messages, educational tutorials, milestone celebrations, cart recovery, referral programs
- landing-page-builder: SaaS products, lead magnets, e-commerce products, event registration, service businesses, mobile apps, online courses, startup MVPs, coaching businesses, agency services, non-profit donations, multi-platform optimization
- persona-builder: B2B decision makers, consumer brands, tech early adopters, millennial professionals, small business owners, Gen Z consumers, healthcare professionals, remote workers, senior executives, education sector, fitness enthusiasts, creative professionals
- content-creator: SEO blog posts, social media calendars, case studies, newsletter content, video scripts, white papers, product descriptions, press releases, podcast episodes, infographics, webinar content, content repurposing strategies
- ads-analysis: Google Ads performance, Facebook audience analysis, multi-platform ROI, e-commerce advertising, B2B lead generation, creative A/B testing, competitive intelligence, retargeting optimization, video advertising, mobile performance, seasonal trends, attribution modeling

### UI Components
#### Search and Filter Interface
- Search input with icon overlay
- Category dropdown selection
- Real-time filtering with results count
- Pagination controls with ellipsis for large page counts

#### Prompt Card Layout
- Category icon and name header
- Title and description
- Tag display with styled badges
- Content preview (scrollable, max-height: 200px)
- Edit mode with textarea
- Use case description
- Action buttons (Edit/Copy with state indicators)

#### Pagination System
- Previous/Next navigation
- Smart page number display with ellipsis
- Current page highlighting
- Responsive button states

### Key Dependencies
- Icons: lucide-react (Search, Copy, Edit, Book, Mail, Globe, User, Calendar, FileText, Settings, Check, ChevronLeft, ChevronRight, BarChart3)
- Clipboard API: navigator.clipboard for copy functionality
- React Hooks: useState, useEffect for state management

### Styling Approach
- CSS custom properties for theming
- Responsive grid layout (auto-fill, minmax(400px, 1fr))
- Consistent spacing and typography
- Hover states and transitions
- Mobile-responsive design with flexbox wrapping

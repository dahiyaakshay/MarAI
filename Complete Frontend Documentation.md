# Complete Frontend Analysis & Documentation - MarAI Platform

## Project Overview
MarAI is a comprehensive AI-powered marketing automation platform built with React, TypeScript, and Vite. The application provides marketing professionals with tools for content creation, calendar management, persona building, and email generation using AI assistance. The frontend is designed as a single-page application with a dashboard-style interface featuring a persistent sidebar navigation and dynamic content areas.

## Technology Stack
- Framework: React 18.3.1 with TypeScript
- Build Tool: Vite 7.0.3
- Styling: Custom CSS with CSS Variables (minimal Tailwind usage)
- Icons: Lucide React 0.344.0
- Export Libraries:
   - jsPDF 3.0.1 with jspdf-autotable 5.0.2 (PDF generation)
   - ExcelJS 4.4.0 (Excel file generation)
   - file-saver 2.0.5 (File download handling)
- Development Tools: ESLint, TypeScript ESLint, PostCSS, Autoprefixer

## Core Design Principles
- Dark/Light Theme Support: Complete theming system using CSS custom properties
- Client Multi-tenancy: Support for multiple client profiles with data isolation
- AI-First Design: Chat interfaces and AI assistance integrated throughout
- Export-Ready: Comprehensive export functionality for all data types
- Mobile-Responsive: Adaptive layouts for various screen sizes
- Professional UI: Modern, clean interface suitable for business environments

## Complete Project Structure
<pre>D:\MarAI\
├── Configuration Files
│   ├── .gitignore (node_modules/, .env)
│   ├── eslint.config.js (TypeScript ESLint configuration)
│   ├── index.html (Entry HTML file)
│   ├── package.json (Dependencies and scripts)
│   ├── package-lock.json (Dependency lock file)
│   ├── postcss.config.js (PostCSS with Tailwind and Autoprefixer)
│   ├── tailwind.config.js (Minimal Tailwind configuration)
│   ├── tsconfig.app.json (Application TypeScript config)
│   ├── tsconfig.json (Root TypeScript config)
│   ├── tsconfig.node.json (Node TypeScript config)
│   └── vite.config.ts (Vite configuration with React plugin)
│
├── Frontend Source (src/)
│   ├── App.css (Main application styles - 2000+ lines)
│   ├── App.tsx (Root application component)
│   ├── index.css (Minimal root styles)
│   ├── main.tsx (React application entry point)
│   ├── vite-env.d.ts (Vite type definitions)
│   │
│   ├── components/
│   │   ├── Common/
│   │   │   ├── DownloadButton.tsx (Multi-format export dropdown)
│   │   │   └── MultiSelect.tsx (Advanced multi-selection component)
│   │   │
│   │   ├── Layout/
│   │   │   ├── Header.tsx (Top navigation bar)
│   │   │   ├── Sidebar.css (Sidebar-specific styles)
│   │   │   └── Sidebar.tsx (Left navigation sidebar)
│   │   │
│   │   ├── Modals/
│   │   │   ├── AddClientModal.tsx (Client creation form)
│   │   │   ├── EditModal.tsx (Content editing modal)
│   │   │   ├── EditPersonaModal.tsx (Persona editing form)
│   │   │   └── PreviewModal.tsx (Template/wireframe preview)
│   │   │
│   │   └── Pages/
│   │       ├── Dashboard.tsx (Main dashboard with analytics)
│   │       ├── EmailCalendar.tsx (Email campaign planning)
│   │       ├── EmailGenerator.tsx (AI email creation tool)
│   │       ├── MarketingCalendar.tsx (Marketing content planning)
│   │       ├── PersonaBuilder.tsx (Customer persona management)
│   │       ├── Settings.tsx (User profile and API configuration)
│   │       └── SocialCalendar.tsx (Social media content planning)
│   │
│   └── services/
│       └── exportService.ts (Data export functionality)
│
└── Backend Source (server/)
    ├── Configuration Files
    │   ├── .env.example (Environment variables template)
    │   ├── .gitignore (Backend-specific ignores)
    │   ├── package.json (Backend dependencies)
    │   ├── package-lock.json (Backend dependency lock)
    │   ├── README.md (Backend documentation)
    │   └── tsconfig.json (Backend TypeScript config)
    │
    ├── src/
    │   ├── index.ts (Backend entry point)
    │   ├── middleware/ (Auth, rate limiting)
    │   ├── routes/ (API endpoints)
    │   ├── services/ (AI integration, URL analysis)
    │   ├── types/ (TypeScript interfaces)
    │   └── utils/ (API clients)
    │
    └── uploads/ (File upload storage)</pre>

## Detailed File Analysis
### Root Configuration Files
#### package.json (Frontend Dependencies)
#### Core Dependencies:
- react & react-dom (18.3.1): Main React framework
- exceljs (4.4.0): Excel file generation and manipulation
- file-saver (2.0.5): Browser file download functionality
- jspdf (3.0.1) & jspdf-autotable (5.0.2): PDF generation with table support
- lucide-react (0.344.0): Comprehensive icon library

#### Development Dependencies:
- vite (7.0.3): Fast build tool and dev server
- typescript (5.5.3): Type checking and compilation
- eslint with TypeScript plugins: Code linting and formatting
- tailwindcss (3.4.1): Utility-first CSS framework (minimal usage)
- autoprefixer: CSS vendor prefixing

#### Scripts:
- dev: Development server with hot reload
- build: Production build with optimization
- lint: Code quality checking
- preview: Preview production build

#### vite.config.ts
Configures Vite build tool with:
- React plugin for JSX/TSX support
- Optimization settings excluding lucide-react from pre-bundling
- Development server configuration

#### ESLint Configuration (eslint.config.js)
Comprehensive linting setup with:
- TypeScript ESLint integration
- React Hooks plugin for hooks rules
- React Refresh plugin for fast refresh
- Browser globals configuration
- Strict type checking rules

#### TypeScript Configuration
Three-layer TypeScript setup:
- tsconfig.json: Root configuration with project references
- tsconfig.app.json: Application code configuration (ES2020, strict mode)
- tsconfig.node.json: Build tools configuration (ES2022)

## Core Application Files
### App.tsx (Root Component)
**Purpose:** Main application orchestrator managing global state and routing
#### Key State Management:
- activePage: Current page navigation state
- theme: Dark/light theme toggle with localStorage persistence
- currentClient: Active client context for multi-tenancy
- clients: Client data storage and management
- Modal states: editModalOpen, addClientModalOpen, editPersonaModalOpen, previewModalOpen
- Modal data: editModalData, previewModalData

#### Core Functions:
- navigateToPage(): Internal routing system
- toggleTheme(): Theme switching with DOM class manipulation
- switchClient(): Client context switching
- Modal management functions with body overflow control
- saveNewClient(): Client creation and persistence

#### Page Data Configuration:
```javascript
pageData = {
  'dashboard': { title: 'Dashboard', subtitle: 'Overview of your marketing performance' },
  'marketing-calendar': { title: 'Marketing Calendar', subtitle: 'Plan and schedule your marketing campaigns' },
  'social-calendar': { title: 'Social Media Calendar', subtitle: 'Schedule and manage your social media posts' },
  'email-calendar': { title: 'Email Calendar', subtitle: 'Plan and schedule your email campaigns' },
  'email-generator': { title: 'Email Generator', subtitle: 'Generate compelling email content with AI' },
  'persona-builder': { title: 'Persona Builder', subtitle: 'Create and manage customer personas' },
  'settings': { title: 'Settings', subtitle: 'Configure your account and preferences' }
}
```

#### Layout Structure:
- Fixed sidebar navigation (240px width)
- Dynamic main content area with header
- Modal overlay system with backdrop blur
- Template/wireframe usage event system

### App.css (Main Stylesheet - 2000+ lines)
#### CSS Architecture:
#### CSS Custom Properties (CSS Variables):
```css
:root {
  --bg-primary: #0f1419;        /* Main background */
  --bg-secondary: #0d1117;      /* Secondary background */
  --bg-card: #161b22;           /* Card backgrounds */
  --bg-hover: #21262d;          /* Hover states */
  --border-color: #21262d;      /* Default borders */
  --border-hover: #30363d;      /* Hover borders */
  --text-primary: #f0f6fc;      /* Primary text */
  --text-secondary: #c9d1d9;    /* Secondary text */
  --text-muted: #7d8590;        /* Muted text */
  --accent-color: #ff6b35;      /* Brand orange */
  --accent-hover: #e55a2b;      /* Accent hover */
  --success-color: #56d364;     /* Success green */
  --error-color: #f85149;       /* Error red */
}

body.light-theme {
  /* Complete light theme variable overrides */
}
```

#### Component Style Categories:
#### 1. Layout Components:
   - .container: Main flex layout container
   - .main-content: Primary content area with sidebar offset
   - .content: Content padding and spacing

#### 2. Header Styles:
   - .header: Top navigation with title and controls
   - .header-left & .header-right: Flexible header layout
   - .theme-toggle: Theme switching button
   - .client-dropdown: Client selection interface

#### 3. Card System:
   - .card: Base card component with border and background
   - .card-header, .card-content: Card sections
   - .card-title, .card-subtitle: Typography hierarchy

#### 4. Grid System:
   - .grid: Base grid container
   - .grid-2, .grid-3, .grid-4: Responsive grid variants
   - Auto-fit minmax responsive patterns

#### 5. Button System:
   - .btn: Primary button style
   - .btn-secondary: Secondary button variant
   - .btn-cancel, .btn-save, .btn-delete: Semantic button types

#### 6. Stats Cards:
   - .stat-card: Performance metric display
   - .stat-number: Large metric display
   - .stat-change: Trend indicators with color coding

#### 7. Dashboard Components:
   - .dashboard-top-row, .dashboard-bottom-row: Layout grids
   - .quick-actions: Action button grid
   - .activity-feed: Scrollable activity list
   - .mini-calendar: Compact calendar widget

#### 8. Calendar System:
   - .calendar-layout: Two-column calendar/chat layout
   - .calendar-grid: 7-column calendar grid
   - .calendar-day: Individual day cells with event indicators

#### 9. Chat Interface:
   - .chat-section: AI chat container
   - .chat-messages: Scrollable message area
   - .message.user & .message.ai: Message styling
   - .chat-input-area: Input controls

#### 10. Form Components:
   - .form-input, .form-textarea, .form-select: Input styling
   - .form-grid, .form-grid-2: Form layout systems
   - .multi-select: Advanced selection component

#### 11. Modal System:
   - .modal-overlay: Full-screen backdrop with blur
   - .modal: Centered modal container
   - .modal-header, .modal-content, .modal-actions: Modal sections

#### 12. Email Generator:
   - .email-generator-layout: Split chat/preview layout
   - .email-preview: Email preview container
   - .preview-toggle: Desktop/mobile preview switching

#### 13. Persona Builder:
   - .persona-builder-container: Sidebar/detail layout
   - .persona-item: Persona list items with selection states
   - .persona-detail: Detailed persona view

#### Responsive Design:
- Mobile-first approach with 768px breakpoint
- Collapsible sidebar on mobile (60px width)
- Responsive grid systems
- Adaptive modal sizing

### main.tsx (Application Entry)
Simple React 18 entry point using createRoot with StrictMode for development safety.

### index.css
Minimal file removing Tailwind imports to prevent conflicts with custom CSS system.

## Layout Components
### Header.tsx
#### Props Interface:
```typescript
interface HeaderProps {
  title: string;           // Current page title
  subtitle: string;        // Current page subtitle
  theme: string;          // Current theme state
  toggleTheme: () => void; // Theme toggle function
  currentClient: string;   // Active client ID
  clients: Record<string, { name: string; data: any }>; // Client data
  switchClient: (clientId: string) => void; // Client switching
  openAddClientModal: () => void; // Modal opener
}
```

#### Features:
- Dynamic title/subtitle display based on current page
- Theme toggle button with Sun/Moon icons
- Client selection dropdown with dynamic options
- "Add Client" button integration
- Responsive header layout with flexbox

### Sidebar.tsx & Sidebar.css
#### Navigation Structure:
```
General Section:
- Dashboard (grid icon)

Calendar Section:
- Marketing Calendar (calendar icon)
- Social Media Calendar (search icon)
- Email Calendar (mail icon)

Tools Section:
- Email Generator (edit icon)
- Persona Builder (user icon)

Other Section:
- Settings (settings icon)
```

#### Features:
- Fixed 240px width with dark theme always
- Active page highlighting with orange accent
- SVG icons for all navigation items
- Responsive collapse to 60px on mobile
- Hover effects and smooth transitions

#### Styling Approach:
- Separate CSS file for better organization
- Always dark theme regardless of global theme
- Custom SVG icons instead of icon library
- Orange accent color (#ff6b35) for active states

## Common Components
### DownloadButton.tsx
**Purpose:** Multi-format export functionality with dropdown interface
#### Props:
```typescript
interface DownloadButtonProps {
  type: 'calendar' | 'content' | 'personas';
  calendarType?: string; // 'marketing' | 'social' | 'email'
  className?: string;
}
```

#### Features:
- Dropdown interface with format options (PDF, Excel)
- Integration with exportService for file generation
- Dynamic button text based on type
- Loading states and error handling
- Click-outside-to-close functionality
- Success/error feedback messages

#### Export Options:
- PDF: Formatted documents with styling
- Excel: Spreadsheets for data analysis
- Word: Disabled due to library compatibility issues

### MultiSelect.tsx
**Purpose:** Advanced multi-selection component with tag display
#### Props:
```typescript
interface MultiSelectProps {
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}
```

#### Features:
- Dropdown with checkbox selection
- Selected items displayed as removable tags
- Click outside to close functionality
- Smooth animations and transitions
- Keyboard accessibility support
- Custom styling matching app theme

## Modal Components
### AddClientModal.tsx
**Purpose:** Comprehensive client creation form
#### Form Sections:
#### 1. Company Information:
   - Company Name (required)
   - Industry (dropdown selection)
   - Website URL

#### 2. Primary Contact:
   - Contact Name
   - Contact Email
   - Phone Number
   - Contact Role

#### 3. Marketing Details:
   - Target Audience (textarea)
   - Marketing Budget (dropdown ranges)
   - Primary Marketing Goals (dropdown)

#### Features:
- Form validation with required field checking
- Dropdown selections for standardized data
- Grid layouts for organized form presentation
- Save/Cancel actions with data persistence
- Client data structure creation and storage

### EditModal.tsx
**Purpose:** Dynamic content editing for calendar items
#### Calendar-Specific Options:
```typescript
const calendarOptions = {
  'marketing-calendar': {
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
}
```

#### Form Sections:
1. Schedule: Date and time selection
2. Content Details: Title and content editing
3. Campaign Settings: Type, platform, and campaign configuration
4. Additional Options: Audience and tags

### EditPersonaModal.tsx
**Purpose:** Detailed persona editing with comprehensive fields
#### Form Sections:
1. Basic Information: Name, role, age, location
2. Demographics: Income level, education
3. Goals & Pain Points: Motivations and challenges
4. Behavioral Traits: Tech comfort, decision making, communication, work style
5. Solutions & Characteristics: Problem solutions and unique traits

#### Features:
- Multi-section form with icon headers
- Textarea fields for detailed descriptions
- Grid layouts for organized data entry
- Save functionality with data persistence

### PreviewModal.tsx
**Purpose:** Template and wireframe preview with usage options
#### Features:
- Large preview area with placeholder content
- Use/Close action buttons
- Data passing to parent components
- Modal backdrop with click-to-close
- Integration with EmailGenerator template system

## Page Components
### Dashboard.tsx
**Purpose:** Main dashboard with analytics, activity feed, and quick actions
#### Key Features:
#### 1. Quick Actions Grid:
   - 6 action buttons linking to main features
   - Icons and descriptions for each action
   - Direct navigation integration

#### 2. Stats Cards:
   - Content Created, Active Campaigns, Success Rate, Scheduled Posts
   - Trend indicators with colors (green/red)
   - Large number displays with percentage changes

#### 3. Content Analytics Section:
   - Top stats row with key metrics
   - Custom SVG bar chart implementation
   - Weekly content creation visualization
   - Gradient fills and responsive design

#### 4. Activity Feed:
   - Sliding widget with navigation controls
   - 8 sample activities with icons and timestamps
   - Emoji icons for visual distinction
   - Scrollable container with custom scrollbar

#### 5. Calendar Widget:
   - Mini calendar with month navigation
   - Today highlighting and event indicators
   - Click handlers for date selection
   - Full month view with proper grid layout

#### 6. Sliding Widgets:
   - Personas widget with navigation
   - API status display
   - Upcoming content list
   - Navigation controls for content pagination

#### State Management:
- Current date for calendar navigation
- Persona and activity pagination indices
- Dynamic content generation for demonstrations

### MarketingCalendar.tsx
**Purpose:** Marketing content planning with AI assistance
**Layout:** Two-column layout with calendar and AI chat
#### Features:
#### 1. Calendar Section:
   - Full month calendar with navigation
   - Event indicators on specific dates
   - Click-to-edit functionality
   - Download buttons for calendar and content export

#### 2. AI Chat Section:
   - URL analysis input for content extraction
   - Multi-select filters for content configuration
   - AI chat interface with message history
   - Real-time content generation simulation

#### Configuration Options:
- Content Types: Blog, infographic, social post, email, whitepaper, video script, press release, case study
- Platforms: Facebook, Instagram, Twitter, LinkedIn, Reddit, TikTok, YouTube, website, email
- Frequencies: Daily, weekly, bi-weekly, monthly, quarterly, one-time

### SocialCalendar.tsx
**Purpose:** Social media content planning with platform-specific optimization
#### Similar Structure to MarketingCalendar but with:
#### Social-Specific Options:
- Content Types: Post, story, reel, carousel, live stream, poll, UGC, hashtag campaign
- Platforms: Facebook, Instagram, Twitter, LinkedIn, TikTok, YouTube Shorts, Snapchat, Pinterest, Reddit
- Frequencies: Multiple daily, daily, every other day, 3x/week, weekly, bi-weekly, monthly

#### AI Integration:
- Platform-specific content optimization
- Hashtag and engagement suggestions
- Content length and format recommendations

### EmailCalendar.tsx
**Purpose:** Email campaign planning and scheduling
#### Email-Specific Features:
#### Configuration Options:
- Email Types: Newsletter, promotional, welcome series, abandoned cart, product launch, educational, re-engagement, survey
- Campaign Types: Broadcast, automated sequence, drip campaign, trigger-based, A/B test, transactional
- Send Frequencies: Daily, weekly, bi-weekly, monthly, quarterly, event triggered, one-time send

#### AI Assistance:
- Email subject line optimization
- Content personalization suggestions
- Send time recommendations
- A/B testing advice

### EmailGenerator.tsx
**Purpose:** AI-powered email creation with templates and wireframes
#### Most Complex Component with Three Tabs:
#### 1. Create Email Tab:
   - Split layout: AI chat and email preview
   - Website URL input for brand extraction
   - File upload with drag-and-drop support
   - Real-time email generation and preview
   - Desktop/mobile preview toggle
   - Download/copy HTML functionality

#### 2. Templates Tab:
   - 50+ generated email templates
   - Category filtering (newsletter, promotional, welcome, announcement, ecommerce)
   - Grid layout with preview cards
   - Import and preview functionality
   - Template usage tracking

#### 3. Wireframes Tab:
   - 50+ email wireframe layouts
   - Structure-focused design templates
   - Category filtering (simple, complex, header-footer, sidebar, grid)
   - Wireframe import system

#### Advanced Features:
- File upload with validation (images, 5MB limit)
- Template/wireframe preview modal integration
- HTML email code generation
- Brand extraction simulation
- Mobile-responsive preview modes

#### State Management:
- Active tab switching
- File upload management
- Message history for AI chat
- Email preview HTML storage
- Filter states for templates and wireframes

### PersonaBuilder.tsx
**Purpose:** Customer persona creation and management
#### Two-Tab Interface:
#### 1. New Persona Tab:
   - Split layout: AI chat and persona preview
   - AI-assisted persona generation
   - Dynamic persona creation based on user input
   - Real-time preview updates
   - Save to persona library

#### 2. Saved Personas Tab:
   - Sidebar/detail layout
   - Persona list with selection
   - Detailed persona view with sections:
      - Demographics
      - Goals & Motivations
      - Pain Points & Challenges
      - Behavioral Traits
      - Possible Solutions
      - Unique Characteristics

#### Persona Data Structure:
```typescript
interface PersonaData {
  name: string;
  role: string;
  company: string;
  avatar: string;
  age: string;
  location: string;
  income: string;
  education: string;
  techComfort: string;
  decisionMaking: string;
  communication: string;
  workStyle: string;
  goals: string[];
  painPoints: string[];
  solutions: string[];
  characteristics: string[];
}
```

#### AI Generation Logic:
- Keyword detection for enterprise/tech/marketing contexts
- Dynamic persona attribute generation
- Industry-specific persona variations
- Realistic demographic data creation

### Settings.tsx
**Purpose:** User profile and API key management
#### Two-Section Layout:
#### 1. Profile Information:
   - First/last name, email, company, role
   - localStorage persistence
   - Form validation and saving
   - Loading states during save operations

#### 2. API Keys Section:
   - Claude API key management
   - ChatGPT API key management
   - Key masking for security
   - Validation through backend integration
   - Status indicators (connected/disconnected/validated)
   - Delete functionality with confirmation

#### Security Features:
- API key masking with bullet characters
- Show/hide toggle for key visibility
- Secure storage in localStorage
- Backend validation integration
- Key deletion with confirmation

#### API Integration:
- Backend endpoints for key validation
- Error handling for network issues
- Loading states during validation
- Success/error feedback messages

## Services
### exportService.ts
**Purpose:** Comprehensive data export functionality
#### Export Types:
1. Calendar Export (PDF/Excel)
2. Content Export (PDF/Excel)
3. Persona Export (PDF/Excel)

#### PDF Generation Features:
- jsPDF integration with autoTable plugin
- Custom styling with brand colors
- Table layouts for structured data
- Multi-page document support
- Header and metadata inclusion

#### Excel Generation Features:
- ExcelJS integration for complex spreadsheets
- Multiple worksheet support
- Header styling and formatting
- Column width optimization
- Metadata sheets with summary information

#### Sample Data Generation:
- Realistic marketing campaign data
- Social media post examples
- Email campaign content
- Comprehensive persona profiles
- Date-based content scheduling

#### Export Methods:
- exportCalendarPDF(), exportCalendarExcel()
- exportContentPDF(), exportContentExcel()
- exportPersonasPDF(), exportPersonasExcel()
- File saving with browser download API
- Error handling and user feedback

## State Management Architecture
### Global State (App.tsx)
- Navigation: activePage for internal routing
- Theming: theme with localStorage persistence
- Multi-tenancy: currentClient and clients data
- Modal Management: Multiple modal states and data

### Component-Level State
- Form Data: Local state for all form components
- UI State: Loading, validation, selection states
- Chat History: Message arrays for AI interactions
- Pagination: Index tracking for sliding widgets

### Data Persistence
- localStorage: User profiles, API keys, theme preferences
- Session State: Temporary data during user sessions
- Export Data: Generated content for download functionality

## Integration Points
### Backend Integration
- API Key Validation: POST requests to validation endpoints
- File Upload: Planned integration for image processing
- AI Services: Claude and ChatGPT API integration through backend

### Browser APIs
- File System: File downloads and uploads
- Clipboard: Copy functionality for generated content
- Local Storage: Data persistence across sessions

### External Libraries
- PDF Generation: Complex document creation
- Excel Processing: Spreadsheet generation and manipulation
- Icon System: Comprehensive icon library integration

## Development Guidelines
### Code Organization
- Component Structure: Clear separation of layout, common, modal, and page components
- TypeScript Usage: Comprehensive interface definitions and type safety
- CSS Architecture: Custom properties for theming, component-scoped styles
- File Naming: Descriptive names with clear purpose indication

### Performance Considerations
- Code Splitting: Component-based organization for potential lazy loading
- Asset Optimization: Optimized icon usage and image handling
- State Management: Efficient re-rendering with proper dependency arrays
- Export Optimization: Chunked data processing for large exports

### Accessibility
- Keyboard Navigation: Proper tab order and keyboard support
- Color Contrast: Theme-aware color system with sufficient contrast
- Screen Reader Support: Semantic HTML and ARIA labels
- Focus Management: Clear focus indicators and logical flow

### Responsive Design
- Mobile-First: Base styles for mobile with desktop enhancements
- Breakpoint System: Consistent 768px mobile breakpoint
- Flexible Layouts: Grid and flexbox for adaptive layouts
- Touch Interfaces: Appropriate sizing for touch interactions

This documentation provides a complete reference for understanding and extending the MarAI frontend application. The architecture supports scalable development while maintaining code quality and user experience standards.

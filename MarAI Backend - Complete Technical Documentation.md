# MarAI Backend - Complete Technical Documentation

## Project Overview
MarAI is a comprehensive marketing automation tool backend built with Node.js, TypeScript, and Express.js. The system provides AI-powered content generation, URL analysis, email campaign creation, persona building, and marketing automation features through a REST API architecture.

## Core Purpose
- AI Content Generation: Generate marketing content using OpenAI GPT-4-turbo and Anthropic Claude models
- URL Analysis: Extract content, metadata, and branding information from websites
- Email Campaign Creation: Create professional email campaigns with HTML templates
- Persona Generation: Build detailed customer personas based on descriptions
- File Management: Handle image uploads with optimization
- API Integration: Seamless integration with frontend applications

## Technology Stack
- Runtime: Node.js 20+
- Language: TypeScript 5.3.2
- Framework: Express.js 4.18.2
- AI APIs: OpenAI API (GPT-4-turbo), Anthropic API (Claude 3 Sonnet)
- File Processing: Sharp 0.32.6 for image optimization
- Web Scraping: Cheerio 1.0.0-rc.12, Axios 1.6.2
- Security: Helmet 7.1.0, CORS 2.8.5
- Rate Limiting: rate-limiter-flexible 7.1.1
- Validation: Zod 3.22.4
- File Uploads: Multer 1.4.5-lts.1
- Build Tools: tsx 4.6.0 for development, TypeScript compiler for production

## Project Architecture
### Directory Structure
<pre>server/
├── src/
│   ├── index.ts                 # Main application entry point
│   ├── middleware/
│   │   ├── auth.ts             # API key validation middleware
│   │   └── rateLimiter.ts      # Rate limiting middleware
│   ├── routes/
│   │   ├── analyze.ts          # URL analysis endpoints
│   │   ├── chat.ts             # AI chat endpoints
│   │   ├── content.ts          # Content generation endpoints
│   │   ├── email.ts            # Email generation endpoints
│   │   ├── persona.ts          # Persona generation endpoints
│   │   ├── upload.ts           # File upload endpoints
│   │   └── validate.ts         # API key validation endpoints
│   ├── services/
│   │   ├── aiService.ts        # AI integration service
│   │   └── urlAnalyzer.ts      # URL analysis service
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   └── utils/
│       └── apiClient.ts        # Frontend API client utility
├── uploads/                     # File upload directory (runtime)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Node.js dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation</pre>
  
## Core Architecture Patterns
- RESTful API Design: Standard HTTP methods and status codes
- Layered Architecture: Routes → Services → External APIs
- Middleware Pattern: Authentication, rate limiting, error handling
- Service Layer: Business logic abstraction
- Type Safety: Comprehensive TypeScript interfaces
- Error Handling: Consistent error response format

## Detailed File Documentation
### 1. Main Application File (src/index.ts)
**Purpose:** Application entry point and server configuration
#### Key Responsibilities:
- Express application initialization
- Middleware configuration and order
- Route registration
- Error handling setup
- Server startup and graceful shutdown

#### Detailed Implementation:
- Security Setup: Helmet middleware for security headers, CORS configuration for frontend communication
- Body Parsing: JSON and URL-encoded parsing with 10MB limit for large content
- Static Files: Serves uploaded files from /uploads endpoint
- Route Registration: All API routes mounted under /api prefix
- Error Handling: Global error handler with development/production mode differences
- Health Check: /health endpoint for monitoring and load balancers
- Graceful Shutdown: SIGTERM and SIGINT handlers for clean shutdowns

#### Environment Configuration:
- PORT: Server port (default: 3001)
- NODE_ENV: Environment mode (development/production)
- FRONTEND_URL: CORS origin URL

### 2. Middleware Layer
#### API Key Authentication (src/middleware/auth.ts)
**Purpose:** Validates API keys for AI services
#### Key Features:
- Header Extraction: Reads X-API-Keys header containing JSON string
- JSON Parsing: Parses API keys object with error handling
- Validation Logic: Ensures at least one valid API key (OpenAI or Anthropic)
- Request Extension: Adds apiKeys property to request object
- Error Responses: Consistent error format for validation failures

#### Interface Extension:
```typescript
interface AuthenticatedRequest extends Request {
  apiKeys: ApiKeys; // Contains openai?: string, anthropic?: string
}
```

**Usage Pattern:** Applied to all routes requiring AI services

#### Rate Limiting (src/middleware/rateLimiter.ts)
**Purpose:** Prevents API abuse through request limiting
#### Implementation Details:
- Memory-based Storage: Uses RateLimiterMemory for simplicity
- IP-based Tracking: Limits requests per IP address
- Configurable Limits: Environment-driven configuration
- Standard Headers: Returns Retry-After header for 429 responses
- Error Format: Consistent with application error responses

#### Configuration:
- Default: 100 requests per 15 minutes per IP
- Window: 900,000ms (15 minutes)
- Response: HTTP 429 with retry information

### 3. Service Layer
#### AI Service (src/services/aiService.ts)
**Purpose:** Centralized AI integration and content generation
#### Core Methods:
##### 1. generateContent(prompt, apiKeys, provider, systemPrompt)
   - Base method for all AI interactions
   - Handles both OpenAI and Anthropic APIs
   - Model configuration: GPT-4-turbo-preview, Claude-3-sonnet
   - Parameters: 4000 max tokens, 0.7 temperature
   - Error handling and provider fallback

##### 2. generateMarketingContent(prompt, contentType, platform, urlAnalysis, apiKeys, provider)
   - Specialized marketing content generation
   - Platform-specific optimization (social media, blogs, ads)
   - URL analysis integration for context
   - Hashtag and CTA inclusion
   - SEO optimization considerations

##### 3. generateEmailContent(prompt, emailType, brandInfo, urlAnalysis, apiKeys, provider)
   - Email campaign generation with structured output
   - Returns: subject line, plain text content, HTML version
   - Mobile-responsive HTML templates
   - Brand consistency integration
   - CTA optimization and placement

##### 4. generatePersona(description, apiKeys, provider)
   - Customer persona creation from descriptions
   - Structured JSON output with predefined fields
   - Demographic and psychographic data
   - Goals, pain points, and solutions mapping
   - Behavioral characteristics and preferences

##### 5. chatResponse(message, context, apiKeys, provider)
   - Interactive AI assistant functionality
   - Context-aware responses
   - Marketing-focused assistance
   - Conversation continuity

#### Error Handling:
- API key validation per provider
- Model availability checking
- Graceful degradation with fallback responses
- Detailed error logging

#### URL Analyzer (src/services/urlAnalyzer.ts)
**Purpose:** Extract comprehensive information from web URLs
#### Core Functionality:
##### 1. analyzeUrl(url): Promise<UrlAnalysisResult>
   - HTTP request with proper user agent
   - DOM parsing with Cheerio
   - Content extraction and cleaning
   - Metadata analysis
   - SEO data extraction

#### Extraction Components:
##### 1. Title Extraction:
   - Priority: <title> tag → OpenGraph title → First <h1> → "Untitled"
   - Text cleaning and trimming

##### 2. Description Extraction:
   - Meta description → OpenGraph description → First paragraph text
   - 200 character limit for fallback

##### 3. Content Extraction:
   - Intelligent content selector priority:
      - article tags (blog posts, news)
      - .content, .post-content, .entry-content classes
      - main element
      - Fallback to body content
- Text cleaning and whitespace normalization
- 5000 character limit for processing

##### 4. Keyword Extraction:
   - Meta keywords integration
   - Content-based keyword mining
   - Stop word filtering
   - Frequency analysis and ranking
   - Top 20 keyword extraction

##### 5. Brand Color Analysis:
   - CSS color extraction (hex, rgb, rgba)
   - Inline style parsing
   - Top 10 color identification

##### 6. Image Extraction:
   - <img> tag src attribute collection
   - URL resolution with base URL
   - Top 10 image limitation

##### 7. Metadata Extraction:
   - Author information (meta tags, article attributes)
   - Publication dates (OpenGraph, meta tags, time elements)
   - Word count calculation
   - Content statistics

#### Security Considerations:
- 10-second timeout for requests
- User agent spoofing prevention
- URL validation before processing
- Error handling for inaccessible content

### 4. Route Layer
#### Analyze Routes (src/routes/analyze.ts)
**Endpoint:** POST /api/analyze/url

**Purpose:** URL analysis for marketing content creation
#### Request Format:
```typescript
{
  url: string; // Valid HTTP/HTTPS URL
}
```

#### Response Format:
```typescript
{
  success: boolean;
  data: {
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
  };
  message: string;
}
```

#### Validation Logic:
- URL presence validation
- URL format validation using URL constructor
- Error handling for invalid/inaccessible URLs

#### Chat Routes (src/routes/chat.ts)
**Endpoint:** POST /api/chat

**Purpose:** Interactive AI assistant for marketing guidance
#### Request Format:
```typescript
{
  message: string; // User message (required)
  context?: string; // Optional conversation context
  provider?: 'openai' | 'anthropic'; // AI provider selection
}
```

#### Response Format:
```typescript
{
  success: boolean;
  data: {
    response: string; // AI-generated response
  };
  message: string;
}
```

#### Features:
- Context-aware conversations
- Marketing-focused responses
- Provider selection flexibility

#### Content Generation Routes (src/routes/content.ts)
**Endpoint:** POST /api/content/generate

**Purpose:** Marketing content generation for various platforms
#### Request Format:
```typescript
{
  prompt: string; // Content generation prompt
  contentType: string; // Type of content (blog, social, ad)
  platform?: string; // Target platform (facebook, linkedin, twitter)
  tone?: string; // Content tone preference
  provider?: 'openai' | 'anthropic';
  url?: string; // Optional URL for context
}
```

#### Response Format:
```typescript
{
  success: boolean;
  data: {
    content: string; // Generated content
    contentType: string;
    platform: string;
    urlAnalysis?: {
      title: string;
      description: string;
      keywords: string[]; // Top 5 keywords
    };
  };
  message: string;
}
```

#### Content Types Supported:
- Blog posts and articles
- Social media posts
- Advertisement copy
- Product descriptions
- Press releases
- Newsletter content

#### Email Generation Routes (src/routes/email.ts)
**Endpoint:** POST /api/email/generate

**Purpose:** Email campaign creation with HTML templates
#### Request Format:
```typescript
{
  prompt: string; // Email content prompt
  emailType: string; // Type of email campaign
  brandInfo?: string; // Brand information for consistency
  provider?: 'openai' | 'anthropic';
  url?: string; // Optional URL for context
}
```

#### Response Format:
```typescript
{
  success: boolean;
  data: {
    subject: string; // Email subject line
    content: string; // Plain text version
    html: string; // HTML version with styling
    emailType: string;
    urlAnalysis?: {
      title: string;
      description: string;
      brandColors?: string[]; // Top 3 brand colors
    };
  };
  message: string;
}
```

#### Email Types Supported:
- Newsletter campaigns
- Promotional emails
- Welcome sequences
- Product announcements
- Event invitations
- Re-engagement campaigns

#### Persona Generation Routes (src/routes/persona.ts)
**Endpoint:** POST /api/persona/generate

**Purpose:** Customer persona creation for marketing strategy
#### Request Format:
```typescript
{
  description: string; // Persona description
  provider?: 'openai' | 'anthropic';
}
```

#### Response Format:
```typescript
{
  success: boolean;
  data: {
    name: string;
    role: string;
    company: string;
    avatar: string; // Two-letter initials
    age: string;
    location: string;
    income: string;
    education: string;
    goals: string[]; // 4 primary goals
    painPoints: string[]; // 4 main challenges
    solutions: string[]; // 4 preferred solutions
    characteristics: string[]; // 4 key traits
    techComfort: string;
    decisionMaking: string;
    communication: string;
    workStyle: string;
  };
  message: string;
}
```

#### File Upload Routes (src/routes/upload.ts)
**Endpoints:**
- POST /api/upload/image (single file)
- POST /api/upload/images (multiple files)

**Purpose:** Image upload and optimization for marketing materials

#### Configuration:
- Memory storage for processing
- 5MB file size limit (configurable)
- Image format validation
- Automatic WebP conversion
- 1200x1200 max dimensions with aspect ratio preservation

**Single Upload Request:** Multipart form data with image field

**Multiple Upload Request:** Multipart form data with images field (max 10 files)
#### Response Format:
```typescript
{
  success: boolean;
  data: {
    id: string; // UUID identifier
    filename: string; // Generated filename
    url: string; // Relative URL for access
    originalName: string;
    size: number; // Original file size
    mimetype: string; // Always 'image/webp'
  } | Array<FileData>; // Array for multiple uploads
  message: string;
}
```

#### Processing Pipeline:
1. Memory buffer storage
2. Sharp image processing
3. Resize with aspect ratio preservation
4. WebP conversion with 80% quality
5. UUID-based filename generation
6. File system storage

#### API Key Validation Routes (src/routes/validate.ts)
**Endpoints:**
- POST /api/validate/openai
- POST /api/validate/anthropic

**Purpose:** API key validation before usage

#### Request Format:
```typescript
{
  apiKey: string; // API key to validate
}
```

#### Response Format:
```typescript
{
  success: boolean;
  message: string; // Validation result message
}
```

#### Validation Methods:
- OpenAI: Test completion with gpt-3.5-turbo, 5 token limit
- Anthropic: Test message with claude-3-haiku, 5 token limit

#### Error Handling:
- 401: Invalid key or insufficient permissions
- 429: Rate limit exceeded
- 500: Service temporarily unavailable

### 5. Type Definitions (src/types/index.ts)
**Purpose:** Comprehensive TypeScript interfaces for type safety
#### Core Interfaces:
##### 1. ApiKeys: API key container
```typescript
interface ApiKeys {
  openai?: string;
  anthropic?: string;
}
```

##### 2. Request Interfaces: Structured request validation
- AnalyzeUrlRequest
- ChatRequest
- ContentGenerationRequest
- PersonaGenerationRequest
- EmailGenerationRequest

##### 3. Response Interfaces: Consistent response structure
- UrlAnalysisResult: Complete URL analysis data
- PersonaData: Structured persona information
- ApiResponse<T>: Generic API response wrapper

##### 4. Data Models: Business logic representations
- Metadata structures
- Content generation parameters
- File upload responses

### 6. Utility Layer (src/utils/apiClient.ts)
**Purpose:** Frontend integration utility class
#### Key Features:
- Local storage API key management
- Request header automation
- Consistent error handling
- Method wrappers for all API endpoints

#### Core Methods:
- analyzeUrl(url): URL analysis wrapper
- chat(message, context, provider): Chat interaction
- generateContent(...): Content generation
- generateEmail(...): Email campaign creation
- generatePersona(description, provider): Persona generation
- validateApiKey(provider, apiKey): Key validation
- uploadImage(file): Single file upload
- uploadImages(files): Multiple file upload

**Usage Pattern:** Frontend instantiates ApiClient and uses methods directly

## Configuration Management
### Environment Variables (.env.example)
#### Server Configuration:
- PORT=3001: Server listening port
- NODE_ENV=development: Environment mode
- FRONTEND_URL=http://localhost:5173: CORS origin URL

#### Rate Limiting:
- RATE_LIMIT_WINDOW_MS=900000: 15-minute window
- RATE_LIMIT_MAX_REQUESTS=100: Request limit per window

#### File Upload:
- MAX_FILE_SIZE=5242880: 5MB upload limit
- UPLOAD_DIR=uploads: Upload directory path

#### API Keys: Provided by users through frontend
- OPENAI_API_KEY: Optional server-side key
- ANTHROPIC_API_KEY: Optional server-side key

### TypeScript Configuration (tsconfig.json)
#### Compilation Settings:
- Target: ES2020 for modern Node.js compatibility
- Module: CommonJS for Node.js
- Strict mode enabled for type safety
- Source maps and declarations for debugging
- JSON module resolution for configuration files

#### Directory Configuration:
- Source: ./src directory
- Output: ./dist directory
- Excludes: node_modules, dist

## Development Workflow
### Scripts (package.json)
1. npm run dev: Development server with hot reload using tsx
2. npm run build: TypeScript compilation to JavaScript
3. npm start: Production server from compiled files
4. npm test: Jest test runner (configured but no tests implemented)

### Development Features
- Hot Reload: tsx watch mode for instant development feedback
- Type Checking: Real-time TypeScript validation
- Error Handling: Detailed stack traces in development mode
- Logging: Console-based logging with request tracking

## Security Implementation
### Security Measures
1. Helmet Middleware: Security headers for XSS, clickjacking protection
2. CORS Configuration: Specific origin allowance with credentials
3. Rate Limiting: IP-based request throttling
4. Input Validation: Request body validation and sanitization
5. File Upload Security: Type validation, size limits, extension checking
6. API Key Protection: Header-based authentication with validation

### Security Headers Applied
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Cross-Origin Resource Policy

## Error Handling Strategy
### Consistent Error Format
```typescript
{
  success: false;
  error: string; // Human-readable error message
  retryAfter?: number; // For rate limiting errors
  stack?: string; // Development mode only
}
```

### Error Categories
1. Validation Errors (400): Invalid request format or parameters
2. Authentication Errors (401): Missing or invalid API keys
3. Rate Limiting (429): Too many requests with retry information
4. Server Errors (500): Internal processing failures
5. Not Found (404): Invalid endpoints

### Error Logging
- Console-based logging for development
- Error stack traces in development mode
- Production-safe error messages
- Request context preservation

## API Integration Details
### OpenAI Integration
#### Models Used:
- Primary: gpt-4-turbo-preview for content generation
- Validation: gpt-3.5-turbo for key testing

#### Configuration:
- Max tokens: 4000 for comprehensive responses
- Temperature: 0.7 for creative but controlled output
- Role-based prompting with system messages

### Anthropic Integration
#### Models Used:
- Primary: claude-3-sonnet-20240229 for content generation
- Validation: claude-3-haiku-20240307 for key testing

#### Configuration:
- Max tokens: 4000 matching OpenAI limits
- Temperature: 0.7 for consistency
- System prompts for context setting

### AI Prompt Engineering
- System Prompts: Role-specific instructions for consistent output
- Context Integration: URL analysis data incorporation
- Output Formatting: JSON structure enforcement for structured data
- Error Recovery: Fallback responses for parsing failures

## File Management System
### Upload Processing Pipeline
1. Reception: Multer memory storage for immediate processing
2. Validation: File type and size checking
3. Processing: Sharp-based optimization and format conversion
4. Storage: File system storage with UUID naming
5. Response: URL generation for frontend access

### Image Optimization
- Format: Automatic WebP conversion for optimal compression
- Dimensions: 1200x1200 maximum with aspect ratio preservation
- Quality: 80% WebP quality for balance of size and quality
- Performance: Memory-based processing for speed

### File Serving
- Static Middleware: Express static serving from /uploads
- URL Format: /uploads/{uuid}.webp
- Security: No directory traversal protection needed (UUID naming)

## Performance Considerations
### Memory Management
- Image Processing: Memory-based processing for speed
- Rate Limiting: Memory storage (consider Redis for scaling)
- Content Processing: 5000 character limits for URL content

### Scalability Factors
1. Rate Limiting: Memory-based (single instance only)
2. File Storage: Local filesystem (not cloud-scalable)
3. Session Management: Stateless design for horizontal scaling
4. Database: No database dependency (stateless)

## Production Deployment Considerations
### Environment Setup
1. NODE_ENV=production: Production mode configuration
2. Process Management: PM2 or similar for process monitoring
3. Reverse Proxy: nginx for SSL termination and load balancing
4. File Storage: Cloud storage migration (S3, Cloudinary)
5. Rate Limiting: Redis-based for multi-instance support

### Monitoring Requirements
1. Health Checks: /health endpoint for load balancer monitoring
2. Logging: Structured logging implementation (Winston, Pino)
3. Error Tracking: Service integration (Sentry, Bugsnag)
4. Performance Monitoring: APM tools for request tracking

### Security Hardening
1. API Keys: Environment variable management
2. HTTPS: SSL certificate configuration
3. CORS: Production domain configuration
4. Rate Limiting: More restrictive limits for production
5. Input Validation: Enhanced validation for production data

## Integration Capabilities
The backend is designed for easy integration with:
- Frontend applications (React, Vue, Angular)
- Mobile applications via REST API
- Third-party marketing tools
- Webhook systems for automation
- Analytics platforms for tracking

This architecture provides a solid foundation for a comprehensive marketing automation platform with room for significant expansion and enhancement.

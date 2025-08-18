# MarAI Backend Server Files - Complete Developer Guide

- **Overview:** MarAI is a comprehensive marketing automation platform backend built with Node.js, TypeScript, and PostgreSQL. It features Claude AI-powered content generation, user authentication, and client management capabilities following a "Claude-first" architecture.
- **Purpose:** Comprehensive guide to MarAI's backend server architecture and implementation
- **Target Audience:** Backend developers, DevOps engineers, and system architects

## Key Features:
- AI Content Generation: Direct Claude API integration for marketing content creation
- Client Management: Complete business client lifecycle management
- User Authentication: JWT-based auth with email verification
- Content Storage: Database-backed content management with analytics
- Rate Limiting: Memory-based request limiting for API protection
- Email Services: SMTP-based notification system

## Backend Structure Overview
<pre>server/ (Backend Root)
│   .env
│   .env.example
│   .gitignore
│   package-lock.json
│   package.json
│   README.md
│   tsconfig.json
│
└───src
    │   index.ts
    │
    ├───config
    │       database.ts
    │
    ├───middleware
    │       auth.ts
    │       authMiddleware.ts
    │       rateLimiter.ts
    │
    ├───migrations
    │       001_create_users_table.sql
    │       002_create_tokens_table.sql
    │       003_add_user_profile_fields.sql
    │       004_create_email_verifications_table.sql
    │       005_create_password_resets_table.sql
    │       006_create_saved_assets_table.sql
    │       007_create_clients_table.sql
    │       008_create_client_content_table.sql
    │
    ├───models
    │       Client.ts
    │       ClientContent.ts
    │       EmailVerification.ts
    │       SavedAsset.ts
    │       Token.ts
    │       User.ts
    │
    ├───routes
    │       auth.ts
    │       clients.ts
    │       generate.ts
    │       savedAssets.ts
    │       validate.ts
    │
    ├───services
    │       aiService.ts
    │       clientService.ts
    │       emailService.ts
    │       tokenService.ts
    │
    └───types
            index.ts</pre>

## 🏗️ Architecture Philosophy
### Pure Claude Passthrough Design
The MarAI backend follows a "Claude-first" architecture:
- Direct Integration: No intermediary AI services, direct Claude API communication
- Minimal Processing: Clean user input → Claude → clean output
- Conversation Aware: Full conversation history support with intelligent token management
- Enhanced Logging: Comprehensive request/response monitoring with user context
- Backward Compatible: Legacy single-prompt requests automatically converted
- Client Management: Complete business client lifecycle with content association
- Content Analytics: Real metrics tracking with database-backed insights  
- Business Intelligence: Advanced analytics for client engagement patterns
  
### Key Architectural Decisions
- TypeScript First: Full type safety across all components
- Express.js Framework: Battle-tested, lightweight web framework
- Memory-Based Rate Limiting: Fast, distributed-ready request limiting
- Conversation State Management: Stateless but conversation-aware processing
- Enhanced Error Handling: Detailed error context and recovery strategies

## Package Configuration (package.json)
### Core Dependencies
- Framework: Express.js 4.18.2 with TypeScript
- AI Integration: @anthropic-ai/sdk ^0.56.0 (Claude API)
- Database: PostgreSQL with pg ^8.16.3
- Authentication: bcrypt ^5.1.1 for password hashing
- Email Service: nodemailer ^7.0.5
- Security: helmet ^7.1.0, cors ^2.8.5
- Rate Limiting: rate-limiter-flexible ^7.1.1

### Development Tools
- Runtime: tsx ^4.6.0 for development
- Testing: Jest ^29.7.0
- TypeScript: ^5.3.2

### Scripts
```json
{
  "dev": "tsx watch src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "migrate": "node scripts/migrate.js",
  "db:setup": "node scripts/setup-db.js"
}
```

### Engine Requirements
- Node.js >=18.0.0
- npm >=8.0.0

## API Features (README.md)
### Core Endpoints
- URL Analysis: POST /api/analyze/url - Website content extraction
- AI Chat: POST /api/chat - Claude AI conversation
- Content Generation: POST /api/content/generate - Marketing content creation
- Email Generation: POST /api/email/generate - Email campaign creation
- Persona Generation: POST /api/persona/generate - Customer personas
- File Upload: POST /api/upload/image, POST /api/upload/images
- API Validation: POST /api/validate/anthropic - Claude API key validation

### Authentication System
- Claude API key authentication via X-API-Keys header
- JSON format: {'anthropic': 'your-anthropic-key'}

### Security Features
- Rate limiting: 100 requests per 15 minutes per IP
- File upload restrictions: 5MB max, images only
- CORS protection with configurable origins
- Helmet.js security headers

## TypeScript Configuration (tsconfig.json)
### Build Settings
```json
{
  "target": "ES2020",
  "module": "commonjs",
  "outDir": "./dist",
  "rootDir": "./src",
  "strict": true,
  "esModuleInterop": true
}
```

## Environment Configuration (.env files)
### Database Configuration
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=marai_db
DB_USER=postgres
DB_PASSWORD=postgres123
DB_MAX_CONNECTIONS=10
DB_CONNECTION_TIMEOUT=5000
```

### Email Service (SMTP)
```env
SMTP_USER=akddme@gmail.com
SMTP_APP_PASSWORD=app_password
SMTP_FROM_EMAIL=akddme@gmail.com
SMTP_FROM_NAME=MarAI Team
```

### Authentication & Security
```env
TOKEN_EXPIRY_HOURS=24
MAX_TOKENS_PER_USER=10
MIN_PASSWORD_LENGTH=8
VERIFICATION_CODE_EXPIRY_MINUTES=15
RESET_CODE_EXPIRY_MINUTES=10
```

### Rate Limiting
```env
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
API_KEY_RATE_LIMIT=500
USER_RATE_LIMIT_MAX_REQUESTS=200
```

### Feature Flags
```env
FEATURE_EMAIL_VERIFICATION=true
FEATURE_PASSWORD_RESET=true
FEATURE_PROFILE_MANAGEMENT=true
FEATURE_ADVANCED_SECURITY=true
```

## Server Architecture (index.ts)
### Core Imports & Setup
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimitMiddleware } from './middleware/rateLimiter';
import { initializeDatabase, dbManager } from './config/database';
```

### Route Structure
```typescript
app.use('/api/auth', authRoutes);              // Authentication
app.use('/api/generate', generateRoutes);      // AI content generation
app.use('/api/validate', validateRoutes);      // API key validation
app.use('/api/saved-assets', savedAssetsRoutes); // Asset management
app.use('/api/clients', clientRoutes);         // Client management
```

### Health Check Implementation
```typescript
app.get('/health', async (req, res) => {
  const dbHealth = await dbManager.healthCheck();
  const poolStats = dbManager.getPoolStats();
  // Returns comprehensive system status
});
```

### Error Handling
- Global error handler with request context logging
- Enhanced error responses for development/production
- 404 handler with available endpoints listing

### Server Features
- Database health monitoring
- Graceful shutdown handling (SIGTERM, SIGINT)
- Connection pool statistics
- Feature flag reporting

## Type System (index.ts types)
### User Management
```typescript
interface User {
  id: number;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  profession?: string;
  country?: string;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

interface PublicUser {
  // User without sensitive fields
}
```

### Client Management System
```typescript
interface Client {
  id: number;
  user_id: number;
  company_name: string;
  industry?: string;
  website?: string;
  contact_name?: string;
  contact_email?: string;
  target_audience?: string;
  budget_range?: string;
  goals?: string[];
  brand_colors?: Record<string, any>;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
```

### Content Management
```typescript
interface ClientContent {
  id: number;
  client_id: number;
  content_type: ContentType;
  title: string;
  content: string;
  metadata: Record<string, any>;
  tags?: string[];
  status: 'active' | 'archived' | 'draft' | 'deleted';
  ai_provider: string;
  ai_model?: string;
  token_count?: number;
  generation_time_ms?: number;
  created_at: Date;
}
```

### Content Types
```typescript
const VALID_CONTENT_TYPES = [
  'email', 'newsletter', 'promotional', 'welcome',
  'landing_page', 'saas_landing', 'ecommerce_landing',
  'persona', 'buyer_persona', 'social_calendar',
  'marketing_calendar', 'content_creator', 'blog_post',
  'prompt_library', 'other'
] as const;
```

### Authentication Types
```typescript
interface AuthResponse {
  token: string;
  expiresAt: Date;
  user: PublicUser;
}

interface TokenValidationResult {
  isValid: boolean;
  user?: PublicUser;
  error?: string;
}
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

type AssetType = 'marketing' | 'social' | 'email' | 'email-built' | 
                'landing' | 'persona' | 'content';
```

### API Request/Response Types
```typescript
interface GenerateRequest {
  prompt: string;
}

interface EnhancedGenerateRequest {
  prompt?: string;
  conversationHistory?: ConversationMessage[];
  client_id?: number;
  content_type?: ContentType;
  title?: string;
  metadata?: Record<string, any>;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  user?: PublicUser;
  timestamp?: string;
}
```

### Error Handling Types
```typescript
type AuthErrorCode = 
  | 'MISSING_AUTH_HEADER' | 'INVALID_TOKEN' | 'USER_NOT_FOUND'
  | 'EMAIL_NOT_VERIFIED' | 'CLIENT_NOT_FOUND' | 'ASSET_NOT_FOUND'
  | 'RATE_LIMITED' | 'INVALID_CONTENT_TYPE';

interface ErrorResponse {
  success: false;
  error: string;
  code?: AuthErrorCode;
  timestamp?: string;
  details?: any;
}
```

### Validation & Utility Types
```typescript
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
```

## Git Configuration (.gitignore)
### Excluded Files
- node_modules/, dist/, build/
- .env* files (all environment configurations)
- uploads/ directory (user uploaded files)
- IDE files (.vscode/, .idea/)
- OS files (.DS_Store, Thumbs.db)
- Log files (logs, *.log)

### Key Technical Architecture Points
#### Database Integration
- PostgreSQL with connection pooling
- Health check monitoring with pool statistics
- Migration system with version tracking

#### Authentication System
- Token-based authentication with expiry
- Email verification workflow
- Password reset functionality
- User profile management with completion tracking

#### Client Management
- Multi-tenant client association
- Content-client relationship tracking
- Client statistics and dashboard data
- Budget range and industry categorization

#### Content Generation
- Claude AI integration with conversation history
- Content type categorization and metadata
- Token usage tracking and generation time monitoring
- Template and platform association

#### Rate Limiting & Security
- IP-based and user-based rate limiting
- API key validation for external services
- File upload restrictions and validation
- CORS and security header configuration

#### Asset Management
- User-specific saved assets with type categorization
- Asset reuse functionality across tools
- Storage limits and cleanup procedures

#### Error Handling
- Comprehensive error code system
- Request context logging
- Graceful degradation for database failures
- Enhanced development vs production error responses

## Database Configuration (database.ts)
### Core Database Setup
```typescript
interface DatabaseConfig extends PoolConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export const db = new Pool(config);
export const dbManager = new DatabaseManager(db);
```

### Key Features
- PostgreSQL connection pooling with configurable min/max connections
- SSL configuration for production environments
- Environment-based configuration with fallbacks
- Connection health monitoring with automatic reconnection
- Graceful shutdown handling on SIGINT/SIGTERM

### Database Manager Methods
```typescript
class DatabaseManager {
  async testConnection(): Promise<boolean>
  async healthCheck(): Promise<{status: 'healthy'|'unhealthy', responseTime: number}>
  getPoolStats(): {totalCount, idleCount, waitingCount}
  async close(): Promise<void>
}
```

### Required Environment Variables
- DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
- DB_MAX_CONNECTIONS, DB_MIN_CONNECTIONS
- DB_IDLE_TIMEOUT, DB_CONNECTION_TIMEOUT

## Authentication System (auth.ts)
### Enhanced Request Interface
```typescript
interface AuthenticatedRequest extends Request {
  apiKeys: ApiKeys;
  user?: PublicUser;
  tokenId?: number;
  isAuthenticated: boolean;
}
```

### Core Middleware Functions
```typescript
export const validateApiKeys = async (req, res, next) => {
  // Validates Claude API keys (required)
  // Optionally validates user authentication token
  // Supports Settings page format: { anthropic: { value: 'sk-...' } }
}

export const requireAuthenticatedUser = async (req, res, next) => {
  // Requires both Claude API key AND user authentication
}
```

### Key Features
- Dual authentication: Claude API keys + optional user tokens
- Settings page compatibility: Handles both direct strings and object formats
- Legacy support: Backward compatibility for 'claude' key name
- Rate limiting integration: User-based or IP-based keys
- Enhanced logging with request tracking

### Helper Functions
```typescript
export const getUserId = (req: Request): number | null
export const getUserEmail = (req: Request): string | null
export const hasAuthenticatedUser = (req: Request): boolean
export const getRateLimitKey = (req: Request): string
```

## User Authentication Middleware (authMiddleware.ts)
### Core Authentication Flow
```typescript
interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    created_at: Date;
    updated_at: Date;
  };
  tokenId: number;
}

export const authenticateUser = async (req, res, next) => {
  // Validates Bearer token
  // Attaches user info to request
  // Handles token cleanup for orphaned tokens
}

export const optionalAuth = async (req, res, next) => {
  // Non-blocking authentication
  // Continues even if token is invalid
}
```

### Authentication States
- Required Auth: authenticateUser + requireAuth
- Optional Auth: optionalAuth (never blocks requests)
- Rate Limiting: User-based vs IP-based keys

## Rate Limiting (rateLimiter.ts)
### Memory-Based Rate Limiter
```typescript
const rateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => req.ip,
  points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') / 1000
});
```

### Configuration
- Default: 100 requests per 15 minutes per IP
- Environment Variables: RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS
- Response: 429 status with Retry-After header

## AI Service (aiService.ts)
### Core AI Service Class
```typescript
export class AIService {
  async generate(
    conversationHistory: ConversationMessage[],
    apiKeys: ApiKeys,
    systemPrompt?: string
  ): Promise<string>

  async generateFromPrompt(
    prompt: string,
    apiKeys: ApiKeys,
    systemPrompt?: string
  ): Promise<string>
}
```

### Claude API Configuration
- Model: claude-sonnet-4-20250514
- Max Tokens: 20,000
- Temperature: 0.7
- Full conversation history support with automatic trimming

### Key Features
```typescript
interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Utility methods
estimateConversationTokens(conversationHistory): number
trimConversationHistory(conversationHistory, maxTokens): ConversationMessage[]
addMessageToConversation(history, role, content): ConversationMessage[]
```

### Response Processing
- Markdown cleanup: Removes code blocks and formatting
- Token estimation: ~4 characters per token
- Legacy support: Single prompt conversion to conversation format

## Client Service (clientService.ts)
### Core Service Structure
```typescript
interface ClientWithMetrics extends Client {
  content_count: number;
  recent_content_count: number;
  last_activity: Date;
  content_breakdown: {
    email_count: number;
    landing_page_count: number;
    persona_count: number;
    calendar_count: number;
    other_count: number;
  };
}

interface DashboardData {
  clientCount: number;
  totalContent: number;
  contentThisWeek: number;
  contentThisMonth: number;
  mostActiveClient?: string;
  mostUsedContentType?: string;
  recentClients: ClientSummary[];
  contentActivity: Array<{date: string, content_count: number}>;
  topClients: Array<{client_id, company_name, content_count, last_activity}>;
}
```

### Key Methods
```typescript
class ClientService {
  async createClientWithValidation(userId, clientData): Promise<Client>
  async getClientWithMetrics(clientId, userId): Promise<ClientWithMetrics>
  async getDashboardData(userId): Promise<DashboardData>
  async storeGeneratedContent(context, title, content): Promise<ClientContent>
  async getOrganizedClientContent(clientId, userId, filters)
  async searchClientsWithContext(userId, searchTerm, options)
  async exportClientData(clientId, userId)
  async getContentRecommendations(clientId, userId)
}
```

### Content Storage Context
```typescript
interface ContentCreationContext {
  client_id: number;
  user_id: number;
  content_type: string;
  ai_metadata: {
    provider: string;
    model?: string;
    token_count?: number;
    generation_time_ms?: number;
    conversation_history?: any;
  };
  template_context?: {
    template_used?: string;
    platform?: string;
    category?: string;
  };
}
```

### Business Rules
- Client limit validation (configurable via MAX_CLIENTS_PER_USER)
- Industry validation with predefined list
- Content organization by type, date, status
- Smart recommendations based on content gaps

## Email Service (emailService.ts)
### Core Email Service
```typescript
class EmailService {
  async sendVerificationEmail(data: VerificationEmailData): Promise<EmailSendResult>
  async sendPasswordResetEmail(data: PasswordResetEmailData): Promise<EmailSendResult>
  async sendWelcomeEmail(data: WelcomeEmailData): Promise<EmailSendResult>
}

interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  rateLimited?: boolean;
}
```

### Email Types & Templates
- Verification Email: 6-digit code, 1-hour expiry
- Password Reset: 6-digit code, 10-minute expiry
- Welcome Email: Feature overview, getting started guide

### Rate Limiting
- Verification: Max 3 emails per hour per address
- Password Reset: Max 2 emails per 30 minutes per address
- Database logging: All attempts logged in email_logs table

### SMTP Configuration
```typescript
// Gmail SMTP with App Password
service: 'gmail'
auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_APP_PASSWORD }
```

### Required Environment Variables
- SMTP_USER, SMTP_APP_PASSWORD
- SMTP_FROM_EMAIL, SMTP_FROM_NAME
- FRONTEND_URL (for email links)

## Token Service (tokenService.ts)
### Core Token Management
```typescript
export class TokenService {
  async generateAuthToken(options: TokenGenerationOptions): Promise<string>
  async validateAuthToken(token: string): Promise<TokenInfo>
  async revokeToken(token: string): Promise<boolean>
  async revokeAllUserTokens(userId: number): Promise<boolean>
  async extendTokenExpiration(token: string, additionalHours): Promise<boolean>
}

interface TokenInfo {
  isValid: boolean;
  userId?: number;
  tokenId?: number;
  userEmail?: string;
  expiresAt?: Date;
  createdAt?: Date;
}
```

### Token Configuration
- Default expiry: 24 hours
- Max tokens per user: 10
- Token format: 64-character hex string
- Automatic cleanup of expired tokens

### Security Features
```typescript
// Token validation
isValidTokenFormat(token: string): boolean  // /^[a-f0-9]{64}$/i
extractTokenFromHeader(authHeader: string): string | null
isTokenExpiringSoon(token: string): Promise<boolean>

// Maintenance
async performTokenMaintenance(): Promise<void>
async cleanupOldUserTokens(userId: number): Promise<void>
```

### Business Logic
- Orphaned token cleanup: Removes tokens for deleted users
- User token limits: Prevents token spam
- Device tracking: Optional device info logging
- System statistics: Token usage analytics

## Environment Variables Summary
### Database
- DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
- DB_MAX_CONNECTIONS, DB_MIN_CONNECTIONS
- DB_IDLE_TIMEOUT, DB_CONNECTION_TIMEOUT

### Authentication & Security
- RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS
- MAX_CLIENTS_PER_USER

### Email Service
- SMTP_USER, SMTP_APP_PASSWORD
- SMTP_FROM_EMAIL, SMTP_FROM_NAME
- FRONTEND_URL

### Runtime
- NODE_ENV (affects SSL and error reporting)

## Key Architecture Patterns
### Request Flow
1. Rate Limiting → Authentication → Business Logic
2. Dual Auth System: API keys (required) + User tokens (optional)
3. Error Handling: Consistent API response format with error codes
4. Logging: Request tracking with unique IDs

### Data Relationships
- Users → Tokens (1:many, max 10)
- Users → Clients (1:many, configurable limit)
- Clients → ClientContent (1:many)
- Email Logs → Rate limiting and audit trail

### Service Dependencies
- Database: PostgreSQL with connection pooling
- AI: Claude Sonnet 4 via Anthropic SDK
- Email: Gmail SMTP with App Passwords
- Rate Limiting: In-memory store (rate-limiter-flexible)

## 001: Users Table (Authentication Core)
Table: users
- Purpose: Core user authentication and profile storage

### Key Columns:
- id - SERIAL PRIMARY KEY
- email - VARCHAR(255) NOT NULL UNIQUE (login identifier)
- password_hash - VARCHAR(255) NOT NULL (bcrypt, 60 chars)
- created_at, updated_at - TIMESTAMP WITH TIME ZONE

### Critical Constraints:
- Email format validation: ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
- Email length: 5-255 characters
- Password hash length: minimum 60 characters (bcrypt requirement)

### Key Features:
- Automatic updated_at trigger using update_updated_at_column() function
- Indexes on email, created_at, updated_at
- Optional admin user seed data (commented out)

### Important Function:
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';
```

## 002: Tokens Table (Session Management)
Table: tokens
- Purpose: Authentication token storage with automatic cleanup and user limits

### Key Columns:
- id - SERIAL PRIMARY KEY
- user_id - INTEGER NOT NULL (FK to users)
- token_hash - VARCHAR(64) NOT NULL UNIQUE (SHA-256 hash)
- expires_at - TIMESTAMP WITH TIME ZONE NOT NULL

### Critical Constraints:
- Token hash format: 64 hexadecimal characters ~* '^[a-f0-9]{64}$'
- Expiry must be future: expires_at > created_at
- Maximum 1 year expiry: expires_at < created_at + INTERVAL '1 year'
- CASCADE delete when user deleted

### Key Features:
- Token Limit Enforcement: Maximum 10 tokens per user (removes oldest when limit reached)
- Automatic Cleanup: cleanup_expired_tokens() function
- Active Tokens View: Shows only non-expired tokens with user info
- Composite Indexes: Optimized for user+expiry queries

### Important Functions:
```sql
-- Enforces 10 token limit per user
CREATE OR REPLACE FUNCTION enforce_token_limit()
RETURNS TRIGGER AS $$
DECLARE
    max_tokens_per_user INTEGER := 10;
BEGIN
    -- Removes oldest token if limit exceeded
END;
$$

-- Statistics and monitoring
CREATE OR REPLACE VIEW token_stats AS
SELECT 
    COUNT(*) as total_tokens,
    COUNT(*) FILTER (WHERE expires_at > NOW()) as active_tokens,
    COUNT(*) FILTER (WHERE expires_at <= NOW()) as expired_tokens
FROM tokens;
```

## 003: User Profile Extension
Extended users Table
- Purpose: Additional profile information and email verification status

### New Columns Added:
- first_name - VARCHAR(100) (optional, 2-50 chars, letters only)
- last_name - VARCHAR(100) (optional, 2-50 chars, letters only)
- profession - VARCHAR(150) (optional, 2-100 chars)
- country - VARCHAR(100) (optional, 2-50 chars)
- email_verified - BOOLEAN DEFAULT FALSE NOT NULL

### Validation Constraints:
- Name format: ~* '^[a-zA-Z\s\-\'\.]+$' (letters, spaces, hyphens, apostrophes)
- No empty strings allowed (NULL or valid content only)
- Length validations for all fields

### Key Views:
```sql
-- User profiles without sensitive data
CREATE OR REPLACE VIEW user_profiles AS
SELECT 
    id, email, first_name, last_name, profession, country, email_verified,
    -- Computed full name with fallbacks
    CASE 
        WHEN first_name IS NOT NULL AND last_name IS NOT NULL 
        THEN CONCAT(first_name, ' ', last_name)
        ELSE first_name OR last_name OR NULL
    END as full_name,
    -- Profile completion percentage (20% per field)
    ROUND((CASE WHEN first_name IS NOT NULL THEN 20 ELSE 0 END +
           CASE WHEN last_name IS NOT NULL THEN 20 ELSE 0 END +
           CASE WHEN profession IS NOT NULL THEN 30 ELSE 0 END +
           CASE WHEN country IS NOT NULL THEN 30 ELSE 0 END), 0
    ) as profile_completion_percentage
FROM users;
```

### Utility Functions:
- get_user_display_name(user_id) - Returns name with email fallback
- get_user_initials(user_id) - Returns initials for avatars

## 004: Email Verification System
Table: email_verifications
- Purpose: Email verification codes with rate limiting and attempt tracking

### Key Columns:
- user_id - INTEGER NOT NULL (FK to users, CASCADE delete)
- verification_code_hash - VARCHAR(64) NOT NULL (SHA-256 of 6-digit code)
- expires_at - TIMESTAMP (typically 15 minutes from creation)
- attempts - INTEGER (0-10 allowed attempts)
- verified_at - TIMESTAMP (NULL until verified)

### Rate Limiting:
- Maximum 3 requests per hour per user
- Minimum 1 minute between requests
- Expires within 24 hours max

- Table: email_logs
- Purpose: Audit trail of all email sending attempts
### Key Columns:
- recipient_email, email_type, delivery_status, message_id, error_message
- Email types: 'verification', 'password_reset', 'welcome', 'notification'
- Delivery status: 'sent', 'failed', 'bounced', 'delivered'

### Critical Functions:
```sql
-- Rate limiting check
CREATE OR REPLACE FUNCTION can_request_verification(p_user_id INTEGER)
RETURNS BOOLEAN AS $$
-- Checks hourly limits and minimum time between requests

-- Auto-update user.email_verified on successful verification
CREATE TRIGGER trigger_update_user_email_verified
    AFTER UPDATE ON email_verifications
    EXECUTE FUNCTION update_user_email_verified();
```

- Reference Table: professions - Common profession options for UI dropdowns

## 005: Password Reset System
Table: password_resets
- Purpose: Secure password reset with comprehensive security tracking
### Key Columns:
- user_id - INTEGER NOT NULL (FK to users)
- reset_code_hash - VARCHAR(64) NOT NULL (SHA-256 of 6-digit code)
- expires_at - TIMESTAMP (typically 10 minutes, max 2 hours)
- attempts - INTEGER (0-5 allowed attempts)
- used_at - TIMESTAMP (NULL until used)
- ip_address - INET (security tracking)
- user_agent - TEXT (browser fingerprinting)

- Table: password_reset_attempts
- Purpose: Security audit log of all reset attempts
### Key Columns:
- email, ip_address, success, error_type, attempted_at
- Error types: 'user_not_found', 'rate_limited', 'invalid_code', 'expired_code', 'max_attempts', 'system_error'

### Security Features:
```sql
-- Comprehensive rate limiting with IP tracking
CREATE OR REPLACE FUNCTION can_request_password_reset(p_user_id INTEGER, p_ip_address INET)
RETURNS TABLE(allowed BOOLEAN, reason TEXT, wait_minutes INTEGER) AS $$
-- User limits: 2 requests per 30 minutes, 5 minutes between requests
-- IP limits: 5 requests per hour, blocks suspicious IPs with 10+ failures in 24h

-- Auto-invalidate all user tokens on successful reset
CREATE TRIGGER trigger_invalidate_tokens_on_password_reset
    AFTER UPDATE ON password_resets
    EXECUTE FUNCTION invalidate_tokens_on_password_reset();
```

### Security Monitoring:
- password_reset_security_summary view tracks suspicious IP activity
- get_user_security_summary(user_id) function provides account security overview

## 006: Saved Assets System
Table: saved_assets
- Purpose: User's personal content library with 100-item limit
### Key Columns:
- user_id - INTEGER NOT NULL (FK to users, CASCADE delete)
- asset_type - VARCHAR(20) NOT NULL
- title - VARCHAR(255) NOT NULL (1-255 chars)
- content - TEXT NOT NULL (minimum 1 char)
- metadata - JSONB DEFAULT '{}'

- Asset Types: 'marketing', 'social', 'email', 'email-built', 'landing', 'persona', 'content'

### Key Features:
```sql
-- Enforces 100-item limit per user
CREATE OR REPLACE FUNCTION enforce_saved_assets_limit()
RETURNS TRIGGER AS $$
-- Raises exception when user tries to exceed 100 saved assets

-- Utility functions
get_user_assets_count(user_id, asset_type_filter)
cleanup_old_user_assets(user_id, keep_count DEFAULT 95)
```

### Analytics Views:
- saved_assets_stats - Asset counts by type
- user_assets_summary - Per-user breakdown with timestamps

## 007: Client Management System
Table: clients
- Purpose: Client information storage for service providers
### Key Columns:
- user_id - INTEGER NOT NULL (FK to users)
- company_name - VARCHAR(255) NOT NULL
- industry - VARCHAR(100), website - VARCHAR(500)
- contact_name, contact_email, contact_phone, contact_role
- target_audience - TEXT, budget_range - VARCHAR(50)
- goals - TEXT[], brand_colors - JSONB
- is_active - BOOLEAN DEFAULT TRUE

### Business Rules:
- Unique constraint: (user_id, company_name)
- Budget ranges: '0-10k', '10k-50k', '50k-100k', '100k+', 'custom'
- Website must start with http/https
- Email format validation for contact_email

### Key Functions:
```sql
-- Client management
validate_client_ownership(client_id, user_id) -- Security check
soft_delete_client(client_id, user_id) -- Marks inactive, preserves content
restore_client(client_id, user_id) -- Reactivates deleted client
get_user_clients_count(user_id) -- Active clients count
```

### Analytics Views:
- client_summary - Active clients with content counts
- client_content_analytics - Content breakdown per client

## 008: Client Content Management
Table: client_content
- Purpose: AI-generated content storage linked to clients
### Key Columns:
- client_id - INTEGER NOT NULL (FK to clients, CASCADE delete)
- content_type - VARCHAR(50) NOT NULL
- title - VARCHAR(500) NOT NULL (3-500 chars)
- content - TEXT NOT NULL (minimum 10 chars)
- metadata - JSONB DEFAULT '{}', tags - TEXT[]
- status - VARCHAR(20) DEFAULT 'active' ('active', 'archived', 'draft', 'deleted')
- version - INTEGER DEFAULT 1, parent_content_id - INTEGER (for versioning)
- ai_provider - VARCHAR(50) DEFAULT 'claude'
- ai_model, token_count, generation_time_ms
- is_favorite - BOOLEAN DEFAULT FALSE
- last_accessed - TIMESTAMP (auto-updated hourly)

### Content Types:
- Email: 'email', 'newsletter', 'promotional', 'welcome', 'announcement', 'ecommerce_email'
- Landing Pages: 'landing_page', 'saas_landing', 'ecommerce_landing', 'agency_landing', 'portfolio_landing'
- Personas: 'persona', 'buyer_persona', 'customer_persona'
- Calendars: 'social_calendar', 'marketing_calendar', 'email_calendar'
- Content: 'content_creator', 'blog_post', 'social_post', 'case_study', 'whitepaper', 'press_release'
- Prompts: 'prompt_library', 'custom_prompt'

### Advanced Features:
```sql
-- Full-text search across title and content
CREATE INDEX idx_client_content_search ON client_content 
USING gin(to_tsvector('english', title || ' ' || content));

-- Content analytics and management
get_client_content_stats(client_id) -- Detailed statistics
search_user_content(user_id, search_term, content_type_filter) -- Cross-client search
duplicate_content(content_id, new_title, user_id) -- Create variations
bulk_update_content_status(content_ids[], new_status, user_id) -- Batch operations
get_user_content_analytics(user_id) -- Dashboard metrics
```

### Performance Optimizations:
- Composite indexes for common query patterns
- JSONB indexes for metadata queries
- GIN indexes for tags and full-text search
- Partial indexes for favorites and active content

### Key Views:
- active_client_content - All active content with client info
- client_content_summary - Per-client content statistics

## Migration Management
### Migration Log Table: migration_log
- Tracks applied migrations with version, description, and timestamp
- Each migration file logs its completion

### Cleanup Functions:
- cleanup_expired_tokens() - Remove old authentication tokens
- cleanup_expired_verifications() - Clean verification records (7+ days old)
- cleanup_expired_password_resets() - Clean reset records (3+ days old)
- cleanup_old_email_logs() - Clean email audit logs (30+ days old)

### Common Patterns Used:
1. CASCADE DELETE: Child records auto-delete when parent is removed
2. Soft Delete: is_active flags instead of hard deletion
3. Rate Limiting: Time-based request limits with IP tracking
4. Audit Logging: Comprehensive tracking of security events
5. Automatic Timestamps: updated_at triggers on all main tables
6. JSONB Metadata: Flexible additional data storage
7. Full-Text Search: PostgreSQL text search capabilities
8. Partial Indexes: Optimized indexes for filtered queries

## Client.ts - Client Management System
### Core Interface
```typescript
export interface Client {
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
```

### Key Methods
- createClient(): Creates new client with validation (company name min 2 chars, email format, website format, budget range validation)
- findById(): Gets client with ownership validation
- getClientSummaries(): Returns clients with content counts and activity data using LATERAL join
- updateClient(): Dynamic field updates with duplicate checking
- deleteClient(): Soft delete using database function soft_delete_client()
- validateOwnership(): Uses database function validate_client_ownership()

### Validation Rules
- Budget ranges: '0-10k', '10k-50k', '50k-100k', '100k+', 'custom'
- Website must start with http:// or https://
- Email regex validation
- Company name uniqueness per user

### Database Functions Used
- soft_delete_client($1, $2)
- get_client_stats($1)
- validate_client_ownership($1, $2)
- get_user_clients_count($1)
- restore_client($1, $2)

## ClientContent.ts - Content Management System
### Core Interface
```typescript
export interface ClientContent {
  id: number;
  client_id: number;
  content_type: string;
  title: string;
  content: string;
  metadata: Record<string, any>;
  tags?: string[];
  status: 'active' | 'archived' | 'draft' | 'deleted';
  version: number;
  parent_content_id?: number;
  ai_provider: string;
  ai_model?: string;
  token_count?: number;
  generation_time_ms?: number;
  conversation_history?: Record<string, any>;
  template_used?: string;
  platform?: string;
  is_favorite: boolean;
  last_accessed: Date;
  created_at: Date;
  updated_at: Date;
}
```

### Valid Content Types
```typescript
export const VALID_CONTENT_TYPES = [
  'email', 'newsletter', 'promotional', 'welcome', 'announcement', 'ecommerce_email',
  'landing_page', 'saas_landing', 'ecommerce_landing', 'agency_landing', 'portfolio_landing',
  'persona', 'buyer_persona', 'customer_persona',
  'social_calendar', 'marketing_calendar', 'email_calendar',
  'content_creator', 'blog_post', 'social_post', 'case_study', 'whitepaper', 'press_release',
  'prompt_library', 'custom_prompt',
  'other'
] as const;
```

### Key Methods
- createContent(): Creates content with ownership validation and AI tracking
- findByClientId(): Gets content with filtering options (contentType, status, limit, offset)
- searchContent(): Uses database function search_user_content($1, $2, $3, $4)
- duplicateContent(): Uses duplicate_content($1, $2, $3)
- bulkUpdateStatus(): Uses bulk_update_content_status($1, $2, $3)
- toggleFavorite(): Updates favorite status with ownership validation

### Database Functions Used
- get_client_content_stats($1)
- get_client_recent_content($1, $2)
- search_user_content($1, $2, $3, $4)
- duplicate_content($1, $2, $3)
- bulk_update_content_status($1, $2, $3)
- get_user_content_analytics($1)

### Analytics Features
- Content activity tracking by date
- Generation time tracking
- Token usage monitoring
- Last accessed timestamps
- Content versioning support

## EmailVerification.ts - Email Verification System
### Core Interface
```typescript
export interface EmailVerification {
  id: number;
  user_id: number;
  verification_code_hash: string;
  expires_at: Date;
  attempts: number;
  verified_at?: Date;
  created_at: Date;
}
```

### Key Configuration
- Code expiry: 15 minutes
- Max attempts: 3 per code
- Code format: 6-digit numeric
- Security: SHA256 hashed codes

### Key Methods
- createVerification(): Generates 6-digit code, hashes with SHA256, invalidates existing codes
- verifyCode(): Validates code with attempt tracking and expiry checking
- recordFailedAttempt(): Increments attempt counter with remaining attempts feedback
- cleanupExpiredVerifications(): Maintenance method to remove old records

### Security Features
- Cryptographically secure code generation using crypto.randomBytes(4)
- SHA256 hashing for database storage
- Automatic invalidation of existing codes
- Attempt limiting with progressive feedback

## SavedAsset.ts - Asset Management System
### Core Interface
```typescript
export interface SavedAsset {
  id: number;
  user_id: number;
  asset_type: AssetType;
  title: string;
  content: string;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export type AssetType = 
  | 'marketing' | 'social' | 'email' | 'email-built' 
  | 'landing' | 'persona' | 'content';
```

### Configuration
- Max assets per user: 100
- Title limit: 255 characters
- Content requirement: Minimum 10 characters

### Key Methods
- createSavedAsset(): Creates asset with user limit checking
- getUserSavedAssets(): Supports filtering by type and search with pagination
- getUserAssetStats(): Returns count by type and remaining slots
- searchUserAssets(): Title and content search with type filtering
- deleteOldestUserAssets(): Utility for cleanup when approaching limits

### Asset Type Labels
```typescript
export const ASSET_TYPE_LABELS: Record<AssetType, string> = {
  'marketing': 'Marketing',
  'social': 'Social Media',
  'email': 'Email',
  'email-built': 'Emails Built',
  'landing': 'Landing Pages',
  'persona': 'Personas',
  'content': 'Content'
};
```

## Token.ts - Authentication Token System
### Core Interface
```typescript
export interface Token {
  id: number;
  user_id: number;
  token_hash: string;
  expires_at: Date;
  created_at: Date;
}
```

### Configuration
- Token length: 32 bytes (64 hex characters)
- Default expiry: 24 hours
- Hashing: SHA256

### Key Methods
- createToken(): Generates cryptographically secure 32-byte token using crypto.randomBytes()
- validateToken(): Validates token hash and expiry, returns user info
- deleteToken(): Logout from single device
- deleteAllUserTokens(): Logout from all devices
- extendToken(): Extends expiration for "remember me" functionality
- cleanupExpiredTokens(): Maintenance job for expired tokens

### Security Features
- Cryptographically secure token generation
- SHA256 hashing for storage
- Automatic expiry handling
- Support for multiple active sessions per user

## User.ts - User Management System
### Core Interface
```typescript
export interface User {
  id: number;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  profession?: string;
  country?: string;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface PublicUser {
  // Same as User but without password_hash
}
```

### Security Configuration
- Salt rounds: 12 for bcrypt
- Email normalization: Lowercase and trimmed
- Password verification: bcrypt.compare()

### Key Methods
- createUser(): Creates user with bcrypt hashing, handles unique constraint violations
- findByEmail(): Returns full user (with password hash) for authentication
- findById(): Returns PublicUser (without password hash) for general use
- updatePassword(): Requires current password verification before update
- resetPassword(): Password reset without current password (for reset flow)
- updateProfile(): Dynamic profile updates for firstName, lastName, profession, country
- getProfileSummary(): Uses database functions for computed fields

### Database Functions Used
- get_user_display_name(id)
- get_user_initials(id)

### Profile Completion Calculation
- first_name: 20 points
- last_name: 20 points
- profession: 30 points
- country: 30 points
- Total: 100 points

### User Statistics Tracking
- Total/verified/unverified user counts
- Complete profile percentages
- Average profile completion scores

## Common Patterns Across All Models
### Error Handling
- Consistent error throwing with descriptive messages
- Database constraint violation handling
- Input validation before database operations

### Security Practices
- User ownership validation for all operations
- Input sanitization (trim, lowercase for emails)
- Secure hashing for passwords and tokens
- Soft deletes instead of hard deletes

### Database Interaction
- PostgreSQL with prepared statements
- Extensive use of stored functions for complex operations
- Dynamic query building for flexible updates
- Proper transaction handling implied

### Validation Patterns
- Required field checking
- Format validation (email, website, etc.)
- Length constraints enforcement
- Type safety with TypeScript interfaces

## auth.ts - Authentication & User Management
### Core Authentication System
- JWT Token Management: Uses tokenModel for creating, validating, and deleting authentication tokens
- User Registration: Enhanced profile fields (firstName, lastName, profession, country)
- Email Verification: 6-digit verification codes with rate limiting and attempt tracking
- Password Reset: 6-digit reset codes with expiration (10 minutes) and attempt limits (3 max)

### Key Validation Rules
```typescript
// Email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password requirements
password.length >= 8

// Name validation (when provided)
firstName/lastName: 2-50 characters after trim
```

### Critical Token Validation Pattern
```typescript
// Used throughout all protected routes
const tokenValidation = await tokenModel.validateToken(token);
if (!tokenValidation.isValid || !tokenValidation.userId) {
  return res.status(401).json({ success: false, error: 'Invalid authentication token' });
}
```

### Security Features
- Rate Limiting: Email verification has pending verification check
- Password Reset Storage: In-memory Map (production should use database)
- Token Expiration: 24 hours for auth tokens, 10 minutes for reset codes
- Logout All: Invalidates all user tokens for security

### Profile Management
- Profile Updates: PUT /api/auth/profile with validation
- Password Changes: Requires current password verification
- User Info Retrieval: GET /api/auth/me returns profile summary

## clients.ts - Client Management System
### Core Client Operations
- CRUD Operations: Full client lifecycle management with soft delete
- User Isolation: All operations require userId validation via authenticateUser middleware
- Statistics Integration: Client summaries with content statistics

### Key Route Patterns
```typescript
// Authentication middleware on all routes
router.use(authenticateUser);

// Client validation pattern
const clientId = parseInt(req.params.id);
if (isNaN(clientId)) {
  return res.status(400).json({ success: false, error: 'Invalid client ID' });
}
```

### Advanced Features
- Search Functionality: /search/:term with minimum 2 characters
- Bulk Operations: /bulk/archive for multiple client management
- Content Integration: /api/clients/:id/content with filtering and pagination
- Analytics: /analytics/overview for comprehensive client insights
- Activity Tracking: Recent client activity with configurable day ranges

### Client Content Management
- Content Types: Integrated with clientContentModel
- Pagination: Configurable limit/offset with hasMore indicators
- Filtering: By content_type and status
- Statistics: Content counts, recent content, client activity metrics

### Error Handling Patterns
```typescript
// Validation errors (400)
if (error.message.includes('required') || error.message.includes('Invalid')) {
  return res.status(400).json({ success: false, error: error.message });
}

// Conflict errors (409) 
if (error.message.includes('already exists')) {
  return res.status(409).json({ success: false, error: error.message });
}
```

## generate.ts - AI Content Generation
### Enhanced Generation System
- Dual Input Support: Legacy single prompt OR conversation history array
- Client Integration: Optional client_id and content_type for content storage
- Provider Support: Currently Claude-focused with extensible architecture

### Request Validation Logic
```typescript
// Conversation validation
if (conversationHistory) {
  // Array validation + message structure validation
  for (let message of conversationHistory) {
    if (!message.role || !message.content) return error;
    if (!['user', 'assistant'].includes(message.role)) return error;
  }
} else if (prompt) {
  // Convert single prompt to conversation format
  finalConversationHistory = [{ role: 'user', content: prompt }];
}
```

### Content Analysis & Enhancement
- Content Detection: Automatic detection of persona, email, landing page requests
- Token Estimation: Pre-generation token usage estimation
- Performance Tracking: Request ID tracking with processing time metrics

### Client Content Storage
```typescript
// Automatic content storage when context provided
if (client_id && content_type && req.user) {
  const contentCreationData = {
    client_id: Number(client_id),
    content_type: content_type as ContentType,
    title: title || `Generated ${content_type} - ${new Date().toLocaleDateString()}`,
    content: response,
    metadata: { request_id, processing_time_ms, conversation_length },
    ai_provider: 'claude',
    ai_model: 'claude-sonnet-4-20250514'
  };
}
```

### Error Classification System
- PERSONA_GENERATION_ERROR: Structure/persona specific failures
- RATE_LIMIT_ERROR: API rate limiting
- API_KEY_ERROR: Authentication issues
- TOKEN_LIMIT_ERROR: Request size issues
- CLIENT_ERROR: Client validation failures

## savedAssets.ts - Asset Management
### Asset Management System
- Asset Types: Defined by VALID_ASSET_TYPES with validation
- User Limits: Maximum assets per user with remaining slot tracking
- Search & Filter: Advanced asset discovery with type and text search

### Key Validation Patterns
```typescript
// Asset type validation
if (!savedAssetModel.isValidAssetType(assetType)) {
  return res.status(400).json({
    error: `Invalid asset type: ${assetType}. Must be one of: ${VALID_ASSET_TYPES.join(', ')}`
  });
}

// User limit checking
const canSave = await savedAssetModel.canUserSaveMore(userId);
if (!canSave) {
  return res.status(400).json({
    error: `Maximum saved assets limit (${maxAssets}) reached`
  });
}
```

### Asset Operations
- Create: Full validation with user limit enforcement
- Read: Individual asset retrieval with ownership verification
- Update: Partial updates (title, content, metadata) with validation
- Delete: Soft delete with statistics update
- Search: Advanced text search with optional type filtering

### Statistics & Analytics
```typescript
// User asset statistics
const stats = await savedAssetModel.getUserAssetStats(userId);
// Returns: totalAssets, remainingSlots, assetsByType, etc.
```

### Query Parameters
- Pagination: limit (1-100, default 50), offset (≥0, default 0)
- Filtering: type, search terms
- Sorting: Built into model layer

## validate.ts - API Key Validation
### Anthropic SDK Validation System
- Multi-Version Support: Handles different SDK structures (old vs new)
- Comprehensive Error Handling: Specific error classification for different failure types

### SDK Compatibility Detection
```typescript
// Multi-structure support
let createMethod;
if (anthropic.messages && typeof anthropic.messages.create === 'function') {
  createMethod = anthropic.messages.create.bind(anthropic.messages); // New SDK
} else if (typeof anthropic.create === 'function') {
  createMethod = anthropic.create.bind(anthropic); // Old SDK
} else if (typeof anthropic.completions?.create === 'function') {
  createMethod = anthropic.completions.create.bind(anthropic.completions); // Alternative
}
```

### Test Configuration
```typescript
// API validation test
const testResponse = await createMethod({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 5,
  system: 'You are a helpful assistant.',
  messages: [{ role: 'user', content: 'Hello' }]
});
```

### Error Classification
- 401/Authentication: Invalid API key or insufficient permissions
- 429: Rate limit exceeded
- 500: Service temporarily unavailable
- Model Errors: Model availability issues
- Invalid Request: Malformed request structure
- SDK Errors: Client creation or method availability issues

## Common Patterns Across Files
### Request ID Tracking
```typescript
const requestId = req.headers['x-request-id'] || Date.now().toString();
console.log(`🎯 [${requestId}] Operation started...`);
```

### Standard API Response Format
```typescript
interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
  metadata?: any;
}
```

### Authentication Middleware Pattern
```typescript
// Used in clients.ts and savedAssets.ts
router.use(authenticateUser); // or validateApiKeys for generate.ts
```

### Error Handling Strategy
1. Input validation (400 errors)
2. Authentication/Authorization (401/403 errors)
3. Resource conflicts (409 errors)
4. Resource not found (404 errors)
5. Server errors (500 errors)

### Database Model Integration
- userModel: User operations and profile management
- tokenModel: JWT token lifecycle management
- clientModel: Client CRUD and analytics
- clientContentModel: Content management and statistics
- savedAssetModel: Asset management with user limits
- emailVerificationModel: Email verification workflow

## Configuration Files
### package.json
- Framework: Express.js 4.18.2 with TypeScript
- AI Integration: @anthropic-ai/sdk ^0.56.0 for Claude API
- Database: PostgreSQL with pg ^8.16.3
- Security: bcrypt, helmet, cors, rate-limiter-flexible
- Development: tsx for hot reloading, Jest for testing
- Scripts: Development server, build, migrations, database setup

### tsconfig.json
- Target: ES2020 with CommonJS modules
- Strict mode: Full TypeScript type safety
- Output: ./dist directory for compiled JavaScript

### .env/.env.example
- Database: PostgreSQL connection settings with pooling
- Email: SMTP configuration for Gmail
- Authentication: Token expiry and rate limiting settings
- Security: Feature flags and validation parameters

### .gitignore
- Excludes: node_modules, dist, .env files, uploads, IDE files
- Includes: Log files, OS-specific files protection

## Core Server Files
### src/index.ts (Main Server)
- Express Setup: CORS, Helmet security, rate limiting
- Route Configuration: Authentication, generation, validation, clients, assets
- Health Monitoring: Database health checks with pool statistics
- Error Handling: Global error handler with request context logging
- Graceful Shutdown: Proper cleanup on SIGTERM/SIGINT

### src/config/database.ts
- PostgreSQL Pool: Connection pooling with health monitoring
- Database Manager: Connection testing, health checks, statistics
- Auto-reconnection: Handles connection failures gracefully
- Environment Config: SSL support for production

## Authentication & Security
### src/middleware/auth.ts
- Dual Authentication: Claude API keys + optional user tokens
- Settings Compatibility: Handles multiple API key formats
- Rate Limiting Integration: User-based or IP-based keys
- Legacy Support: Backward compatibility for old key formats

### src/middleware/authMiddleware.ts
- JWT Token Validation: Bearer token authentication
- User Context: Attaches user info to requests
- Optional Auth: Non-blocking authentication for public endpoints
- Token Cleanup: Handles orphaned tokens automatically

### src/middleware/rateLimiter.ts
- Memory-Based: RateLimiterMemory for distributed-ready limiting
- Default Limits: 100 requests per 15 minutes per IP
- Configurable: Environment-based configuration
- Error Responses: 429 status with Retry-After headers

## AI & Services
### src/services/aiService.ts
- Claude Integration: Direct Claude Sonnet 4 API communication
- Conversation Support: Full conversation history with token management
- Token Estimation: ~4 characters per token calculation
- Response Processing: Markdown cleanup and formatting
- Legacy Compatibility: Single prompt to conversation conversion

### src/services/clientService.ts
- Client Analytics: Content metrics, activity tracking
- Dashboard Data: Comprehensive business intelligence
- Content Storage: AI-generated content with metadata tracking
- Search & Filter: Advanced client content organization
- Export Functions: Data export capabilities

### src/services/emailService.ts
- Email Types: Verification, password reset, welcome emails
- Rate Limiting: Per-email-type rate limiting
- SMTP Integration: Gmail SMTP with app passwords
- Template System: HTML email templates with styling
- Delivery Tracking: Success/failure logging

### src/services/tokenService.ts
- Token Generation: Cryptographically secure 64-character tokens
- Validation: Token format and expiry checking
- User Limits: Maximum 10 tokens per user
- Maintenance: Automatic cleanup of expired tokens
- Security Features: Device tracking and statistics

## Database Models
### src/models/User.ts
- Profile Management: Extended user profiles with completion tracking
- Security: bcrypt password hashing (12 salt rounds)
- Email Verification: Verification status tracking
- Profile Statistics: Completion percentage calculation

### src/models/Client.ts
- Business Info: Company details, industry, budget ranges
- Contact Management: Multiple contact methods and roles
- Brand Information: Colors, guidelines, target audience
- Ownership Validation: User-client relationship enforcement

### src/models/ClientContent.ts
- Content Types: 20+ content types (emails, landing pages, personas, etc.)
- Versioning: Content versioning with parent-child relationships
- AI Metadata: Provider, model, token count, generation time
- Search & Analytics: Full-text search and usage statistics

### src/models/SavedAsset.ts
- Asset Management: Personal content library (100-item limit)
- Asset Types: Marketing, social, email, landing, persona, content
- Search Functionality: Title and content search with filtering
- Usage Statistics: Asset count tracking by type

### src/models/Token.ts
- Session Management: JWT token lifecycle
- Multi-device: Multiple active sessions per user
- Security: SHA256 hashing for storage
- Expiry Handling: Automatic cleanup and extension

### src/models/EmailVerification.ts
- 6-digit Codes: Cryptographically secure verification codes
- Rate Limiting: 3 requests per hour per user
- Attempt Tracking: Limited attempts with progressive feedback
- Auto-cleanup: Expired verification removal

## API Routes
### src/routes/auth.ts
- Registration: Enhanced profiles with validation
- Login: JWT token generation
- Email Verification: 6-digit code system with rate limiting
- Password Reset: Secure 6-digit reset codes (10-minute expiry)
- Profile Management: Update profiles and passwords

### src/routes/generate.ts
- Dual Input: Single prompt OR conversation history
- Client Integration: Content storage with client association
- AI Provider Support: Claude-focused with extensible architecture
- Error Classification: Specific error types for different failures

### src/routes/clients.ts
- CRUD Operations: Complete client lifecycle management
- Analytics: Client statistics and activity tracking
- Content Integration: Client-content relationship management
- Bulk Operations: Multiple client management features

### src/routes/savedAssets.ts
- Asset CRUD: Create, read, update, delete operations
- User Limits: 100-asset limit enforcement
- Search & Filter: Advanced asset discovery
- Statistics: Asset usage and remaining slots tracking

### src/routes/validate.ts
- API Key Validation: Anthropic SDK compatibility testing
- Multi-version Support: Handles different SDK structures
- Error Classification: Specific error types for validation failures

## Database Migrations
### 001_create_users_table.sql
- Core Authentication: Email, password hash, timestamps
- Validation: Email format and length constraints
- Auto-triggers: updated_at automatic updating

### 002_create_tokens_table.sql
- Session Management: Token storage with user relationship
- Security: 64-character hex token format validation
- Limits: Maximum 10 tokens per user with cleanup
- Analytics: Token statistics and monitoring views

### 003_add_user_profile_fields.sql
- Profile Extension: Names, profession, country fields
- Email Verification: Verification status tracking
- Profile Analytics: Completion percentage calculation
- Display Functions: Name formatting and initials generation

### 004_create_email_verifications_table.sql
- Verification System: SHA256-hashed 6-digit codes
- Rate Limiting: 3 requests per hour, 1-minute minimum gap
- Audit Trail: Email sending attempt logging
- Auto-cleanup: Expired verification removal

### 005_create_password_resets_table.sql
- Reset Security: IP and user agent tracking
- Rate Limiting: 2 requests per 30 minutes, 5-minute gaps
- Security Monitoring: Suspicious IP detection
- Token Invalidation: Auto-logout on password reset

### 006_create_saved_assets_table.sql
- Asset Storage: Personal content library management
- Type System: 8 predefined asset types
- User Limits: 100-asset limit enforcement
- Analytics: Asset statistics and usage tracking

### 007_create_clients_table.sql
- Client Management: Business information storage
- Contact System: Multiple contact methods and roles
- Brand Management: Colors, guidelines, audience data
- Business Rules: Unique company names per user

### 008_create_client_content_table.sql
- Content Storage: AI-generated content with metadata
- Content Types: 20+ predefined content categories
- Versioning: Parent-child content relationships
- Analytics: Token usage, generation time, access tracking
- Search: Full-text search capabilities

## Type System (src/types/index.ts)
### Core Interfaces
- User & PublicUser: Authentication and profile management
- Client & ClientContent: Business relationship management
- SavedAsset: Personal content library
- Token Management: Authentication session handling
- API Responses: Standardized response formats

### Content Type System
- 20+ Content Types: Emails, landing pages, personas, calendars
- Validation: Strict content type checking
- Metadata: Flexible additional data storage

### Error Handling
- Typed Errors: Specific error codes for different failure types
- Response Consistency: Standardized error response format
- Request Context: Enhanced error logging with context

## Architecture Highlights
### Claude-First Design
- Direct Integration: No intermediary AI services
- Minimal Processing: Clean input → Claude → clean output
- Conversation Aware: Full history support with intelligent token management

### Security Features
- Multi-layer Authentication: API keys + user tokens
- Rate Limiting: Memory-based with IP and user tracking
- Input Validation: Comprehensive validation across all endpoints
- Audit Logging: Security event tracking and monitoring

### Performance Optimization
- Connection Pooling: PostgreSQL connection management
- Indexes: Optimized database queries with composite indexes
- Caching: Memory-based rate limiting for fast lookups
- Pagination: Efficient data loading with limit/offset

### Business Intelligence
- Client Analytics: Content metrics and activity tracking
- Usage Statistics: Token usage and generation time monitoring
- Dashboard Data: Comprehensive business insights
- Content Organization: Advanced search and categorization

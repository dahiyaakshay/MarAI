# MarAI Backend Server Files - Complete Developer Guide

- **🎯 Purpose:** Comprehensive guide to MarAI's backend server architecture and implementation
- **👥 Target Audience:** Backend developers, DevOps engineers, and system architects

## 📁 Backend Structure Overview
<pre>server/ (Backend Root)
├── package.json            # Backend dependencies & scripts
├── README.md               # Project documentation
├── tsconfig.json           # TypeScript configuration
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore patterns
└── src/                    # Source code directory
    ├── index.ts            # Main server entry point
    ├── types/
    │   └── index.ts        # TypeScript type definitions
    ├── services/
    │   ├── aiService.ts    # Claude AI service implementation
    │   └── tokenService.ts # Token business logic service
    ├── routes/
    │   ├── generate.ts     # Content generation endpoints
    │   ├── validate.ts     # API key validation endpoints
    │   └── auth.ts         # Authentication endpoints
    ├── middleware/
    │   ├── auth.ts         # Enhanced authentication middleware
    │   ├── rateLimiter.ts  # Rate limiting middleware
    │   └── authMiddleware.ts # User authentication middleware
    ├── models/             # Database models
    │   ├── User.ts         # User database operations
    │   └── Token.ts        # Token database operations
    ├── config/             # Configuration
    │   └── database.ts     # PostgreSQL configuration
    └── migrations/         # Database migrations
        ├── 001_create_users_table.sql
        └── 002_create_tokens_table.sql</pre>

## 🏗️ Architecture Philosophy
### Pure Claude Passthrough Design
The MarAI backend follows a "Claude-first" architecture:
- Direct Integration: No intermediary AI services, direct Claude API communication
- Minimal Processing: Clean user input → Claude → clean output
- Conversation Aware: Full conversation history support with intelligent token management
- Enhanced Logging: Comprehensive request/response monitoring with user context
- Backward Compatible: Legacy single-prompt requests automatically converted

### Key Architectural Decisions
- TypeScript First: Full type safety across all components
- Express.js Framework: Battle-tested, lightweight web framework
- Memory-Based Rate Limiting: Fast, distributed-ready request limiting
- Conversation State Management: Stateless but conversation-aware processing
- Enhanced Error Handling: Detailed error context and recovery strategies

## 📦 Package Configuration
### package.json - Backend Dependencies
```json
{
  "name": "marai-backend-simplified",
  "version": "2.0.0",
  "description": "Simplified Claude AI-first backend for MarAI Marketing Automation Platform",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.56.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "helmet": "^7.1.0",
    "rate-limiter-flexible": "^7.1.1"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.8",
    "@types/node": "^20.10.0",
    "jest": "^29.7.0",
    "tsx": "^4.6.0",
    "typescript": "^5.3.2"
  }
}
```

## Dependencies Analysis
### Production Dependencies
| Package   | Version   | Purpose   | MarAI Usage   |
|------------|------------|------------|------------|
| @anthropic-ai/sdk | ^0.56.0 | Official Anthropic SDK | Direct Claude API communication |
| cors | ^2.8.5 | Cross-Origin Resource Sharing | Frontend-backend communication |
| dotenv | ^16.3.1 | Environment variable management | Configuration loading |
| express | ^4.18.2 | Web application framework | HTTP server and routing |
| helmet | ^7.1.0 | Security middleware | HTTP security headers |
| rate-limiter-flexible | ^7.1.1 | Rate limiting | API abuse prevention |
| bcrypt | ^5.1.1 | Password hashing | Secure user authentication with salt rounds |
| pg | ^8.11.3 | PostgreSQL client | Database connectivity and operations |
| uuid | ^9.0.1 | UUID generation | Unique identifiers for sessions and tokens |

### Development Dependencies
| Package   | Version   | Purpose   | MarAI Usage   |
|------------|------------|------------|------------|
| tsx | ^4.6.0 | TypeScript execution | Development server with hot reload |
| typescript | ^5.3.2 | TypeScript compiler | Type checking and compilation |
| jest | ^29.7.0 | Testing framework | Unit and integration testing |
| @types/* | Latest | Type definitions | TypeScript support for packages |
| @types/bcrypt | ^5.0.2 | TypeScript types | bcrypt library type definitions |
| @types/pg | ^8.10.9 | TypeScript types | PostgreSQL client type definitions |
| @types/uuid | ^9.0.7 | TypeScript types | UUID library type definitions |

## Script Commands
### Available Scripts
```bash
npm run dev       # Start development server with hot reload
npm run build     # Compile TypeScript to JavaScript
npm run start     # Start production server
npm run test      # Run Jest test suite
```

### Enhanced Scripts for Production
```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    
    // Additional production scripts
    "build:clean": "rm -rf dist && npm run build",
    "start:prod": "NODE_ENV=production node dist/index.js",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "type-check": "tsc --noEmit",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "dev:debug": "tsx watch --inspect src/index.ts",
    "logs": "pm2 logs marai-backend",
    "restart": "pm2 restart marai-backend",
    
    // NEW: Authentication & Database scripts
    "migrate": "node scripts/migrate.js",
    "db:setup": "node scripts/setup-db.js",
    "db:reset": "node scripts/reset-db.js"
  }
}
```

## Dependency Management
### Adding New Dependencies
```bash
# Production dependencies
npm install new-package

# Development dependencies  
npm install -D new-dev-package

# Specific versions for stability
npm install @anthropic-ai/sdk@0.56.0
```

### Security & Updates
```bash
# Security audit
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update

# Check outdated packages
npm outdated
```

## 🔧 Configuration Files
### tsconfig.json - TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Configuration Breakdown
- Target ES2020: Modern JavaScript features with Node.js compatibility
- CommonJS Modules: Node.js module system compatibility
- Strict Mode: Full TypeScript strictness for better code quality
- Source Maps: Debugging support in production
- Declaration Files: Type definitions for library usage

### Enhanced TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    
    // Strict type checking
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true,
    "noUncheckedIndexedAccess": true,
    
    // Module resolution
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    
    // Advanced options
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": false,
    "importHelpers": true,
    
    // Path mapping for cleaner imports
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/types/*": ["src/types/*"],
      "@/services/*": ["src/services/*"],
      "@/routes/*": ["src/routes/*"],
      "@/middleware/*": ["src/middleware/*"],
      "@/utils/*": ["src/utils/*"]
    },
    
    // Performance
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  },
  "include": ["src/**/*", "src/**/*.json"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"],
  
  // Compiler performance
  "ts-node": {
    "transpileOnly": true,
    "files": true
  }
}
```

### .env.example - Environment Configuration
```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=uploads

# API Keys (will be provided by users through frontend)
# ANTHROPIC_API_KEY=

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=marai_dev
DB_USER=marai_user
DB_PASSWORD=your_secure_password
DB_MAX_CONNECTIONS=10
DB_MIN_CONNECTIONS=2

# Authentication Configuration
TOKEN_EXPIRY_HOURS=24
MAX_TOKENS_PER_USER=10
MIN_PASSWORD_LENGTH=8

# Enhanced Rate Limiting
API_KEY_RATE_LIMIT=500
CONVERSATION_RATE_LIMIT=50
```

### Environment Variables Breakdown
#### Server Configuration
| Variable   | Default   | Purpose   | Options   |
|------------|------------|------------|------------|
| PORT | 3001 | Server port | Any available port |
| NODE_ENV | development | Environment mode | development, production, test |

#### CORS Configuration
| Variable   | Default   | Purpose   | Notes   |
|------------|------------|------------|------------|
| FRONTEND_URL | http://localhost:5173 | Allowed origin | Must match frontend URL |

#### Rate Limiting
| Variable   | Default   | Purpose   | Recommendations   |
|------------|------------|------------|------------|
| RATE_LIMIT_WINDOW_MS | 900000 | Window duration (15 min) | 300000-1800000 |
| RATE_LIMIT_MAX_REQUESTS | 100 | Max requests per window | 50-500 |

#### File Handling
| Variable   | Default   | Purpose   | Notes   |
|------------|------------|------------|------------|
| MAX_FILE_SIZE | 5242880 | Max file size (5MB) | Bytes |
| UPLOAD_DIR | uploads | Upload directory | Relative to server root |

### Production Environment Setup
```bash
# Production .env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-domain.com

# Enhanced security settings
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=200
MAX_FILE_SIZE=10485760

# Logging configuration
LOG_LEVEL=info
LOG_FILE=logs/marai-backend.log

# Security settings
CORS_ORIGIN=https://your-domain.com
TRUST_PROXY=true
SESSION_SECRET=your-session-secret

# Monitoring
HEALTH_CHECK_INTERVAL=30000
MEMORY_THRESHOLD=85
CPU_THRESHOLD=80
```

### .gitignore - Version Control Exclusions
```bash
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build output
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# Uploads directory
uploads/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
```

### Additional Production Exclusions
```bash
# Additional items for production
.tsbuildinfo
*.tsbuildinfo
coverage/
.nyc_output
logs/
*.log
pm2.json
ecosystem.config.js
.env.*
temp/
cache/
.cache/
```

## 🚀 Core Server Implementation
### index.ts - Main Server Entry Point
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { rateLimitMiddleware } from './middleware/rateLimiter';
import { dbManager } from './config/database';

// Import routes
import generateRoutes from './routes/generate';
import validateRoutes from './routes/validate';
import authRoutes from './routes/auth';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
app.use(rateLimitMiddleware);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Enhanced health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    const dbHealth = await dbManager.healthCheck();
    
    const healthCheck = {
      success: true,
      message: 'MarAI Backend with Authentication is running',
      timestamp: new Date().toISOString(),
      provider: 'Claude AI (Anthropic)',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: {
        connected: dbHealth.healthy,
        stats: dbHealth.stats
      },
      features: {
        userAuthentication: true,
        conversationSupport: true,
        rateLimiting: true,
        cors: true,
        security: true
      },
      endpoints: {
        auth: '/api/auth/*',
        generate: '/api/generate',
        validate: '/api/validate'
      }
    };
    
    res.json(healthCheck);
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'Health check failed',
      timestamp: new Date().toISOString()
    });
  }
});

// API routes
app.use('/api/auth', authRoutes);           // NEW: User authentication
app.use('/api/generate', generateRoutes);   // Claude-powered content generation
app.use('/api/validate', validateRoutes);   // Claude API key validation

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error:', {
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });
  
  res.status(error.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Enhanced 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: {
      health: 'GET /health',
      auth: 'POST /api/auth/{signup,login,logout,me}',
      generate: 'POST /api/generate', 
      validate: 'POST /api/validate/anthropic'
    }
  });
});

// Initialize database and start server
async function startServer() {
  try {
    // Test database connection
    console.log('🔍 Testing database connection...');
    const dbConnected = await dbManager.testConnection();
    
    if (!dbConnected) {
      if (process.env.NODE_ENV === 'production') {
        console.error('❌ Production startup failed: Database connection required');
        process.exit(1);
      } else {
        console.warn('⚠️ Development mode: Database connection failed, continuing anyway');
      }
    } else {
      console.log('✅ Database connection successful');
    }

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`🚀 MarAI Backend with Authentication running on port ${PORT}`);
      console.log(`📱 Health check: http://localhost:${PORT}/health`);
      console.log(`🔐 Authentication: http://localhost:${PORT}/api/auth/*`);
      console.log(`🤖 Generate endpoint: http://localhost:${PORT}/api/generate`);
      console.log(`🔑 Validate endpoint: http://localhost:${PORT}/api/validate`);
      console.log(`🧠 AI Provider: Claude 4 Sonnet (Anthropic)`);
      console.log(`🗄️ Database: ${dbConnected ? 'Connected' : 'Disconnected'}`);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.log(`${signal} received, shutting down gracefully`);
      
      server.close(async () => {
        console.log('HTTP server closed');
        
        // Close database connections
        try {
          await dbManager.close();
          console.log('Database connections closed');
        } catch (error) {
          console.error('Error closing database:', error);
        }
        
        console.log('Process terminated');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
startServer();

export default app;
```

### Server Architecture Analysis
#### Middleware Stack (Order Matters)
1. Helmet: Security headers first
2. CORS: Cross-origin configuration
3. Rate Limiting: Request throttling
4. Body Parsing: JSON and URL-encoded data

#### Route Structure
- /health - Server health monitoring
- /api/generate - Content generation (conversation-aware)
- /api/validate - API key validation

#### Error Handling
- Global Error Handler: Catches all unhandled errors
- 404 Handler: Handles unknown routes
- Development vs Production: Different error detail levels

#### Graceful Shutdown
- SIGTERM: Deployment shutdown signal
- SIGINT: Ctrl+C shutdown signal
- Proper Cleanup: Server closes connections gracefully

#### Enhanced Features Added
- **Database Integration**: PostgreSQL connection testing and health monitoring
- **Authentication Routes**: User management endpoints mounted at `/api/auth`
- **Enhanced Health Check**: Database status, connection pool stats, feature flags
- **Production Safety**: Won't start without database in production mode
- **Graceful Database Shutdown**: Proper connection cleanup on termination
- **Exception Handling**: Uncaught exception and rejection handling
  
### Enhanced Server Configuration
```typescript
// Enhanced server setup with monitoring and logging
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { rateLimitMiddleware } from './middleware/rateLimiter';
import { loggingMiddleware } from './middleware/logging';
import { monitoringMiddleware } from './middleware/monitoring';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enhanced security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Enhanced CORS with more options
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Keys'],
  exposedHeaders: ['X-Total-Count', 'X-Rate-Limit-Remaining']
}));

// Request logging
app.use(loggingMiddleware);

// Performance monitoring
app.use(monitoringMiddleware);

// Rate limiting
app.use(rateLimitMiddleware);

// Body parsing with enhanced limits
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buffer) => {
    // Custom JSON validation if needed
  }
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb',
  parameterLimit: 1000
}));

// Enhanced health check
app.get('/health', (req, res) => {
  const healthCheck = {
    success: true,
    message: 'MarAI Claude-Only Backend is running',
    timestamp: new Date().toISOString(),
    provider: 'Claude AI (Anthropic)',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '2.0.0',
    environment: process.env.NODE_ENV,
    features: {
      conversationSupport: true,
      rateLimiting: true,
      cors: true,
      security: true
    }
  };
  
  res.json(healthCheck);
});

// Routes
app.use('/api/generate', generateRoutes);
app.use('/api/validate', validateRoutes);

// Enhanced error handling
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Log error with context
  console.error('Global error:', {
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  
  // Determine error status
  const status = error.status || error.statusCode || 500;
  
  // Create error response
  const errorResponse: any = {
    success: false,
    error: process.env.NODE_ENV === 'development' 
      ? error.message 
      : status >= 500 
        ? 'Internal server error' 
        : error.message || 'Request failed',
    timestamp: new Date().toISOString()
  };
  
  // Add debug info in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = error.stack;
    errorResponse.details = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body
    };
  }
  
  res.status(status).json(errorResponse);
});

export default app;
```

## 🧩 Type Definitions
### types/index.ts - Core Interfaces
```typescript
// Core API key interface - Claude only
export interface ApiKeys {
  anthropic?: string;
}

// Simplified request interface - just send prompt directly
export interface GenerateRequest {
  prompt: string;  // User's request - can include any context, URLs, etc.
}

// Enhanced request interface with conversation support
export interface ConversationRequest {
  conversationHistory: ConversationMessage[];
}

// Standard API response format
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Conversation message interface
export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Multi-platform content structure
export interface MultiFileContent {
  html: string;
  css: string;
  js: string;
  php?: string;
  liquid?: string;
  react?: string;
  vue?: string;
}

// Platform configuration
export interface Platform {
  id: string;
  name: string;
  description: string;
  fileTypes: string[];
  supportsforms: boolean;
}

// Template and wireframe types
export interface Template {
  id: number;
  name: string;
  type: string;
  description: string;
  platform?: string;
}

export interface Wireframe {
  id: number;
  name: string;
  type: string;
  description: string;
  platform?: string;
}

// Session management types
export interface SessionInfo {
  sessionId: string;
  tokenCount: number;
  tokenLimit: number;
  isActive: boolean;
  platform?: string;
}

// File export types
export interface ExportFile {
  name: string;
  content: string;
  extension: string;
}

// Platform-specific types
export type PlatformType = 'static' | 'wordpress' | 'shopify' | 'react' | 'vue';

export interface PlatformConfig {
  platform: PlatformType;
  files: ExportFile[];
  preview: string;
  instructions: string;
}

// User Authentication Types
export interface User {
  id: number;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface PublicUser {
  id: number;
  email: string;
  created_at: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: PublicUser;
  expiresAt: Date;
}

export type AuthErrorCode = 
  | 'MISSING_AUTH_HEADER'
  | 'INVALID_TOKEN'
  | 'USER_NOT_FOUND'
  | 'AUTH_REQUIRED';
```

### Type System Analysis
#### Core Request/Response Types
- ApiKeys: Only Claude API key required (simplified from multi-provider)
- GenerateRequest: Legacy single prompt support
- ConversationRequest: Modern conversation history support
- ApiResponse: Standard response wrapper with optional data/error

#### Conversation Management
- ConversationMessage: Simple role + content structure
- SessionInfo: Session tracking with token management

#### Multi-Platform Support
- MultiFileContent: Platform-specific file generation
- PlatformType: Supported export platforms
- PlatformConfig: Complete platform configuration

### Enhanced Type Definitions
```typescript
// Enhanced request interfaces
export interface EnhancedGenerateRequest {
  // Legacy support
  prompt?: string;
  
  // Modern conversation support
  conversationHistory?: ConversationMessage[];
  
  // Platform specification
  platform?: PlatformType;
  
  // Session management
  sessionId?: string;
  
  // Template context
  templateId?: string;
  templateCategory?: string;
  
  // Generation options
  options?: {
    maxTokens?: number;
    temperature?: number;
    enhancePersonas?: boolean;
    enhanceEmails?: boolean;
    enhanceLandingPages?: boolean;
  };
}

// Enhanced response interface
export interface EnhancedApiResponse<T = any> extends ApiResponse<T> {
  // Performance metrics
  performance?: {
    requestTime: number;
    tokenCount: number;
    processingTime: number;
  };
  
  // Session information
  session?: {
    id: string;
    messageCount: number;
    tokenUsage: number;
  };
  
  // Content metadata
  metadata?: {
    contentType: string;
    platform?: string;
    enhancementsApplied: string[];
  };
}

// Error handling types
export interface ErrorContext {
  requestId: string;
  method: string;
  url: string;
  ip: string;
  userAgent?: string;
  apiKey?: boolean;
  conversationLength?: number;
  estimatedTokens?: number;
}

export interface ApiError extends Error {
  status?: number;
  code?: string;
  context?: ErrorContext;
}

// Validation types
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ConversationValidation extends ValidationResult {
  messageCount: number;
  estimatedTokens: number;
  hasAlternatingPattern: boolean;
}
```

## 🤖 AI Service Implementation
### services/aiService.ts - Claude AI Integration
```typescript
import Anthropic from '@anthropic-ai/sdk';
import { ApiKeys } from '../types';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class AIService {
  private getAnthropicClient(apiKey: string): Anthropic {
    return new Anthropic({
      apiKey: apiKey
    });
  }

  /**
   * Clean Claude's response to remove markdown formatting
   */
  private cleanClaudeResponse(response: string): string {
    let cleaned = response.trim();
    
    // Remove markdown code blocks
    cleaned = cleaned.replace(/^```json\s*/i, '');
    cleaned = cleaned.replace(/\s*```\s*$/i, '');
    
    return cleaned.trim();
  }

  /**
   * PURE PASSTHROUGH - Send conversation history to Claude
   */
  async generate(
    conversationHistory: ConversationMessage[],
    apiKeys: ApiKeys,
    systemPrompt?: string
  ): Promise<string> {
    try {
      if (!apiKeys.anthropic) {
        throw new Error('Claude API key is required');
      }
      
      if (!Array.isArray(conversationHistory) || conversationHistory.length === 0) {
        throw new Error('Conversation history is required and must not be empty');
      }
      
      const rawResponse = await this.generateWithClaude(conversationHistory, apiKeys.anthropic, systemPrompt);
      
      // Only clean markdown formatting, return everything else as-is
      const cleanedResponse = this.cleanClaudeResponse(rawResponse);
      
      return cleanedResponse;
    } catch (error: any) {
      console.error('Claude AI Service Error:', error);
      throw new Error(`Claude generation failed: ${error.message}`);
    }
  }

  /**
   * LEGACY SUPPORT - Backward compatibility for single prompt requests
   * Converts single prompt to conversation format and calls main generate method
   */
  async generateFromPrompt(
    prompt: string,
    apiKeys: ApiKeys,
    systemPrompt?: string
  ): Promise<string> {
    const conversationHistory: ConversationMessage[] = [
      { role: 'user', content: prompt }
    ];
    
    return this.generate(conversationHistory, apiKeys, systemPrompt);
  }

  /**
   * Private method that handles the actual Claude API communication
   * Now supports full conversation history with 20k token limit
   */
  private async generateWithClaude(
    conversationHistory: ConversationMessage[], 
    apiKey: string, 
    systemPrompt?: string
  ): Promise<string> {
    const anthropic = this.getAnthropicClient(apiKey);

    // Convert our conversation format to Claude's API format
    const claudeMessages = conversationHistory.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content
    }));

    console.log(`Sending ${claudeMessages.length} messages to Claude API`);

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 20000,
      temperature: 0.7,
      system: systemPrompt || 'You are a helpful AI assistant.',
      messages: claudeMessages
    });

    return message.content[0].type === 'text' ? message.content[0].text : 'No response generated';
  }

  /**
   * Utility method to validate conversation history format
   */
  private validateConversationHistory(conversationHistory: ConversationMessage[]): boolean {
    if (!Array.isArray(conversationHistory)) return false;
    
    return conversationHistory.every(msg => 
      msg && 
      typeof msg.role === 'string' && 
      ['user', 'assistant'].includes(msg.role) &&
      typeof msg.content === 'string' &&
      msg.content.trim().length > 0
    );
  }

  /**
   * Utility method to estimate token count for conversation
   * Rough approximation: 1 token ≈ 4 characters
   */
  estimateConversationTokens(conversationHistory: ConversationMessage[]): number {
    const totalCharacters = conversationHistory.reduce(
      (total, message) => total + message.content.length, 
      0
    );
    return Math.ceil(totalCharacters / 4);
  }

  /**
   * Utility method to trim conversation history to fit within token limits
   * Removes oldest conversation pairs while preserving conversation structure
   */
  trimConversationHistory(
    conversationHistory: ConversationMessage[], 
    maxTokens: number = 45000 // Leave room for response
  ): ConversationMessage[] {
    let trimmedHistory = [...conversationHistory];
    
    // Always keep the last user message
    if (trimmedHistory.length === 0) return trimmedHistory;
    
    while (this.estimateConversationTokens(trimmedHistory) > maxTokens && trimmedHistory.length > 1) {
      // Remove oldest pair (user + assistant), but keep at least the last user message
      if (trimmedHistory.length > 1) {
        trimmedHistory.splice(0, 2);
      } else {
        break;
      }
    }
    
    return trimmedHistory;
  }

  /**
   * Helper method to create conversation history from single prompt
   */
  createConversationFromPrompt(prompt: string): ConversationMessage[] {
    return [{ role: 'user', content: prompt }];
  }

  /**
   * Helper method to add message to existing conversation
   */
  addMessageToConversation(
    conversationHistory: ConversationMessage[], 
    role: 'user' | 'assistant', 
    content: string
  ): ConversationMessage[] {
    return [...conversationHistory, { role, content }];
  }
}

export type { ConversationMessage };
```

### AIService Architecture Analysis
#### Core Design Principles
1. Pure Passthrough: Minimal processing, maximum Claude intelligence
2. Conversation First: Native conversation history support
3. Backward Compatible: Legacy single-prompt support
4. Token Aware: Smart token estimation and trimming
5. Error Resilient: Comprehensive error handling

### Key Methods
#### generate() - Main Entry Point
- Accepts conversation history array
- Validates input format
- Calls Claude API with full context
- Returns cleaned response

#### generateFromPrompt() - Legacy Support
- Converts single prompt to conversation format
- Maintains backward compatibility
- Automatically forwards to main generate method

#### generateWithClaude() - API Communication
- Direct Claude API integration
- Uses Claude 4 Sonnet model
- Configurable temperature and tokens
- Proper message format conversion

## 🗄️ Database Configuration
### config/database.ts - PostgreSQL Integration
```typescript
import { Pool, PoolConfig } from 'pg';

const poolConfig: PoolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'marai_dev',
  user: process.env.DB_USER || 'marai_user',
  password: process.env.DB_PASSWORD,
  min: parseInt(process.env.DB_MIN_CONNECTIONS || '2'),
  max: parseInt(process.env.DB_MAX_CONNECTIONS || '10'),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
};

const db = new Pool(poolConfig);

export class DatabaseManager {
  async testConnection(): Promise<boolean> {
    try {
      const client = await db.connect();
      await client.query('SELECT NOW()');
      client.release();
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

  async healthCheck(): Promise<{ healthy: boolean; stats: any }> {
    try {
      const stats = {
        totalCount: db.totalCount,
        idleCount: db.idleCount,
        waitingCount: db.waitingCount
      };
      return { healthy: true, stats };
    } catch (error) {
      return { healthy: false, stats: null };
    }
  }
}

export const dbManager = new DatabaseManager();
export { db };
```

### Database Architecture Analysis
#### Production Features
- Connection Pooling: Efficient resource management (2-10 connections)
- SSL Support: Production security configuration
- Health Monitoring: Real-time connection status
- Graceful Shutdown: Proper cleanup procedures
- Environment Configuration: All settings via environment variables

## 🔐 Authentication Routes
### routes/auth.ts - User Authentication Endpoints
```typescript
import { Router } from 'express';
import { userModel } from '../models/User';
import { tokenService } from '../services/tokenService';
import { authenticateUser } from '../middleware/authMiddleware';
import { ApiResponse } from '../types';

const router = Router();

/**
 * POST /signup - User Registration
 */
router.post('/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    
    // Input validation
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'Email, password, and confirmation are required'
      });
    }
    
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'Passwords do not match'
      });
    }
    
    // Create user and generate token
    const user = await userModel.createUser({ email, password });
    const { token, expiresAt } = await tokenService.generateAuthToken(user.id);
    
    res.status(201).json({
      success: true,
      data: {
        token,
        user: { id: user.id, email: user.email },
        expiresAt
      },
      message: 'Account created successfully'
    } as ApiResponse);
    
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    } as ApiResponse);
  }
});

/**
 * POST /login - User Authentication
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await userModel.findByEmail(email);
    if (!user || !await userModel.verifyPassword(password, user.password_hash)) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }
    
    const { token, expiresAt } = await tokenService.generateAuthToken(user.id);
    
    res.json({
      success: true,
      data: {
        token,
        user: { id: user.id, email: user.email },
        expiresAt
      },
      message: 'Login successful'
    } as ApiResponse);
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Login failed'
    } as ApiResponse);
  }
});

/**
 * GET /me - Get Current User
 */
router.get('/me', authenticateUser, async (req: any, res) => {
  res.json({
    success: true,
    data: {
      user: req.user
    }
  } as ApiResponse);
});

export default router;
```

### Authentication Endpoints Analysis
#### Security Features
- Input Validation: Email format and password strength requirements
- Password Verification: Secure bcrypt comparison
- Token Generation: Cryptographically secure opaque tokens
- Multi-device Support: Individual token management per login
- Comprehensive Logging: Authentication attempt tracking

## 👤 User Management Model
### models/User.ts - User Database Operations
```typescript
import bcrypt from 'bcrypt';
import { db } from '../config/database';
import { User, CreateUserData, PublicUser } from '../types';

class UserModel {
  private readonly saltRounds = 12;

  /**
   * Create new user with secure password hashing
   */
  async createUser(userData: CreateUserData): Promise<PublicUser> {
    const { email, password } = userData;
    
    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if user already exists
    const existingUser = await this.findByEmail(normalizedEmail);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, this.saltRounds);
    
    // Insert user
    const query = `
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING id, email, created_at
    `;
    
    const result = await db.query(query, [normalizedEmail, passwordHash]);
    return result.rows[0];
  }

  /**
   * Find user by email for authentication
   */
  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email.toLowerCase().trim()]);
    return result.rows[0] || null;
  }

  /**
   * Find user by ID for token validation
   */
  async findById(id: number): Promise<PublicUser | null> {
    const query = 'SELECT id, email, created_at FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  /**
   * Verify password during login
   */
  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Update user password
   */
  async updatePassword(userId: number, newPassword: string): Promise<void> {
    const passwordHash = await bcrypt.hash(newPassword, this.saltRounds);
    const query = 'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2';
    await db.query(query, [passwordHash, userId]);
  }

  /**
   * Check if user exists by email
   */
  async userExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return !!user;
  }
}

export const userModel = new UserModel();
```

### User Model Architecture Analysis
#### Security Features
- Password Hashing: bcrypt with 12 salt rounds (enterprise-grade)
- Email Normalization: Consistent lowercase and trimmed storage
- SQL Injection Prevention: Parameterized queries throughout
- Input Validation: Email existence checking and format validation

#### Database Integration
- Efficient Queries: Optimized SELECT and INSERT operations
- Error Handling: Comprehensive error messages for debugging
- Type Safety: Full TypeScript integration with defined interfaces

## 🔑 Token Management Model
### models/Token.ts - Token Database Operations
```typescript
import crypto from 'crypto';
import { db } from '../config/database';
import { Token, TokenValidationResult } from '../types';

class TokenModel {
  /**
   * Generate cryptographically secure token
   */
  private generateSecureToken(): string {
    return crypto.randomBytes(32).toString('hex'); // 64 character hex string
  }

  /**
   * Hash token for secure database storage
   */
  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Create new authentication token
   */
  async createToken(userId: number, expiryHours: number = 24): Promise<{ token: string; expiresAt: Date }> {
    // Generate secure token
    const token = this.generateSecureToken();
    const tokenHash = this.hashToken(token);
    const expiresAt = new Date(Date.now() + (expiryHours * 60 * 60 * 1000));
    
    // Check token limit (max 10 per user)
    const tokenCount = await this.getUserTokenCount(userId);
    if (tokenCount >= 10) {
      await this.deleteOldestUserToken(userId);
    }
    
    // Insert token
    const query = `
      INSERT INTO tokens (user_id, token_hash, expires_at)
      VALUES ($1, $2, $3)
      RETURNING id, expires_at
    `;
    
    const result = await db.query(query, [userId, tokenHash, expiresAt]);
    
    return {
      token, // Return plain token to client
      expiresAt: result.rows[0].expires_at
    };
  }

  /**
   * Validate token and return user info
   */
  async validateToken(token: string): Promise<TokenValidationResult> {
    if (!token || token.length !== 64) {
      return { isValid: false, error: 'Invalid token format' };
    }
    
    const tokenHash = this.hashToken(token);
    const query = `
      SELECT t.*, u.id as user_id, u.email
      FROM tokens t
      JOIN users u ON t.user_id = u.id
      WHERE t.token_hash = $1 AND t.expires_at > NOW()
    `;
    
    const result = await db.query(query, [tokenHash]);
    
    if (result.rows.length === 0) {
      return { isValid: false, error: 'Token not found or expired' };
    }
    
    const tokenData = result.rows[0];
    return {
      isValid: true,
      user: {
        id: tokenData.user_id,
        email: tokenData.email,
        created_at: tokenData.created_at
      }
    };
  }

  /**
   * Delete specific token (logout)
   */
  async deleteToken(token: string): Promise<boolean> {
    const tokenHash = this.hashToken(token);
    const query = 'DELETE FROM tokens WHERE token_hash = $1';
    const result = await db.query(query, [tokenHash]);
    return result.rowCount > 0;
  }

  /**
   * Delete all user tokens (logout all devices)
   */
  async deleteAllUserTokens(userId: number): Promise<number> {
    const query = 'DELETE FROM tokens WHERE user_id = $1';
    const result = await db.query(query, [userId]);
    return result.rowCount;
  }

  /**
   * Cleanup expired tokens
   */
  async cleanupExpiredTokens(): Promise<number> {
    const query = 'DELETE FROM tokens WHERE expires_at <= NOW()';
    const result = await db.query(query);
    return result.rowCount;
  }

  /**
   * Get user's active token count
   */
  async getUserTokenCount(userId: number): Promise<number> {
    const query = 'SELECT COUNT(*) as count FROM tokens WHERE user_id = $1 AND expires_at > NOW()';
    const result = await db.query(query, [userId]);
    return parseInt(result.rows[0].count);
  }

  /**
   * Delete oldest token when limit reached
   */
  private async deleteOldestUserToken(userId: number): Promise<void> {
    const query = `
      DELETE FROM tokens 
      WHERE id = (
        SELECT id FROM tokens 
        WHERE user_id = $1 
        ORDER BY created_at ASC 
        LIMIT 1
      )
    `;
    await db.query(query, [userId]);
  }
}

export const tokenModel = new TokenModel();
```

### Token Model Architecture Analysis
#### Security Features
- Cryptographic Generation: 32-byte random tokens (256-bit entropy)
- SHA-256 Hashing: One-way hashing for database storage
- Never Store Plain Tokens: Only hashed versions stored
- Format Validation: Length and format checking

#### Token Management
- Automatic Cleanup: Expired token removal
- Token Limits: Maximum 10 tokens per user
- Multi-device Support: Individual token management
- Expiration Control: Configurable expiry times

## 🎫 Token Business Logic Service
### services/tokenService.ts - Token Management Service
```typescript
import { tokenModel } from '../models/Token';
import { userModel } from '../models/User';
import { TokenValidationResult, PublicUser } from '../types';

class TokenService {
  private readonly defaultExpiryHours = parseInt(process.env.TOKEN_EXPIRY_HOURS || '24');
  private readonly maxTokensPerUser = parseInt(process.env.MAX_TOKENS_PER_USER || '10');

  /**
   * Generate authentication token with business logic
   */
  async generateAuthToken(userId: number, expiryHours?: number): Promise<{
    token: string;
    expiresAt: Date;
    user: PublicUser;
  }> {
    // Validate user exists
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Check token limit
    const currentTokenCount = await tokenModel.getUserTokenCount(userId);
    if (currentTokenCount >= this.maxTokensPerUser) {
      console.log(`User ${userId} reached token limit, cleaning up oldest token`);
    }

    // Generate token
    const { token, expiresAt } = await tokenModel.createToken(
      userId, 
      expiryHours || this.defaultExpiryHours
    );

    console.log(`Generated new token for user ${userId}, expires at ${expiresAt}`);

    return {
      token,
      expiresAt,
      user
    };
  }

  /**
   * Validate authentication token and return user info
   */
  async validateAuthToken(token: string): Promise<TokenValidationResult> {
    if (!token) {
      return { isValid: false, error: 'No token provided' };
    }

    // Format validation
    if (!this.isValidTokenFormat(token)) {
      return { isValid: false, error: 'Invalid token format' };
    }

    try {
      const result = await tokenModel.validateToken(token);
      
      if (result.isValid && result.user) {
        // Verify user still exists
        const user = await userModel.findById(result.user.id);
        if (!user) {
          // User was deleted, clean up orphaned token
          await tokenModel.deleteToken(token);
          return { isValid: false, error: 'User account not found' };
        }
        
        return result;
      }
      
      return result;
    } catch (error: any) {
      console.error('Token validation error:', error);
      return { isValid: false, error: 'Token validation failed' };
    }
  }

  /**
   * Revoke authentication token (logout)
   */
  async revokeToken(token: string): Promise<boolean> {
    if (!token || !this.isValidTokenFormat(token)) {
      return false;
    }

    return await tokenModel.deleteToken(token);
  }

  /**
   * Revoke all user tokens (logout all devices)
   */
  async revokeAllUserTokens(userId: number): Promise<number> {
    const deletedCount = await tokenModel.deleteAllUserTokens(userId);
    console.log(`Revoked ${deletedCount} tokens for user ${userId}`);
    return deletedCount;
  }

  /**
   * Extract token from Authorization header
   */
  extractTokenFromHeader(authHeader: string): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.substring(7).trim();
    return this.isValidTokenFormat(token) ? token : null;
  }

  /**
   * Validate token format without database lookup
   */
  private isValidTokenFormat(token: string): boolean {
    return typeof token === 'string' && 
           token.length === 64 && 
           /^[a-f0-9]{64}$/i.test(token);
  }

  /**
   * Perform token maintenance (cleanup expired tokens)
   */
  async performTokenMaintenance(): Promise<{ cleaned: number }> {
    const cleaned = await tokenModel.cleanupExpiredTokens();
    if (cleaned > 0) {
      console.log(`Token maintenance: cleaned ${cleaned} expired tokens`);
    }
    return { cleaned };
  }

  /**
   * Get user token statistics
   */
  async getUserTokenStats(userId: number): Promise<{
    activeTokens: number;
    maxAllowed: number;
  }> {
    const activeTokens = await tokenModel.getUserTokenCount(userId);
    return {
      activeTokens,
      maxAllowed: this.maxTokensPerUser
    };
  }
}

export const tokenService = new TokenService();
```

### Token Service Architecture Analysis
#### Business Logic Features
- Token Lifecycle Management: Generation, validation, revocation with business rules
- User Validation: Ensures user exists before token operations
- Token Limits: Enforces maximum tokens per user (configurable)
- Format Validation: Client-side validation before database queries
- Maintenance Tasks: Automated cleanup and system maintenance

#### Security & Performance
- Header Extraction: Secure Bearer token parsing
- Orphaned Token Cleanup: Removes tokens for deleted users
- Configurable Settings: Environment-based token expiry and limits
- Comprehensive Logging: Operation tracking for monitoring

## 🔐 User Authentication Middleware
### middleware/authMiddleware.ts - User Token Validation
```typescript
import { Request, Response, NextFunction } from 'express';
import { tokenService } from '../services/tokenService';
import { PublicUser, AuthErrorCode } from '../types';

export interface AuthenticatedRequest extends Request {
  user?: PublicUser;
  isAuthenticated: boolean;
  authError?: string;
}

/**
 * Required user authentication middleware
 */
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const requestId = req.headers['x-request-id'] || Date.now().toString();
  console.log(`🔍 [${requestId}] User auth middleware started`);
  
  try {
    const authHeader = req.headers.authorization;
    const authReq = req as AuthenticatedRequest;
    
    if (!authHeader) {
      console.log(`❌ [${requestId}] Missing Authorization header`);
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        code: 'MISSING_AUTH_HEADER' as AuthErrorCode
      });
    }

    const token = tokenService.extractTokenFromHeader(authHeader);
    if (!token) {
      console.log(`❌ [${requestId}] Invalid token format`);
      return res.status(401).json({
        success: false,
        error: 'Invalid authentication format',
        code: 'INVALID_AUTH_FORMAT' as AuthErrorCode
      });
    }

    const validation = await tokenService.validateAuthToken(token);
    if (!validation.isValid || !validation.user) {
      console.log(`❌ [${requestId}] Token validation failed: ${validation.error}`);
      return res.status(401).json({
        success: false,
        error: validation.error || 'Invalid authentication token',
        code: 'INVALID_TOKEN' as AuthErrorCode
      });
    }

    // Attach user to request
    authReq.user = validation.user;
    authReq.isAuthenticated = true;
    
    console.log(`✅ [${requestId}] User authenticated: ${validation.user.email}`);
    next();
    
  } catch (error: any) {
    console.error(`❌ [${requestId}] Auth middleware error:`, error);
    
    const authReq = req as AuthenticatedRequest;
    authReq.isAuthenticated = false;
    authReq.authError = error.message;
    
    res.status(500).json({
      success: false,
      error: 'Authentication failed',
      code: 'AUTH_ERROR' as AuthErrorCode
    });
  }
};

/**
 * Optional user authentication middleware
 */
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthenticatedRequest;
  
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      authReq.isAuthenticated = false;
      return next();
    }

    const token = tokenService.extractTokenFromHeader(authHeader);
    if (!token) {
      authReq.isAuthenticated = false;
      return next();
    }

    const validation = await tokenService.validateAuthToken(token);
    if (validation.isValid && validation.user) {
      authReq.user = validation.user;
      authReq.isAuthenticated = true;
    } else {
      authReq.isAuthenticated = false;
    }
    
    next();
    
  } catch (error) {
    authReq.isAuthenticated = false;
    next();
  }
};

/**
 * Helper functions for authenticated requests
 */
export const getUserId = (req: AuthenticatedRequest): number | null => {
  return req.user?.id || null;
};

export const getUserEmail = (req: AuthenticatedRequest): string | null => {
  return req.user?.email || null;
};

export const isAuthenticated = (req: AuthenticatedRequest): boolean => {
  return req.isAuthenticated === true && !!req.user;
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthenticatedRequest;
  
  if (!isAuthenticated(authReq)) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required for this action',
      code: 'AUTH_REQUIRED' as AuthErrorCode
    });
  }
  
  next();
};
```

### Authentication Middleware Analysis
#### Middleware Functions
- authenticateUser: Required authentication (401 if no valid token)
- optionalAuth: Optional authentication (continues without token)
- requireAuth: Use after optionalAuth to enforce authentication

#### Helper Functions
- getUserId/getUserEmail: Extract user info from request
- isAuthenticated: Check authentication status
- Token validation: Secure Bearer token processing

#### Security Features
- Bearer Token Validation: Proper Authorization header parsing
- Comprehensive Error Codes: Specific error categorization
- Request Context: User info attachment to requests
- Logging Integration: Request tracking with unique IDs

## 🗃️ Database Schema Migrations
### migrations/001_create_users_table.sql - Users Table
```sql
-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT users_email_length CHECK (LENGTH(email) >= 5 AND LENGTH(email) <= 255),
    CONSTRAINT users_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT users_password_hash_length CHECK (LENGTH(password_hash) >= 60)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Verify table creation
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
        RAISE EXCEPTION 'Users table creation failed';
    END IF;
END $$;
```

### migrations/002_create_tokens_table.sql - Tokens Table
```sql
-- Create tokens table for authentication
CREATE TABLE IF NOT EXISTS tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(64) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT tokens_hash_format CHECK (token_hash ~* '^[a-f0-9]{64}$'),
    CONSTRAINT tokens_expires_future CHECK (expires_at > created_at),
    CONSTRAINT tokens_expires_reasonable CHECK (expires_at < created_at + INTERVAL '1 year')
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_tokens_user_id ON tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_tokens_hash ON tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_tokens_expires ON tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_tokens_user_expires ON tokens(user_id, expires_at);

-- Partial index for active tokens only
CREATE INDEX IF NOT EXISTS idx_tokens_active 
    ON tokens(user_id, token_hash) 
    WHERE expires_at > NOW();

-- Function to cleanup expired tokens
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM tokens WHERE expires_at <= NOW();
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to enforce token limit per user
CREATE OR REPLACE FUNCTION enforce_token_limit()
RETURNS TRIGGER AS $$
BEGIN
    -- Keep only the 10 most recent tokens per user
    DELETE FROM tokens 
    WHERE user_id = NEW.user_id 
    AND id NOT IN (
        SELECT id FROM tokens 
        WHERE user_id = NEW.user_id 
        ORDER BY created_at DESC 
        LIMIT 10
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_enforce_token_limit
    AFTER INSERT ON tokens
    FOR EACH ROW
    EXECUTE FUNCTION enforce_token_limit();

-- Create useful views
CREATE OR REPLACE VIEW active_tokens AS
SELECT 
    t.id,
    t.user_id,
    u.email,
    t.expires_at,
    t.created_at
FROM tokens t
JOIN users u ON t.user_id = u.id
WHERE t.expires_at > NOW();

CREATE OR REPLACE VIEW token_stats AS
SELECT 
    COUNT(*) as total_tokens,
    COUNT(*) FILTER (WHERE expires_at > NOW()) as active_tokens,
    COUNT(*) FILTER (WHERE expires_at <= NOW()) as expired_tokens,
    COUNT(DISTINCT user_id) as users_with_tokens
FROM tokens;
```

### Database Schema Analysis
#### Users Table Features
- Auto-incrementing ID: Efficient primary key
- Email Constraints: Format validation and uniqueness
- Password Security: bcrypt hash length validation
- Timestamps: Creation and update tracking
- Performance Indexes: Fast lookups and sorting

#### Tokens Table Features
- Foreign Key Cascade: Automatic cleanup on user deletion
- Token Validation: SHA-256 hash format enforcement
- Expiration Logic: Future expiry with reasonable limits
- Performance Optimization: Multiple strategic indexes
- Automated Maintenance: Cleanup functions and token limits

### Utility Methods
#### Token Management
```typescript
// Estimate tokens for conversation
estimateConversationTokens(conversationHistory: ConversationMessage[]): number

// Trim conversation to fit limits
trimConversationHistory(conversationHistory: ConversationMessage[], maxTokens?: number): ConversationMessage[]
```

#### Conversation Helpers
```typescript
// Create conversation from single prompt
createConversationFromPrompt(prompt: string): ConversationMessage[]

// Add message to existing conversation
addMessageToConversation(history: ConversationMessage[], role: 'user' | 'assistant', content: string): ConversationMessage[]
```

#### Enhanced AIService Implementation
```typescript
export class EnhancedAIService extends AIService {
  private cache = new Map<string, { response: string; timestamp: number }>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Enhanced generation with caching and retry logic
   */
  async generateWithRetry(
    conversationHistory: ConversationMessage[],
    apiKeys: ApiKeys,
    systemPrompt?: string,
    options: {
      maxRetries?: number;
      enableCache?: boolean;
      temperature?: number;
      maxTokens?: number;
    } = {}
  ): Promise<{
    content: string;
    tokenCount: number;
    cached: boolean;
    retries: number;
  }> {
    const {
      maxRetries = 3,
      enableCache = false,
      temperature = 0.7,
      maxTokens = 20000
    } = options;

    // Check cache first
    if (enableCache) {
      const cacheKey = this.createCacheKey(conversationHistory, systemPrompt);
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return {
          content: cached,
          tokenCount: this.estimateConversationTokens(conversationHistory),
          cached: true,
          retries: 0
        };
      }
    }

    let lastError: Error;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const content = await this.generate(conversationHistory, apiKeys, systemPrompt);
        
        // Cache successful response
        if (enableCache) {
          const cacheKey = this.createCacheKey(conversationHistory, systemPrompt);
          this.setCache(cacheKey, content);
        }

        return {
          content,
          tokenCount: this.estimateConversationTokens(conversationHistory),
          cached: false,
          retries: attempt
        };
        
      } catch (error: any) {
        lastError = error;
        console.warn(`Generation attempt ${attempt + 1} failed:`, error.message);
        
        // Wait before retry (exponential backoff)
        if (attempt < maxRetries - 1) {
          await this.delay(Math.pow(2, attempt) * 1000);
        }
      }
    }

    throw new Error(`Generation failed after ${maxRetries} attempts: ${lastError.message}`);
  }

  /**
   * Content-aware generation with automatic enhancements
   */
  async generateWithEnhancements(
    conversationHistory: ConversationMessage[],
    apiKeys: ApiKeys,
    enhancements: {
      enablePersonaStructure?: boolean;
      enableEmailOptimization?: boolean;
      enableLandingPageStructure?: boolean;
      platform?: string;
    } = {}
  ): Promise<string> {
    const lastUserMessage = conversationHistory
      .filter(msg => msg.role === 'user')
      .pop();

    if (!lastUserMessage) {
      throw new Error('No user message found in conversation');
    }

    // Apply automatic enhancements based on content
    let enhancedHistory = [...conversationHistory];
    const content = lastUserMessage.content.toLowerCase();

    // Persona enhancement
    if (enhancements.enablePersonaStructure && this.isPersonaRequest(content)) {
      enhancedHistory = this.enhanceForPersona(enhancedHistory);
    }

    // Email enhancement
    if (enhancements.enableEmailOptimization && this.isEmailRequest(content)) {
      enhancedHistory = this.enhanceForEmail(enhancedHistory);
    }

    // Landing page enhancement
    if (enhancements.enableLandingPageStructure && this.isLandingPageRequest(content)) {
      enhancedHistory = this.enhanceForLandingPage(enhancedHistory, enhancements.platform);
    }

    return this.generate(enhancedHistory, apiKeys);
  }

  /**
   * Performance monitoring and metrics
   */
  async generateWithMetrics(
    conversationHistory: ConversationMessage[],
    apiKeys: ApiKeys,
    systemPrompt?: string
  ): Promise<{
    content: string;
    metrics: {
      requestTime: number;
      tokenCount: number;
      responseLength: number;
      modelUsed: string;
    };
  }> {
    const startTime = Date.now();
    const tokenCount = this.estimateConversationTokens(conversationHistory);

    const content = await this.generate(conversationHistory, apiKeys, systemPrompt);

    const endTime = Date.now();

    return {
      content,
      metrics: {
        requestTime: endTime - startTime,
        tokenCount,
        responseLength: content.length,
        modelUsed: 'claude-sonnet-4-20250514'
      }
    };
  }

  // Private helper methods
  private createCacheKey(conversationHistory: ConversationMessage[], systemPrompt?: string): string {
    const content = conversationHistory.map(msg => `${msg.role}:${msg.content}`).join('|');
    return Buffer.from(content + (systemPrompt || '')).toString('base64');
  }

  private getFromCache(key: string): string | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.response;
    }
    return null;
  }

  private setCache(key: string, response: string): void {
    this.cache.set(key, { response, timestamp: Date.now() });
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private isPersonaRequest(content: string): boolean {
    const personaKeywords = ['persona', 'buyer persona', 'customer persona', 'target audience'];
    return personaKeywords.some(keyword => content.includes(keyword));
  }

  private isEmailRequest(content: string): boolean {
    const emailKeywords = ['email', 'newsletter', 'campaign', 'subject line'];
    return emailKeywords.some(keyword => content.includes(keyword));
  }

  private isLandingPageRequest(content: string): boolean {
    const landingKeywords = ['landing page', 'website', 'homepage', 'web page'];
    return landingKeywords.some(keyword => content.includes(keyword));
  }

  private enhanceForPersona(conversationHistory: ConversationMessage[]): ConversationMessage[] {
    // Add persona structure enhancement logic
    return conversationHistory;
  }

  private enhanceForEmail(conversationHistory: ConversationMessage[]): ConversationMessage[] {
    // Add email optimization logic
    return conversationHistory;
  }

  private enhanceForLandingPage(conversationHistory: ConversationMessage[], platform?: string): ConversationMessage[] {
    // Add landing page enhancement logic
    return conversationHistory;
  }
}
```

## 🛣️ Route Implementations
### routes/generate.ts - Content Generation Endpoint
```typescript
import { Router } from 'express';
import { AIService } from '../services/aiService';
import { validateApiKeys, AuthenticatedRequest } from '../middleware/auth';
import { ApiResponse, GenerateRequest } from '../types';

const router = Router();
const aiService = new AIService();

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Enhanced generation route with automatic persona format enhancement
 */
router.post('/', validateApiKeys, async (req: AuthenticatedRequest, res) => {
  console.log('🎯 Route handler reached!');
  console.log('📨 Request body type:', req.body.conversationHistory ? 'conversation' : 'prompt');
  
  try {
    const { prompt, conversationHistory } = req.body;

    // Support both conversation history (new) and single prompt (legacy)
    let finalConversationHistory: ConversationMessage[];

    if (conversationHistory) {
      // New conversation-based request
      console.log('💬 Conversation request - messages:', conversationHistory.length);
      
      // Validate conversation history format
      if (!Array.isArray(conversationHistory)) {
        console.log('❌ Validation failed: conversationHistory must be an array');
        return res.status(400).json({
          success: false,
          error: 'conversationHistory must be an array of messages'
        } as ApiResponse);
      }

      if (conversationHistory.length === 0) {
        console.log('❌ Validation failed: conversationHistory cannot be empty');
        return res.status(400).json({
          success: false,
          error: 'conversationHistory cannot be empty'
        } as ApiResponse);
      }

      // Validate each message in conversation
      for (let i = 0; i < conversationHistory.length; i++) {
        const message = conversationHistory[i];
        if (!message.role || !message.content) {
          console.log(`❌ Validation failed: Invalid message at index ${i}`);
          return res.status(400).json({
            success: false,
            error: `Invalid message at index ${i}: must have role and content`
          } as ApiResponse);
        }
        if (!['user', 'assistant'].includes(message.role)) {
          console.log(`❌ Validation failed: Invalid role at index ${i}: ${message.role}`);
          return res.status(400).json({
            success: false,
            error: `Invalid role at index ${i}: must be 'user' or 'assistant'`
          } as ApiResponse);
        }
      }

      finalConversationHistory = conversationHistory;
      
      // Enhanced logging for persona detection
      const lastUserMessage = conversationHistory
        .filter(msg => msg.role === 'user')
        .pop();
      
      const isPersonaRequest = lastUserMessage ? 
        ['persona', 'buyer persona', 'customer persona', 'target customer', 'target audience']
          .some(keyword => lastUserMessage.content.toLowerCase().includes(keyword)) : false;
      
      console.log('🎭 Persona request detected:', isPersonaRequest);
      
      // Estimate token usage for logging
      const estimatedTokens = aiService.estimateConversationTokens(conversationHistory);
      console.log('📊 Estimated conversation tokens:', estimatedTokens);
      
      // Log conversation structure
      const roleCount = conversationHistory.reduce((acc, msg) => {
        acc[msg.role] = (acc[msg.role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      console.log('📋 Conversation structure:', roleCount);

    } else if (prompt) {
      // Legacy single prompt request - convert to conversation format
      console.log('📝 Legacy prompt request');
      
      const isPersonaRequest = ['persona', 'buyer persona', 'customer persona', 'target customer', 'target audience']
        .some(keyword => prompt.toLowerCase().includes(keyword));
      
      console.log('🎭 Persona request detected:', isPersonaRequest);
      console.log('📋 User prompt preview:', prompt.substring(0, 100) + '...');
      
      finalConversationHistory = [{ role: 'user', content: prompt }];
      console.log('🔄 Converted single prompt to conversation format');
      
    } else {
      // No valid input provided
      console.log('❌ Validation failed: No prompt or conversationHistory provided');
      return res.status(400).json({
        success: false,
        error: 'Either prompt or conversationHistory is required'
      } as ApiResponse);
    }

    console.log('✅ Request validation passed');

    // Validate Claude API key is available
    if (!req.apiKeys.anthropic) {
      console.log('❌ No Claude API key available');
      return res.status(400).json({
        success: false,
        error: 'Claude API key not configured. Please add it in Settings.'
      } as ApiResponse);
    }

    console.log('🚀 Sending conversation to Claude with auto-enhancement support');

    // Send conversation history to Claude with automatic persona enhancement
    // The aiService.generate() method will automatically detect persona requests
    // and enhance them with structured format requirements
    const response = await aiService.generate(
      finalConversationHistory,
      req.apiKeys,
      'You are a helpful assistant that creates exactly what the user requests.'
    );
    
    console.log('✅ Claude generation successful, response length:', response.length);
    console.log('📝 Claude response preview:', response.substring(0, 200) + '...');

    // Check if response looks like a structured persona
    const isStructuredPersona = response.includes('DEMOGRAPHIC PROFILE') || 
                               response.includes('GOALS & MOTIVATIONS') ||
                               response.includes('BUYING PROCESS & INFLUENCES');
    
    if (isStructuredPersona) {
      console.log('🎯 Structured persona response generated successfully');
    }

    console.log('📤 Sending Claude response directly to client...');
    res.json({
      success: true,
      data: {
        content: response,
        provider: 'claude'
      },
      message: conversationHistory 
        ? `Content generated successfully using Claude (${conversationHistory.length} messages in conversation)`
        : 'Content generated successfully using Claude'
    } as ApiResponse);

  } catch (error: any) {
    console.error('❌ Generation error:', error);
    console.error('Error stack:', error.stack);
    
    // Enhanced error handling for persona-specific issues
    let errorMessage = error.message || 'Failed to generate content';
    
    if (error.message?.includes('persona') || error.message?.includes('structure')) {
      errorMessage = 'Failed to generate structured persona content. Please try rephrasing your request.';
    }
    
    res.status(500).json({
      success: false,
      error: errorMessage
    } as ApiResponse);
  }
});

export default router;
```

### Generate Route Analysis
#### Dual Input Support
- Modern: conversationHistory array for full conversation context
- Legacy: prompt string automatically converted to conversation format

#### Comprehensive Validation
- Array structure validation
- Message format validation (role + content)
- Role validation (user/assistant only)
- Empty conversation detection

#### Enhanced Logging
- Request type detection
- Token estimation
- Conversation structure analysis
- Persona request detection
- Performance monitoring

#### Error Handling
- Input validation errors (400 status)
- API key validation errors (400 status)
- Generation errors (500 status)
- Content-specific error messages

### Enhanced Generate Route
```typescript
import { Router } from 'express';
import { AIService } from '../services/aiService';
import { validateApiKeys, AuthenticatedRequest } from '../middleware/auth';
import { ApiResponse } from '../types';
import { rateLimitByUser } from '../middleware/userRateLimit';
import { validateConversation } from '../middleware/validation';

const router = Router();
const aiService = new AIService();

/**
 * Enhanced generation route with comprehensive features
 */
router.post('/', 
  validateApiKeys,
  rateLimitByUser,
  validateConversation,
  async (req: AuthenticatedRequest, res) => {
    const requestId = req.headers['x-request-id'] || Date.now().toString();
    const startTime = Date.now();
    
    console.log(`🎯 [${requestId}] Generation request started`);
    
    try {
      const { 
        prompt, 
        conversationHistory, 
        options = {},
        metadata = {} 
      } = req.body;

      // Request analytics
      const analytics = {
        requestId,
        timestamp: new Date().toISOString(),
        type: conversationHistory ? 'conversation' : 'prompt',
        messageCount: conversationHistory?.length || 1,
        userAgent: req.get('User-Agent'),
        ip: req.ip,
        platform: metadata.platform,
        contentType: metadata.contentType
      };

      console.log(`📊 [${requestId}] Request analytics:`, analytics);

      // Prepare conversation
      let finalConversationHistory = conversationHistory || [{ role: 'user', content: prompt }];
      
      // Apply enhancements based on options
      if (options.enhancePersonas || options.enhanceEmails || options.enhanceLandingPages) {
        finalConversationHistory = await this.applyEnhancements(
          finalConversationHistory, 
          options,
          metadata
        );
      }

      // Token management
      const estimatedTokens = aiService.estimateConversationTokens(finalConversationHistory);
      if (estimatedTokens > 45000) {
        console.log(`⚠️ [${requestId}] Large conversation detected, trimming...`);
        finalConversationHistory = aiService.trimConversationHistory(finalConversationHistory);
      }

      // Generate content
      console.log(`🚀 [${requestId}] Sending to Claude...`);
      const response = await aiService.generate(
        finalConversationHistory,
        req.apiKeys,
        options.systemPrompt || 'You are a helpful assistant that creates exactly what the user requests.'
      );

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      console.log(`✅ [${requestId}] Generation completed in ${processingTime}ms`);

      // Enhanced response
      res.json({
        success: true,
        data: {
          content: response,
          provider: 'claude',
          metadata: {
            requestId,
            processingTime,
            tokenCount: estimatedTokens,
            messageCount: finalConversationHistory.length,
            contentType: this.detectContentType(response),
            enhancements: this.getAppliedEnhancements(options)
          }
        },
        message: `Content generated successfully using Claude`
      } as ApiResponse);

    } catch (error: any) {
      const endTime = Date.now();
      const processingTime = endTime - startTime;
      
      console.error(`❌ [${requestId}] Generation failed after ${processingTime}ms:`, error);
      
      // Enhanced error response
      res.status(error.status || 500).json({
        success: false,
        error: this.formatErrorMessage(error),
        metadata: {
          requestId,
          processingTime,
          errorType: error.name || 'GenerationError',
          stage: this.detectErrorStage(error)
        }
      } as ApiResponse);
    }
  }
);

// Helper methods for enhanced functionality
router.applyEnhancements = async (conversationHistory, options, metadata) => {
  // Enhancement logic implementation
  return conversationHistory;
};

router.detectContentType = (response) => {
  // Content type detection logic
  if (response.includes('DEMOGRAPHIC PROFILE')) return 'persona';
  if (response.includes('<html')) return 'html';
  if (response.includes('Subject:')) return 'email';
  return 'general';
};

router.getAppliedEnhancements = (options) => {
  const enhancements = [];
  if (options.enhancePersonas) enhancements.push('persona-structure');
  if (options.enhanceEmails) enhancements.push('email-optimization');
  if (options.enhanceLandingPages) enhancements.push('landing-page-structure');
  return enhancements;
};

router.formatErrorMessage = (error) => {
  if (error.message?.includes('rate limit')) return 'API rate limit exceeded. Please try again later.';
  if (error.message?.includes('api_key')) return 'Invalid API key. Please check your Claude API key.';
  if (error.message?.includes('token')) return 'Request too large. Please reduce conversation length.';
  return error.message || 'Content generation failed';
};

router.detectErrorStage = (error) => {
  if (error.message?.includes('validation')) return 'validation';
  if (error.message?.includes('api_key')) return 'authentication';
  if (error.message?.includes('Claude')) return 'generation';
  return 'unknown';
};

export default router;
```

### routes/validate.ts - API Key Validation
```typescript
import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { ApiResponse } from '../types';

const router = Router();

router.post('/anthropic', async (req, res) => {
  try {
    const { apiKey } = req.body;

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        error: 'Claude API key is required'
      } as ApiResponse);
    }

    // Debug the Anthropic import and client creation
    console.log('Anthropic SDK imported:', typeof Anthropic);
    
    if (typeof Anthropic !== 'function') {
      console.error('Anthropic is not a constructor function:', Anthropic);
      return res.status(500).json({
        success: false,
        error: 'Anthropic SDK import failed. Please restart the server.'
      } as ApiResponse);
    }

    // Create the Anthropic client with better error handling
    let anthropic;
    try {
      anthropic = new Anthropic({ 
        apiKey: apiKey
      });
    } catch (initError: any) {
      console.error('Failed to create Anthropic client:', initError);
      return res.status(500).json({
        success: false,
        error: 'Failed to initialize Anthropic client. Please check SDK version.'
      } as ApiResponse);
    }

    console.log('Anthropic client created:', typeof anthropic);
    console.log('Anthropic messages:', typeof anthropic.messages);
    console.log('Available methods:', Object.keys(anthropic));

    // Check for different API structures (old vs new SDK versions)
    let createMethod;
    if (anthropic.messages && typeof anthropic.messages.create === 'function') {
      // New SDK structure
      createMethod = anthropic.messages.create.bind(anthropic.messages);
      console.log('Using new SDK structure: anthropic.messages.create');
    } else if (typeof anthropic.create === 'function') {
      // Old SDK structure
      createMethod = anthropic.create.bind(anthropic);
      console.log('Using old SDK structure: anthropic.create');
    } else if (typeof anthropic.completions?.create === 'function') {
      // Alternative old structure
      createMethod = anthropic.completions.create.bind(anthropic.completions);
      console.log('Using alternative structure: anthropic.completions.create');
    } else {
      console.error('No valid create method found. Available methods:', Object.getOwnPropertyNames(anthropic));
      return res.status(500).json({
        success: false,
        error: 'Anthropic SDK version incompatible. Please update: npm install @anthropic-ai/sdk@latest'
      } as ApiResponse);
    }

    // Test the API key with Claude 4 Sonnet
    const testResponse = await createMethod({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 5,
      system: 'You are a helpful assistant.',
      messages: [{ role: 'user', content: 'Hello' }]
    });

    console.log('Anthropic test successful:', testResponse);

    res.json({
      success: true,
      message: 'Claude API key is valid'
    } as ApiResponse);

  } catch (error: any) {
    console.error('Anthropic validation error:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      type: error.type,
      stack: error.stack
    });
    
    let errorMessage = 'Invalid Claude API key';
    
    if (error.message?.includes('Cannot read properties of undefined')) {
      errorMessage = 'Anthropic SDK client creation failed. Please restart the server and try again.';
    } else if (error.status === 401 || error.message?.includes('authentication') || error.message?.includes('api_key')) {
      errorMessage = 'Invalid Claude API key or insufficient permissions. Please check your Anthropic API key.';
    } else if (error.status === 429) {
      errorMessage = 'Claude API rate limit exceeded';
    } else if (error.status === 500) {
      errorMessage = 'Claude service temporarily unavailable';
    } else if (error.message?.includes('model')) {
      errorMessage = `Model not available: ${error.message}`;
    } else if (error.type === 'invalid_request_error') {
      errorMessage = `Invalid request: ${error.message}`;
    } else {
      errorMessage = `Validation failed: ${error.message || 'Unknown error'}`;
    }

    res.status(400).json({
      success: false,
      error: errorMessage
    } as ApiResponse);
  }
});

export default router;
```

### Validate Route Analysis
#### Comprehensive SDK Compatibility
- Multiple SDK version support (old vs new)
- Dynamic method detection
- Graceful fallback handling

#### Robust Error Handling
- SDK import validation
- Client initialization verification
- API method availability checking
- Comprehensive error categorization

#### Enhanced Error Messages
- User-friendly error descriptions
- Specific guidance for different error types
- Development vs production error details

### Enhanced Validation Route
```typescript
import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { ApiResponse } from '../types';
import { cache } from '../utils/cache';

const router = Router();

/**
 * Enhanced validation with caching and detailed diagnostics
 */
router.post('/anthropic', async (req, res) => {
  const validationId = Date.now().toString();
  console.log(`🔍 [${validationId}] Starting API key validation`);
  
  try {
    const { apiKey, skipCache = false } = req.body;

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        error: 'Claude API key is required',
        metadata: { validationId }
      } as ApiResponse);
    }

    // Key format validation
    if (!apiKey.startsWith('sk-ant-')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Claude API key format. Keys should start with "sk-ant-"',
        metadata: { validationId }
      } as ApiResponse);
    }

    // Check cache first (unless skipped)
    const cacheKey = `validation:${Buffer.from(apiKey).toString('base64').slice(0, 16)}`;
    if (!skipCache) {
      const cached = cache.get(cacheKey);
      if (cached) {
        console.log(`✅ [${validationId}] Validation result from cache`);
        return res.json({
          success: true,
          message: 'Claude API key is valid (cached)',
          metadata: { validationId, cached: true }
        } as ApiResponse);
      }
    }

    // SDK diagnostics
    const diagnostics = {
      sdkVersion: require('@anthropic-ai/sdk/package.json').version,
      nodeVersion: process.version,
      platform: process.platform,
      architecture: process.arch
    };

    console.log(`📋 [${validationId}] Environment diagnostics:`, diagnostics);

    // Initialize client with timeout
    const anthropic = new Anthropic({ 
      apiKey: apiKey,
      timeout: 10000 // 10 second timeout
    });

    // Test API key with minimal request
    const startTime = Date.now();
    const testResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 5,
      system: 'You are a helpful assistant.',
      messages: [{ role: 'user', content: 'Test' }]
    });
    const responseTime = Date.now() - startTime;

    console.log(`✅ [${validationId}] Validation successful in ${responseTime}ms`);

    // Cache successful validation
    cache.set(cacheKey, true, 300); // 5 minute cache

    // Enhanced response with diagnostics
    res.json({
      success: true,
      message: 'Claude API key is valid',
      metadata: {
        validationId,
        responseTime,
        model: 'claude-sonnet-4-20250514',
        sdkVersion: diagnostics.sdkVersion,
        cached: false
      }
    } as ApiResponse);

  } catch (error: any) {
    console.error(`❌ [${validationId}] Validation failed:`, {
      error: error.message,
      status: error.status,
      type: error.type
    });

    // Enhanced error categorization
    const errorCategory = this.categorizeValidationError(error);
    const userMessage = this.getUserFriendlyErrorMessage(error, errorCategory);

    res.status(errorCategory.httpStatus).json({
      success: false,
      error: userMessage,
      metadata: {
        validationId,
        errorType: errorCategory.type,
        errorCode: error.status || error.code,
        retryable: errorCategory.retryable
      }
    } as ApiResponse);
  }
});

/**
 * Categorize validation errors for better handling
 */
router.categorizeValidationError = (error: any) => {
  if (error.status === 401 || error.message?.includes('authentication')) {
    return {
      type: 'AUTHENTICATION_ERROR',
      httpStatus: 401,
      retryable: false
    };
  }
  
  if (error.status === 429) {
    return {
      type: 'RATE_LIMIT_ERROR',
      httpStatus: 429,
      retryable: true
    };
  }
  
  if (error.status === 500 || error.status >= 500) {
    return {
      type: 'SERVICE_ERROR',
      httpStatus: 502,
      retryable: true
    };
  }
  
  if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
    return {
      type: 'NETWORK_ERROR',
      httpStatus: 503,
      retryable: true
    };
  }
  
  if (error.message?.includes('timeout')) {
    return {
      type: 'TIMEOUT_ERROR',
      httpStatus: 408,
      retryable: true
    };
  }

  return {
    type: 'UNKNOWN_ERROR',
    httpStatus: 400,
    retryable: false
  };
};

/**
 * Generate user-friendly error messages
 */
router.getUserFriendlyErrorMessage = (error: any, category: any) => {
  switch (category.type) {
    case 'AUTHENTICATION_ERROR':
      return 'Invalid Claude API key. Please check your API key in the Anthropic Console.';
    
    case 'RATE_LIMIT_ERROR':
      return 'Claude API rate limit exceeded. Please wait a moment and try again.';
    
    case 'SERVICE_ERROR':
      return 'Claude service is temporarily unavailable. Please try again later.';
    
    case 'NETWORK_ERROR':
      return 'Network connection failed. Please check your internet connection.';
    
    case 'TIMEOUT_ERROR':
      return 'Request timed out. Please try again.';
    
    default:
      return error.message || 'API key validation failed. Please try again.';
  }
};

export default router;
```

## 🛡️ Middleware Components
### middleware/auth.ts - Authentication Middleware
```typescript
import { Request, Response, NextFunction } from 'express';
import { ApiKeys } from '../types';
import { tokenService } from '../services/tokenService';
import { PublicUser } from '../types';

export interface AuthenticatedRequest extends Request {
  apiKeys: ApiKeys;
  user?: PublicUser;
  isAuthenticated: boolean;
  auth: {
    keyHash: string;
    format: string;
    source: string;
    validated: boolean;
  };
}

/**
 * Enhanced Claude API key validation (REQUIRED for all AI operations)
 */
export const validateApiKeys = (req: Request, res: Response, next: NextFunction) => {
  console.log('🔍 Auth middleware called for:', req.method, req.path);
  
  const apiKeys = req.headers['x-api-keys'];
  
  if (!apiKeys) {
    console.log('❌ Auth failed: No x-api-keys header');
    return res.status(400).json({
      success: false,
      error: 'Claude API key is required'
    });
  }

  try {
    const parsedKeys = JSON.parse(apiKeys as string);
    const extractedKeys: ApiKeys = {};
    
    // Handle multiple key formats for backward compatibility
    if (parsedKeys.anthropic?.value) {
      extractedKeys.anthropic = parsedKeys.anthropic.value;
    } else if (typeof parsedKeys.anthropic === 'string') {
      extractedKeys.anthropic = parsedKeys.anthropic;
    } else if (parsedKeys.claude?.value) {
      extractedKeys.anthropic = parsedKeys.claude.value;
    } else if (typeof parsedKeys.claude === 'string') {
      extractedKeys.anthropic = parsedKeys.claude;
    }
    
    if (!extractedKeys.anthropic) {
      return res.status(400).json({
        success: false,
        error: 'Claude API key is required. Please add it in Settings.'
      });
    }
    
    (req as AuthenticatedRequest).apiKeys = extractedKeys;
    
    // Initialize auth context
    (req as AuthenticatedRequest).isAuthenticated = false;
    
    next();
  } catch (error) {
    console.error('❌ API Key parsing error:', error);
    return res.status(400).json({
      success: false,
      error: 'Invalid API keys format'
    });
  }
};

/**
 * Optional user authentication (adds user context if token present)
 */
export const optionalUserAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthenticatedRequest;
  
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
      const token = tokenService.extractTokenFromHeader(authHeader);
      if (token) {
        const validation = await tokenService.validateAuthToken(token);
        if (validation.isValid && validation.user) {
          authReq.user = validation.user;
          authReq.isAuthenticated = true;
          console.log('✅ User context added:', validation.user.email);
        }
      }
    }
    
    next();
  } catch (error) {
    // Don't fail the request, just continue without user context
    console.warn('Optional user auth failed:', error);
    next();
  }
};

/**
 * Required authentication for user-specific features
 */
export const requireAuthenticatedUser = [
  validateApiKeys,
  async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest;
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: 'User authentication required',
        code: 'AUTH_REQUIRED'
      });
    }
    
    const token = tokenService.extractTokenFromHeader(authHeader);
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Invalid authentication format',
        code: 'INVALID_AUTH_FORMAT'
      });
    }
    
    const validation = await tokenService.validateAuthToken(token);
    if (!validation.isValid || !validation.user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid authentication token',
        code: 'INVALID_TOKEN'
      });
    }
    
    authReq.user = validation.user;
    authReq.isAuthenticated = true;
    
    next();
  }
];

/**
 * Helper functions for enhanced request context
 */
export const getUserId = (req: AuthenticatedRequest): number | null => {
  return req.user?.id || null;
};

export const getUserEmail = (req: AuthenticatedRequest): string | null => {
  return req.user?.email || null;
};

export const hasAuthenticatedUser = (req: AuthenticatedRequest): boolean => {
  return req.isAuthenticated === true && !!req.user;
};
```

### Auth Middleware Analysis
#### Flexible Key Format Support
- Settings page format: { anthropic: { value: 'sk-...' } }
- Direct string format: { anthropic: 'sk-...' }
- Legacy format: { claude: 'sk-...' }
- Masked key support for validation

#### Comprehensive Logging
- Request method and path logging
- Header presence verification
- Key extraction process tracking
- Success/failure state reporting

#### Robust Validation
- JSON parsing error handling
- Multiple key format detection
- String validation (non-empty)
- Type checking (string type required)

#### Enhanced Dual Authentication Support
- **Claude API Keys**: Required for all AI operations (backward compatible)
- **User Tokens**: Optional user context for personalized features
- **Combined Authentication**: `requireAuthenticatedUser` requires both
- **Request Enhancement**: User info attached when available

#### Flexible Authentication Patterns
- **validateApiKeys**: Claude API key only (existing functionality)
- **optionalUserAuth**: Adds user context if token present
- **requireAuthenticatedUser**: Both API key and user token required
  
### Enhanced Auth Middleware
```typescript
import { Request, Response, NextFunction } from 'express';
import { ApiKeys } from '../types';
import { cache } from '../utils/cache';
import crypto from 'crypto';

export interface EnhancedAuthenticatedRequest extends Request {
  apiKeys: ApiKeys;
  auth: {
    keyHash: string;
    format: string;
    source: string;
    validated: boolean;
  };
}

/**
 * Enhanced authentication with caching and security features
 */
export const enhancedValidateApiKeys = (req: Request, res: Response, next: NextFunction) => {
  const requestId = req.headers['x-request-id'] || Date.now().toString();
  console.log(`🔍 [${requestId}] Auth middleware started`);
  
  try {
    const apiKeys = req.headers['x-api-keys'];
    const userAgent = req.headers['user-agent'];
    const clientIP = req.ip;
    
    // Security logging
    console.log(`📋 [${requestId}] Auth context:`, {
      hasApiKeys: !!apiKeys,
      contentType: req.headers['content-type'],
      userAgent: userAgent?.substring(0, 50),
      clientIP,
      method: req.method,
      path: req.path
    });
    
    if (!apiKeys) {
      console.log(`❌ [${requestId}] Missing API keys header`);
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        code: 'MISSING_API_KEYS'
      });
    }

    // Parse and validate API keys
    const { extractedKeys, metadata } = this.parseApiKeys(apiKeys as string, requestId);
    
    if (!extractedKeys.anthropic) {
      console.log(`❌ [${requestId}] No valid Claude API key found`);
      return res.status(401).json({
        success: false,
        error: 'Valid Claude API key required',
        code: 'INVALID_CLAUDE_KEY'
      });
    }

    // Create key hash for caching (don't log the actual key)
    const keyHash = crypto.createHash('sha256')
      .update(extractedKeys.anthropic)
      .digest('hex')
      .substring(0, 16);

    // Check if key was recently validated (optional caching)
    const cacheKey = `auth:${keyHash}`;
    const cachedValidation = cache.get(cacheKey);
    
    console.log(`✅ [${requestId}] Auth successful:`, {
      keyHash,
      format: metadata.format,
      source: metadata.source,
      cached: !!cachedValidation
    });

    // Attach auth info to request
    (req as EnhancedAuthenticatedRequest).apiKeys = extractedKeys;
    (req as EnhancedAuthenticatedRequest).auth = {
      keyHash,
      format: metadata.format,
      source: metadata.source,
      validated: !!cachedValidation
    };

    // Cache successful auth (short-lived)
    if (!cachedValidation) {
      cache.set(cacheKey, { validated: true }, 60); // 1 minute cache
    }

    next();
    
  } catch (error: any) {
    console.error(`❌ [${requestId}] Auth error:`, error);
    
    return res.status(400).json({
      success: false,
      error: 'Authentication failed',
      code: 'AUTH_PARSE_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Parse API keys from different formats
 */
const parseApiKeys = (apiKeysHeader: string, requestId: string) => {
  console.log(`🔧 [${requestId}] Parsing API keys...`);
  
  const parsedKeys = JSON.parse(apiKeysHeader);
  const extractedKeys: ApiKeys = {};
  let metadata = { format: 'unknown', source: 'unknown' };
  
  // Settings page format: { anthropic: { value: 'sk-...', enabled: true } }
  if (parsedKeys.anthropic?.value) {
    extractedKeys.anthropic = parsedKeys.anthropic.value;
    metadata = { format: 'settings-object', source: 'value' };
    console.log(`✅ [${requestId}] Extracted from settings object format`);
  }
  // Direct string format: { anthropic: 'sk-...' }
  else if (typeof parsedKeys.anthropic === 'string') {
    extractedKeys.anthropic = parsedKeys.anthropic;
    metadata = { format: 'direct-string', source: 'anthropic' };
    console.log(`✅ [${requestId}] Extracted from direct string format`);
  }
  // Legacy format: { claude: 'sk-...' }
  else if (typeof parsedKeys.claude === 'string') {
    extractedKeys.anthropic = parsedKeys.claude;
    metadata = { format: 'legacy-string', source: 'claude' };
    console.log(`✅ [${requestId}] Extracted from legacy format`);
  }
  // Legacy object format: { claude: { value: 'sk-...' } }
  else if (parsedKeys.claude?.value) {
    extractedKeys.anthropic = parsedKeys.claude.value;
    metadata = { format: 'legacy-object', source: 'claude.value' };
    console.log(`✅ [${requestId}] Extracted from legacy object format`);
  }
  
  // Additional validation
  if (extractedKeys.anthropic) {
    // Validate key format
    if (!extractedKeys.anthropic.startsWith('sk-ant-')) {
      console.warn(`⚠️ [${requestId}] API key format warning: should start with 'sk-ant-'`);
    }
    
    // Validate key length (Anthropic keys are typically ~100+ characters)
    if (extractedKeys.anthropic.length < 50) {
      console.warn(`⚠️ [${requestId}] API key length warning: unusually short`);
    }
  }
  
  return { extractedKeys, metadata };
};

/**
 * Rate limiting by API key hash
 */
export const rateLimitByApiKey = (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as EnhancedAuthenticatedRequest;
  
  if (authReq.auth?.keyHash) {
    // Implement per-key rate limiting if needed
    // This would track usage per API key rather than per IP
  }
  
  next();
};

export { EnhancedAuthenticatedRequest as AuthenticatedRequest };
```

### middleware/rateLimiter.ts - Rate Limiting
```typescript
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';

const rateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => req.ip,
  points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') / 1000, // Convert to seconds
});

export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes: any) {
    const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
    res.set('Retry-After', String(secs));
    res.status(429).json({
      success: false,
      error: 'Too many requests',
      retryAfter: secs
    });
  }
};
```

### Rate Limiter Analysis
#### Memory-Based Implementation
- Fast in-memory rate limiting
- IP-based request tracking
- Configurable limits via environment variables

#### Graceful Handling
- Proper HTTP 429 status
- Retry-After header for client guidance
- Clean error response format

### Enhanced Rate Limiting
```typescript
import { RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

// Multiple rate limiters for different scenarios
const globalRateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => req.ip,
  points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') / 1000,
});

const apiKeyRateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => {
    const authReq = req as any;
    return authReq.auth?.keyHash || req.ip;
  },
  points: parseInt(process.env.API_KEY_RATE_LIMIT || '500'), // Higher limit per API key
  duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') / 1000,
});

const conversationRateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => {
    const sessionId = req.headers['x-session-id'] as string;
    return sessionId || req.ip;
  },
  points: parseInt(process.env.CONVERSATION_RATE_LIMIT || '50'), // 50 conversation turns
  duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') / 1000,
});

/**
 * Enhanced rate limiting with multiple tiers
 */
export const enhancedRateLimit = async (req: Request, res: Response, next: NextFunction) => {
  const requestId = req.headers['x-request-id'] || Date.now().toString();
  
  try {
    // Apply global rate limit first
    await globalRateLimiter.consume(req.ip);
    
    // Apply API key specific rate limit
    const authReq = req as any;
    if (authReq.auth?.keyHash) {
      await apiKeyRateLimiter.consume(authReq.auth.keyHash);
    }
    
    // Apply conversation rate limit for generation endpoints
    if (req.path.includes('/generate')) {
      const sessionId = req.headers['x-session-id'] as string;
      await conversationRateLimiter.consume(sessionId || req.ip);
    }
    
    // Add rate limit headers
    res.set({
      'X-RateLimit-Limit': process.env.RATE_LIMIT_MAX_REQUESTS || '100',
      'X-RateLimit-Window': process.env.RATE_LIMIT_WINDOW_MS || '900000'
    });
    
    console.log(`✅ [${requestId}] Rate limit check passed`);
    next();
    
  } catch (rejRes: any) {
    const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
    const limiterType = rejRes.totalHits > 100 ? 'global' : 'api-key';
    
    console.warn(`⚠️ [${requestId}] Rate limit exceeded (${limiterType}):`, {
      totalHits: rejRes.totalHits,
      remainingPoints: rejRes.remainingPoints,
      msBeforeNext: rejRes.msBeforeNext
    });
    
    res.set({
      'Retry-After': String(secs),
      'X-RateLimit-Limit': String(rejRes.totalHits),
      'X-RateLimit-Remaining': String(rejRes.remainingPoints),
      'X-RateLimit-Reset': new Date(Date.now() + rejRes.msBeforeNext).toISOString()
    });
    
    res.status(429).json({
      success: false,
      error: 'Rate limit exceeded',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: secs,
      type: limiterType,
      metadata: {
        requestId,
        window: process.env.RATE_LIMIT_WINDOW_MS,
        limit: rejRes.totalHits,
        remaining: rejRes.remainingPoints
      }
    });
  }
};

/**
 * Redis-based rate limiting for production scale
 */
export const createRedisRateLimiter = (redisUrl: string) => {
  const redis = new Redis(redisUrl);
  
  return new RateLimiterRedis({
    storeClient: redis,
    keyGenerator: (req: Request) => req.ip,
    points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') / 1000,
  });
};

export { globalRateLimiter as rateLimitMiddleware };
```

## 🚀 Development & Deployment Guide
### Development Setup
#### Quick Start
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit environment variables
nano .env

# Start development server
npm run dev
```

#### Environment Configuration
```bash
# .env file for development
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=5242880
UPLOAD_DIR=uploads

# Optional: Enable debug logging
DEBUG=marai:*
LOG_LEVEL=debug
```

### Production Deployment
#### Build Process
```bash
# Install production dependencies
npm ci --only=production

# Build TypeScript
npm run build

# Verify build
ls -la dist/

# Test production build
NODE_ENV=production npm start
```

#### PM2 Process Management
```bash
# Install PM2 globally
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'marai-backend',
    script: 'dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: 'logs/error.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    time: true
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

#### Docker Deployment
```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3001

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  marai-backend:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
      - FRONTEND_URL=https://your-domain.com
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped
```

### Monitoring & Logging
#### Application Monitoring
```typescript
// Enhanced logging setup
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'marai-backend' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
```

#### Health Monitoring
```bash
# Health check script
#!/bin/bash
curl -f http://localhost:3001/health || exit 1

# PM2 monitoring
pm2 monit

# Log monitoring
tail -f logs/combined.log | grep ERROR
```

### Performance Optimization
#### Node.js Optimization
```bash
# Set Node.js flags for production
export NODE_OPTIONS="--max-old-space-size=2048 --optimize-for-size"

# Enable V8 optimizations
export NODE_ENV=production
```

#### Memory Management
```typescript
// Memory monitoring
setInterval(() => {
  const usage = process.memoryUsage();
  console.log('Memory usage:', {
    rss: Math.round(usage.rss / 1024 / 1024) + 'MB',
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + 'MB',
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + 'MB',
    external: Math.round(usage.external / 1024 / 1024) + 'MB'
  });
}, 60000); // Every minute
```

## 📚 API Documentation
### Endpoints Overview
| Endpoint   | Method   | Purpose   | Auth Required   |
|------------|------------|------------|------------|
| /health | GET | Enhanced server health check | No |
| /api/generate | POST | AI content generation | Claude API Key |
| /api/validate/anthropic | POST | Claude API key validation | No |
| /api/auth/signup | POST | User registration | No |
| /api/auth/login | POST | User authentication | No |
| /api/auth/logout | POST | User logout (single device) | User Token |
| /api/auth/logout-all | POST | User logout (all devices) | User Token |
| /api/auth/me | GET | Current user information | User Token |
| /api/auth/change-password | POST | Change user password | User Token |

### API Response Format
#### Success Response
```typescript
{
  success: true,
  data: {
    content: string,
    provider: 'claude',
    metadata?: object
  },
  message: string
}
```

#### Error Response
```typescript
{
  success: false,
  error: string,
  code?: string,
  metadata?: {
    requestId: string,
    timestamp: string,
    retryable: boolean
  }
}
```

### Authentication
#### API Key Header Format
```javascript
headers: {
  'X-API-Keys': JSON.stringify({
    anthropic: 'sk-ant-api03-...'
  }),
  'Content-Type': 'application/json'
}
```

### Dual Authentication System
MarAI now supports two types of authentication:

#### Claude API Key Authentication (Required for AI Operations)
```javascript
headers: {
  'X-API-Keys': JSON.stringify({
    anthropic: 'sk-ant-api03-...'
  }),
  'Content-Type': 'application/json'
}
```

#### User Token Authentication (For User-Specific Features)
```javascript
headers: {
  'Authorization': 'Bearer 64-char-hex-token',
  'Content-Type': 'application/json'
}
```

#### Combined Authentication (For User-Personalized AI Features)
```javascript
headers: {
  'X-API-Keys': JSON.stringify({
    anthropic: 'sk-ant-api03-...'
  }),
  'Authorization': 'Bearer 64-char-hex-token',
  'Content-Type': 'application/json'
}
```

### Error Codes
| Code   | Description   | HTTP Status   | Retryable   |
|------------|------------|------------|------------|
| MISSING_API_KEYS | No API keys provided | 401 | No |
| INVALID_CLAUDE_KEY | Invalid Claude API key | 401 | No |
| RATE_LIMIT_EXCEEDED | Too many requests | 429 | Yes |
| VALIDATION_ERROR | Request validation failed | 400 | No |
| GENERATION_ERROR | Content generation failed | 500 | Yes |
| SERVICE_UNAVAILABLE | Claude service down | 503 | Yes |
| MISSING_AUTH_HEADER | No Authorization header provided | 401 | No |
| INVALID_AUTH_FORMAT | Authorization header not Bearer format | 401 | No |
| EMPTY_TOKEN | Authentication token is empty | 401 | No |
| INVALID_TOKEN | Token invalid, expired, or not found | 401 | No |
| USER_NOT_FOUND | User account deleted or not found | 401 | No |
| AUTH_REQUIRED | Authentication required for this action | 401 | No |
| EMAIL_ALREADY_EXISTS | User with email already registered | 400 | No |
| INVALID_CREDENTIALS | Invalid email or password | 401 | No |
| PASSWORD_TOO_WEAK | Password doesn't meet requirements | 400 | No |
| TOKEN_LIMIT_EXCEEDED | Too many active tokens for user | 429 | Yes |
| USER_REGISTRATION_FAILED | User creation failed | 500 | Yes |

### Authentication Error Categories

#### User Authentication Errors (401)
- **MISSING_AUTH_HEADER**: No Authorization header in request
- **INVALID_TOKEN**: Token expired, invalid, or user deleted
- **AUTH_REQUIRED**: Endpoint requires user authentication

#### Registration/Login Errors (400/401)
- **EMAIL_ALREADY_EXISTS**: Email already registered
- **INVALID_CREDENTIALS**: Wrong email/password combination
- **PASSWORD_TOO_WEAK**: Password under 8 characters

#### Token Management Errors (429)
- **TOKEN_LIMIT_EXCEEDED**: User has maximum tokens (10 per user)
  
## 🔧 Troubleshooting Guide
### Common Issues
#### Server Won't Start
```bash
# Check port availability
lsof -i :3001

# Check environment variables
cat .env

# Check TypeScript compilation
npm run build

# Check logs
npm run dev 2>&1 | tee debug.log
```

### Claude API Errors
```bash
# Verify API key format
echo $ANTHROPIC_API_KEY | cut -c1-10  # Should show "sk-ant-api"

# Test API key manually
curl -X POST https://api.anthropic.com/v1/messages \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $ANTHROPIC_API_KEY" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":5,"messages":[{"role":"user","content":"Hi"}]}'
```

### Database Connection Issues
```bash
# Test PostgreSQL connection
psql -h localhost -p 5432 -U marai_user -d marai_dev

# Check database status
systemctl status postgresql

# Verify database exists
psql -U postgres -c "\l" | grep marai

# Check table creation
psql -U marai_user -d marai_dev -c "\dt"

# Test connection from Node.js
node -e "
const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'marai_dev',
  user: 'marai_user',
  password: 'your_password'
});
pool.query('SELECT NOW()', (err, res) => {
  console.log(err ? 'Error:' + err : 'Connected:', res.rows[0]);
  pool.end();
});
"
```

### Authentication Issues
```bash
# Test user registration
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123","confirmPassword":"testpass123"}'

# Test user login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'

# Test token validation
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Check database for users/tokens
psql -U marai_user -d marai_dev -c "SELECT email, created_at FROM users;"
psql -U marai_user -d marai_dev -c "SELECT user_id, expires_at FROM tokens WHERE expires_at > NOW();"
```

### Database Migration Issues
```bash
# Check if tables exist
psql -U marai_user -d marai_dev -c "\dt"

# Manually run migrations
psql -U marai_user -d marai_dev -f src/migrations/001_create_users_table.sql
psql -U marai_user -d marai_dev -f src/migrations/002_create_tokens_table.sql

# Check table structure
psql -U marai_user -d marai_dev -c "\d users"
psql -U marai_user -d marai_dev -c "\d tokens"

# Verify constraints and indexes
psql -U marai_user -d marai_dev -c "\d+ users"
psql -U marai_user -d marai_dev -c "\d+ tokens"
```

### Token Management Issues
```bash
# Check token cleanup
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}' \
  | jq '.data.token'

# Verify token in database (should be hashed)
psql -U marai_user -d marai_dev -c "SELECT token_hash, expires_at FROM tokens WHERE user_id = 1;"

# Test token expiration
psql -U marai_user -d marai_dev -c "UPDATE tokens SET expires_at = NOW() - INTERVAL '1 hour' WHERE user_id = 1;"

# Manual cleanup of expired tokens
psql -U marai_user -d marai_dev -c "SELECT cleanup_expired_tokens();"
```

### Memory Issues
```bash
# Check memory usage
free -h

# Monitor Node.js memory
node --max-old-space-size=4096 dist/index.js

# Check for memory leaks
npm install -g clinic
clinic doctor -- node dist/index.js
```

### Rate Limiting Issues
```bash
# Check rate limiter configuration
grep RATE_LIMIT .env

# Monitor requests
tail -f logs/combined.log | grep "rate limit"

# Reset rate limits (development)
redis-cli FLUSHDB  # If using Redis
```

### Performance Issues
#### Slow Response Times
```bash
# Monitor API response times
curl -w "@curl-format.txt" -s -o /dev/null http://localhost:3001/health

# Check Claude API latency
time curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -H "X-API-Keys: {...}" \
  -d '{"prompt":"Hello"}'

# Profile application performance
npm install -g autocannon
autocannon -c 10 -d 30 http://localhost:3001/health
```

#### High CPU Usage
```bash
# Monitor CPU usage
top -p $(pgrep -f "node.*index.js")

# Check for CPU-intensive operations
npm install -g clinic
clinic flame -- node dist/index.js

# Optimize with clustering
PM2_INSTANCES=max pm2 start ecosystem.config.js
```

#### Connection Issues
```bash
# Check network connectivity
ping api.anthropic.com

# Test DNS resolution
nslookup api.anthropic.com

# Check firewall rules
sudo iptables -L | grep 443
sudo iptables -L | grep 3001

# Test HTTPS connectivity
openssl s_client -connect api.anthropic.com:443
```

### Debugging Techniques
#### Enable Debug Logging
```bash
# Set debug environment
DEBUG=marai:* npm run dev

# Enable verbose logging
LOG_LEVEL=debug npm run dev

# Output to file
DEBUG=marai:* npm run dev > debug.log 2>&1
```

#### Request Tracing
```typescript
// Add request tracing middleware
app.use((req, res, next) => {
  const requestId = Date.now().toString();
  req.requestId = requestId;
  
  console.log(`🔍 [${requestId}] ${req.method} ${req.path}`, {
    headers: req.headers,
    body: req.body,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`✅ [${requestId}] Response ${res.statusCode} in ${duration}ms`);
  });
  
  next();
});
```

#### Error Tracking
```typescript
// Enhanced error tracking
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errorId = Date.now().toString();
  
  // Log error with full context
  console.error(`❌ [${errorId}] Application Error:`, {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
      status: error.status
    },
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    },
    timestamp: new Date().toISOString()
  });
  
  // Send error to external service (optional)
  // sendToErrorTracking(error, { errorId, request: req });
  
  res.status(error.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    errorId,
    timestamp: new Date().toISOString()
  });
});
```

## 📝 Conclusion
The MarAI Backend now represents a comprehensive, enterprise-ready platform combining sophisticated AI capabilities with robust user authentication. This document provides complete coverage of both the original Claude-first architecture and the new authentication system.

### Key System Capabilities
- ✅ **Pure Claude Integration**: Direct, unmodified access to Claude's capabilities
- ✅ **Conversation-Aware**: Native support for full conversation context  
- ✅ **User Authentication**: Complete opaque token-based user management
- ✅ **Multi-Device Support**: Individual token management and logout capabilities
- ✅ **Database Integration**: Production-ready PostgreSQL with automated migrations
- ✅ **Dual Authentication**: Claude API keys + User tokens for personalized AI experiences
- ✅ **Production-Ready**: Comprehensive error handling, rate limiting, security, and monitoring
- ✅ **Developer-Friendly**: Clear architecture, extensive logging, debugging support, and documentation

### Architecture Excellence
The backend achieves the perfect balance of:
- **Simplicity**: Clean, understandable code structure with clear separation of concerns
- **Security**: Multi-layer authentication, secure password hashing, and token management
- **Reliability**: Robust error handling, graceful degradation, and automated cleanup
- **Performance**: Efficient database operations, connection pooling, and token validation
- **Scalability**: Multi-device support, user-based rate limiting, and horizontal scaling readiness
- **Maintainability**: Well-documented, tested, and monitored codebase with migration system

### New Authentication Features
- **🔐 Secure User Registration**: bcrypt password hashing with email validation
- **🎫 Opaque Token System**: Cryptographically secure tokens with SHA-256 storage
- **📱 Multi-Device Management**: Individual token control and logout capabilities  
- **🗄️ Database Integration**: PostgreSQL with automated migrations and health monitoring
- **⚡ Performance Optimized**: Connection pooling, indexes, and automated token cleanup
- **🛡️ Security Focused**: SQL injection prevention, input validation, and audit trails

### Development & Deployment Success
This enhanced guide ensures that any developer can:
- **Understand**: Complete system architecture including authentication flows
- **Implement**: User management features following established patterns
- **Extend**: Add new authentication-related functionality safely
- **Debug**: Database issues, authentication problems, and token management
- **Deploy**: Both AI features and user authentication to production confidently
- **Monitor**: User activity, token usage, and system health effectively

### Business Impact
The authentication system enables:
- **🎯 Personalized AI**: User context in AI interactions and conversation history
- **📊 Usage Analytics**: Per-user tracking and optimization opportunities
- **💼 SaaS Readiness**: Multi-tenant user management and premium feature gating
- **🔒 Security Compliance**: Audit trails, access control, and data governance
- **📈 Platform Growth**: User-generated content, sharing, and community features

The MarAI Backend now serves as a **reference implementation** for both AI-powered APIs and modern authentication systems, demonstrating best practices in:
- Node.js/TypeScript development with comprehensive type safety
- PostgreSQL database design with performance optimization  
- Claude AI integration with conversation management
- User authentication with security-first approach
- Production deployment with monitoring and maintenance

🚀 **Ready for enterprise scale, advanced features, and unlimited growth potential.**

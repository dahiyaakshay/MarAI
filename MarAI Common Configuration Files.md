# MarAI Common Configuration Files - Complete Developer Guide

- **🎯 Purpose:** Comprehensive guide to MarAI's shared configuration files for future updates and maintenance
- **👥 Target Audience:** Developers, DevOps engineers, and project maintainers

## 📁 File Structure Overview
<pre>MarAI/ (Root - Common Files)
├── .gitignore              # Git ignore patterns
├── eslint.config.js        # ESLint linting configuration  
├── index.html              # HTML entry point for frontend
├── package.json            # Frontend dependencies & scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.app.json       # TypeScript config for app source
├── tsconfig.json           # Root TypeScript configuration
├── tsconfig.node.json      # TypeScript config for tooling
├── vite.config.ts          # Vite build tool configuration
└── public/assets/generator-assets/  # Template assets (example included)</pre>

## 🔧 Configuration Files Deep Dive
### 1. .gitignore - Version Control Exclusions
```bash
# Dependencies
node_modules/
package-lock.json

# Build output  
dist/
build/

# Environment variables
.env*

# Logs & Runtime
logs, *.log, pids, *.pid

# IDE & OS files
.vscode/, .idea/, .DS_Store, Thumbs.db
```

### Purpose & Management
- Prevents sensitive data from being committed (API keys, environment variables)
- Excludes build artifacts and dependencies from version control
- Maintains clean repository by ignoring temporary and generated files

### Modification Guidelines
```bash
# Adding new exclusions
echo "new-folder-to-ignore/" >> .gitignore

# Common additions for MarAI:
uploads/                    # User uploaded files
*.env.*                    # Additional environment files
coverage/                  # Test coverage reports
.cache/                   # Build cache directories
```

### ⚠️ Critical Notes
- Never commit .env files containing API keys
- Always exclude node_modules/ and build directories
- Review regularly to ensure no sensitive data is tracked

### 2. eslint.config.js - Code Quality & Standards
```javascript
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  }
);
```

### Configuration Breakdown
- Modern Flat Config: Uses new ESLint flat config format (ESLint 9+)
- TypeScript Support: Full TypeScript linting with recommended rules
- React Integration: React Hooks linting and React Refresh compatibility
- Browser Globals: Configured for browser environment

### Customization Options
### Adding New Rules
```javascript
rules: {
  ...reactHooks.configs.recommended.rules,
  'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  
  // Custom MarAI rules
  '@typescript-eslint/no-unused-vars': 'error',
  '@typescript-eslint/explicit-function-return-type': 'warn',
  'react-hooks/exhaustive-deps': 'error',
  'no-console': 'warn',
  'prefer-const': 'error'
}
```

### Adding New Plugins
```javascript
import importPlugin from 'eslint-plugin-import';

plugins: {
  'react-hooks': reactHooks,
  'react-refresh': reactRefresh,
  'import': importPlugin  // New plugin
}
```

### Common Modifications for MarAI
```javascript
// For AI/ML specific linting
rules: {
  'no-await-in-loop': 'warn',           // Important for API calls
  'no-floating-promises': 'error',      // Critical for async operations
  'prefer-template': 'error',           // Better string handling
  'max-len': ['warn', { code: 120 }]    // Readable code lines
}
```

### 3. index.html - Application Entry Point
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Complete Marketing Tool</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Key Components
- DOCTYPE: HTML5 standard declaration
- Meta Tags: Character encoding and responsive viewport
- Title: Application title (appears in browser tab)
- Root Div: React application mount point
- Script: Vite entry point for TypeScript React

### Customization Options
### Adding SEO & Performance
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="MarAI - Complete Marketing Automation Platform" />
  <meta name="keywords" content="marketing, AI, automation, email, landing pages" />
  <meta name="author" content="MarAI Team" />
  
  <!-- Performance Hints -->
  <link rel="preconnect" href="https://api.anthropic.com" />
  <link rel="dns-prefetch" href="https://api.anthropic.com" />
  
  <!-- PWA Support -->
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#2563eb" />
  
  <!-- Custom Favicon -->
  <link rel="icon" type="image/svg+xml" href="/marai-icon.svg" />
  <link rel="icon" type="image/png" href="/marai-icon.png" />
  
  <title>MarAI - AI-Powered Marketing Platform</title>
</head>
```

### Adding Analytics & Monitoring
```html
<head>
  <!-- ... existing meta tags ... -->
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  </script>
  
  <!-- Error Monitoring -->
  <script src="https://browser.sentry-cdn.com/7.x.x/bundle.min.js"></script>
</head>
```

### 4. package.json - Frontend Dependencies & Scripts
```json
{
  "name": "vite-react-typescript-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build", 
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "exceljs": "^4.4.0",
    "file-saver": "^2.0.5", 
    "jspdf": "^3.0.1",
    "jspdf-autotable": "^5.0.2",
    "jszip": "^3.10.1",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": { /* ... */ }
}
```

### Dependencies Analysis
### Production Dependencies
| Package   | Purpose   | MarAI Usage   |
|------------|------------|------------|
| react & react-dom | Core React framework | Frontend UI framework |
| lucide-react | Icon library | UI icons throughout app |
| exceljs | Excel file manipulation | Export features for Content Creator |
| file-saver | File download functionality | Export downloaded files |
| jspdf & jspdf-autotable | PDF generation | PDF export capabilities |
| jszip | ZIP file creation | Bulk export functionality |

### Development Dependencies
| Package   | Purpose   | MarAI Usage   |
|------------|------------|------------|
| vite | Build tool and dev server | Fast development and building |
| typescript | Type checking | Type safety across codebase |
| eslint | Code linting | Code quality enforcement |
| tailwindcss | CSS framework | Styling and responsive design |
| @vitejs/plugin-react | Vite React integration | React support in Vite |

### Script Commands
### Available Scripts
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint code analysis
npm run preview   # Preview production build locally
```

### Adding New Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    
    // Additional MarAI-specific scripts
    "lint:fix": "eslint . --fix",
    "type-check": "tsc --noEmit",
    "build:analyze": "vite build --mode analyze",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "format": "prettier --write .",
    "clean": "rm -rf dist node_modules/.vite",
    "deps:update": "npm update && npm audit fix"
  }
}
```

### Dependency Management
### Adding New Dependencies
```bash
# Production dependencies (included in build)
npm install axios react-router-dom @tanstack/react-query

# Development dependencies (build tools only)
npm install -D vitest @testing-library/react prettier

# Specific versions for stability
npm install react@18.3.1 typescript@5.5.3
```

### Security & Updates
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies safely
npm update

# Check outdated packages
npm outdated
```

### 5. postcss.config.js - CSS Processing
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Purpose & Functionality
- Tailwind Integration: Processes Tailwind CSS directives
- Autoprefixer: Adds vendor prefixes for browser compatibility
- PostCSS Pipeline: Transforms CSS during build process

### Advanced Configuration
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    
    // Additional plugins for MarAI
    'postcss-import': {},                    // CSS imports
    'postcss-nested': {},                    // Nested CSS rules
    'postcss-custom-properties': {},         // CSS variables
    'cssnano': process.env.NODE_ENV === 'production' ? {} : false,  // Minification
    
    // Responsive design helpers
    'postcss-responsive-type': {
      responsive: {
        'font-size': {
          mobile: '14px',
          tablet: '16px',
          desktop: '18px'
        }
      }
    }
  },
};
```

### 6. tailwind.config.js - Styling Framework
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Configuration Breakdown
- Content Paths: Files to scan for Tailwind classes
- Theme Extension: Custom design system modifications
- Plugins: Additional Tailwind functionality


### MarAI-Specific Customizations
### Brand Colors & Design System
```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // MarAI Brand Colors
      colors: {
        'marai': {
          50: '#eff6ff',
          100: '#dbeafe', 
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
      },
      
      // Custom Fonts
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'heading': ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      
      // Spacing for Components
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Animation for UI Elements  
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
    // UI Component Plugins
    require('@tailwindcss/forms'),           // Better form styling
    require('@tailwindcss/typography'),      // Prose styling for content
    require('@tailwindcss/aspect-ratio'),    // Aspect ratio utilities
    
    // Custom MarAI Components
    function({ addComponents }) {
      addComponents({
        '.btn-primary': {
          '@apply bg-marai-600 hover:bg-marai-700 text-white font-medium py-2 px-4 rounded-lg transition-colors': {},
        },
        '.card': {
          '@apply bg-white rounded-lg shadow-md border border-gray-200 p-6': {},
        },
        '.form-input': {
          '@apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marai-500': {},
        }
      })
    }
  ],
};
```

### Responsive Design Configuration
```javascript
theme: {
  screens: {
    'xs': '475px',      // Extra small devices
    'sm': '640px',      // Small devices (phones)
    'md': '768px',      // Medium devices (tablets)
    'lg': '1024px',     // Large devices (laptops)
    'xl': '1280px',     // Extra large devices (desktops)
    '2xl': '1536px',    // 2X large devices (large desktops)
  },
}
```

### 7. TypeScript Configuration Files
### tsconfig.json - Root Configuration
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

**Purpose:** Project references setup for monorepo-style TypeScript configuration

### tsconfig.app.json - Application Source Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### Enhanced TypeScript Configuration for MarAI
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force", 
    "noEmit": true,
    "jsx": "react-jsx",
    
    /* Path mapping for cleaner imports */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/services/*": ["src/services/*"],
      "@/types/*": ["src/types/*"],
      "@/utils/*": ["src/utils/*"],
      "@/assets/*": ["src/assets/*"]
    },
    
    /* Enhanced linting for AI application */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    
    /* Better error reporting */
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    
    /* Performance optimizations */
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  },
  "include": ["src", "src/**/*.d.ts"],
  "exclude": ["node_modules", "dist", "build"]
}
```

### tsconfig.node.json - Tooling Configuration
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext", 
    "skipLibCheck": true,
    
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

**Purpose:** Separate configuration for Node.js tooling (Vite, build scripts)

### 8. vite.config.ts - Build Tool Configuration
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### Configuration Enhancement for MarAI
```typescript
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react({
        // React Fast Refresh configuration
        fastRefresh: true,
        // JSX runtime configuration
        jsxRuntime: 'automatic',
      }),
    ],
    
    // Path resolution for cleaner imports
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@/components': path.resolve(__dirname, './src/components'),
        '@/services': path.resolve(__dirname, './src/services'),
        '@/types': path.resolve(__dirname, './src/types'),
        '@/utils': path.resolve(__dirname, './src/utils'),
        '@/assets': path.resolve(__dirname, './src/assets'),
      },
    },
    
    // Development server configuration
    server: {
      port: 5173,
      host: true, // Allow external connections
      cors: true,
      proxy: {
        // Proxy API calls to backend server
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    
    // Build optimization
    build: {
      // Output directory
      outDir: 'dist',
      
      // Generate source maps for debugging
      sourcemap: mode === 'development',
      
      // Asset handling
      assetsDir: 'assets',
      
      // Chunk size warnings
      chunkSizeWarningLimit: 1000,
      
      // Rollup options for advanced bundling
      rollupOptions: {
        output: {
          // Manual chunks for better caching
          manualChunks: {
            vendor: ['react', 'react-dom'],
            utils: ['lucide-react', 'file-saver'],
            pdf: ['jspdf', 'jspdf-autotable'],
            excel: ['exceljs', 'jszip'],
          },
        },
      },
    },
    
    // Dependency optimization
    optimizeDeps: {
      exclude: ['lucide-react'],
      include: [
        'react',
        'react-dom',
        'exceljs',
        'file-saver',
        'jspdf',
        'jspdf-autotable',
        'jszip',
      ],
    },
    
    // Environment variables
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
    
    // CSS handling
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },
  };
});
```

### Advanced Configuration Options
### Performance Optimization
```typescript
export default defineConfig({
  // ... other config
  
  build: {
    // Code splitting for better loading
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor';
            }
            if (id.includes('pdf') || id.includes('excel')) {
              return 'export-vendor';
            }
            return 'vendor';
          }
        },
      },
    },
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
```

### Development Experience
```typescript
export default defineConfig({
  // ... other config
  
  server: {
    // Hot Module Replacement
    hmr: {
      overlay: true,
    },
    
    // File watching
    watch: {
      usePolling: true,
      interval: 100,
    },
    
    // HTTPS for development (optional)
    https: false,
    
    // Open browser automatically
    open: true,
  },
});
```

## 🎨 Template Asset Structure
### Example Template: announcement-01
### metadata.json - Template Metadata
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

### Template Metadata Schema
```typescript
interface TemplateMetadata {
  id: string;                    // Unique template identifier
  name: string;                  // Display name
  category: string;              // Template category
  description: string;           // Template description
  tags: string[];               // Search tags
  author: string;               // Template author
  version: string;              // Template version
  platforms: string[];          // Supported platforms
  features: string[];           // Template features
  preview: {
    image: string;              // Preview image filename
    description: string;        // Preview description
  };
  files: {
    html: string;               // HTML template filename
    css?: string;               // Optional CSS file
    js?: string;                // Optional JavaScript file
  };
  prompt: string;               // AI generation prompt
  variables?: {                 // Template variables
    [key: string]: {
      type: 'text' | 'color' | 'image' | 'number';
      default: any;
      description: string;
    };
  };
}
```

### template.html - Email Template Structure
The template follows email-safe HTML practices:
- Inline styles only (no external CSS)
- Max-width: 600px for email client compatibility
- Table-based layout for older email clients
- Professional design with clear hierarchy
- Call-to-action buttons with inline styling
- Responsive considerations within email constraints

## 🚀 Development Workflow & Best Practices
### Setting Up Development Environment
### Initial Setup
```bash
# Clone repository
git clone <repository-url>
cd MarAI

# Install frontend dependencies
npm install

# Install backend dependencies  
cd server
npm install
cd ..

# Start development servers
npm run dev          # Frontend on :5173
cd server && npm run dev  # Backend on :3001
```

### Environment Configuration
```bash
# Create environment files
cp .env.example .env.local           # Frontend environment
cp server/.env.example server/.env   # Backend environment

# Configure API keys and settings
# Edit .env files with appropriate values
```

### Code Quality Maintenance
#### Pre-commit Workflow
```bash
# Run linting
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Type checking
npm run type-check

# Build test
npm run build
```

### Adding New Features
#### 1. Create Feature Branch
```bash
git checkout -b feature/new-feature-name
```

#### 2. Update Dependencies (if needed)
```bash
# Add new dependencies
npm install new-package

# Update package.json and commit
git add package.json package-lock.json
git commit -m "Add new-package dependency"
```

#### 3. Update Configuration (if needed)
```typescript
// Update TypeScript paths in tsconfig.app.json
"paths": {
  "@/new-feature/*": ["src/new-feature/*"]
}

// Update Vite aliases in vite.config.ts
resolve: {
  alias: {
    '@/new-feature': path.resolve(__dirname, './src/new-feature'),
  }
}
```

#### 4. Update Tailwind (if needed)
```javascript
// Add new design tokens
theme: {
  extend: {
    colors: {
      'new-feature': '#hex-color',
    }
  }
}
```

### Deployment Preparation
#### Production Build
```bash
# Create production build
npm run build

# Test production build locally
npm run preview

# Analyze bundle size
npm run build:analyze
```

#### Configuration Updates for Production
```typescript
// vite.config.ts - Production optimizations
export default defineConfig(({ mode }) => ({
  // ... other config
  
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,      // Remove console.log in production
        drop_debugger: true,     // Remove debugger statements
      },
    },
    
    rollupOptions: {
      output: {
        // Cache-friendly file names
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
}));
```

## 📋 Maintenance & Updates
### Regular Maintenance Tasks
#### Weekly Tasks
```bash
# Check for dependency updates
npm outdated

# Run security audit
npm audit

# Update dependencies
npm update

# Test application
npm run dev
npm run build
```

#### Monthly Tasks
```bash
# Major dependency updates
npm install package-name@latest

# TypeScript updates
npm install -D typescript@latest

# React updates
npm install react@latest react-dom@latest

# Vite updates
npm install -D vite@latest
```

### Configuration Updates
#### Adding New ESLint Rules
```javascript
// eslint.config.js
rules: {
  // Add new rule
  'new-rule-name': 'error',
  
  // Update existing rule
  '@typescript-eslint/no-unused-vars': ['error', { 
    argsIgnorePattern: '^_',
    varsIgnorePattern: '^_' 
  }],
}
```

#### Adding New Tailwind Components
```javascript
// tailwind.config.js
plugins: [
  function({ addComponents }) {
    addComponents({
      '.new-component': {
        '@apply bg-white shadow-lg rounded-lg p-4': {},
      }
    })
  }
]
```

#### TypeScript Strict Mode Migration
```json
{
  "compilerOptions": {
    // Gradually enable stricter checks
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true
  }
}
```

## 🔧 Troubleshooting Common Issues
### Build Issues
#### TypeScript Errors
```bash
# Clear TypeScript cache
rm -rf .tsbuildinfo

# Regenerate types
npm run type-check
```

#### Vite Build Errors
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Tailwind Not Working
```bash
# Verify PostCSS configuration
# Check tailwind.config.js content paths
# Ensure Tailwind directives in CSS file
```

### Development Server Issues
#### Port Conflicts
```typescript
// vite.config.ts
server: {
  port: 5174,  // Change port if 5173 is occupied
}
```

#### CORS Issues
```typescript
// vite.config.ts
server: {
  cors: true,
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

📝 This guide provides comprehensive coverage of MarAI's common configuration files and serves as the definitive reference for future development and maintenance.

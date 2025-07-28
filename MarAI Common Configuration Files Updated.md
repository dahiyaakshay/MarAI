# MarAI Common Configuration Files - Complete Developer Guide

- **🎯 Purpose:** Comprehensive guide to MarAI's shared configuration files for future updates and maintenance

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
└── public/assets/generator-assets/  # Template system
    ├── email/
    │   ├── templates/
    │   │   ├── announcement/   # Company announcements (2 templates)
    │   │   ├── ecommerce/      # E-commerce marketing (3 templates)  
    │   │   ├── newsletter/     # Newsletter formats (2 templates)
    │   │   ├── promotional/    # Promotional campaigns (4 templates)
    │   │   └── welcome/        # Welcome sequences (empty)
    │   └── wireframes/         # Structural email layouts (10 wireframes)
    └── landing-page/
        ├── templates/          # Production-ready landing pages
        │   ├── agency/         # Marketing agency sites (1 template)
        │   ├── ecommerce/      # E-commerce stores (2 templates)
        │   ├── saas/           # SaaS product pages (5 templates)
        │   └── [empty folders] # app, course, event, portfolio, startup
        └── wireframes/         # Landing page structural layouts (10 wireframes)</pre>

## 🔧 Configuration Files Deep Dive
### 1. .gitignore - Version Control Exclusions
```bash
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json

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

# Temporary files
*.tmp
*.temp
```

### Purpose & Management
- Prevents sensitive data from being committed (API keys, environment variables)
- Excludes build artifacts and dependencies from version control
- Maintains clean repository by ignoring temporary and generated files
- Comprehensive coverage of IDE files, OS-generated files, and temporary data

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
- Package-lock.json is excluded to prevent dependency conflicts

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
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
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
- Title: "Complete Marketing Tool" (appears in browser tab)
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
  
  <title>MarAI - AI-Powered Marketing Platform</title>
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
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/file-saver": "^2.0.7",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^7.0.3"
  }
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

### Advanced Configuration Example
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
- Theme Extension: Currently empty, ready for customization
- Plugins: Currently empty, ready for additional functionality

### MarAI-Specific Customizations Example
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
      
      // Animation for UI Elements  
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
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

### Enhanced TypeScript Configuration Example
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
    "exactOptionalPropertyTypes": true
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### Configuration Enhancement Example
```typescript
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react({
        fastRefresh: true,
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
      host: true,
      cors: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    
    // Build optimization
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      assetsDir: 'assets',
      chunkSizeWarningLimit: 1000,
      
      rollupOptions: {
        output: {
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
  };
});
```

## 🎨 Template System Architecture
### Template Categories Overview
### Email Templates (16 total):
- Announcement: 2 templates for company updates and news
- E-commerce: 3 templates for product promotions and sales
- Newsletter: 2 templates for content distribution
- Promotional: 4 templates for marketing campaigns
- Welcome: Placeholder for onboarding sequences

### Landing Page Templates (8 total):
- Agency: 1 template for marketing agencies
- E-commerce: 2 templates for online stores
- SaaS: 5 templates for software products
- Empty Categories: app, course, event, portfolio, startup

### Template File Structure
Each template follows this consistent pattern:

<pre>template-folder/
├── metadata.json    # Template configuration and AI prompts
├── preview.png      # Visual preview image
└── template.html    # Production-ready HTML template</pre>

#### For wireframes:
<pre>wireframe-folder/
├── metadata.json    # Wireframe configuration
├── preview.png      # Wireframe preview
└── wireframe.html   # Structural layout template</pre>

### Metadata Schema Deep Dive
#### Basic Email Template Metadata
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

### Advanced Landing Page Metadata
```json
{
  "id": "agency-01",
  "name": "FluxAgency - Digital Marketing",
  "category": "agency",
  "description": "Professional digital marketing agency landing page with hero section, services grid, testimonials, stats, and strong conversion elements",
  "tags": ["agency", "digital marketing", "professional", "conversion", "services", "testimonials"],
  "author": "MarAI Team",
  "version": "1.0.0",
  "platforms": ["static", "wordpress", "shopify", "react", "vue"],
  "features": ["Responsive Design", "Hero Section", "Services Grid", "Stats Section", "Testimonials", "Multi-CTA", "Professional Styling"],
  "preview": {
    "image": "preview.png",
    "description": "FluxAgency digital marketing landing page with glassmorphism design"
  },
  "files": {
    "html": "template.html"
  },
  "prompt": "Create a professional digital marketing agency landing page with hero section, services showcase, client testimonials, performance stats, and multiple conversion points",
  "targetAudience": "Digital marketing agencies, creative agencies, business consultants",
  "conversionElements": ["Header CTA", "Hero CTA", "Footer CTA", "Service Cards", "Testimonial Social Proof"],
  "colorScheme": "Elegant gradient background with glassmorphism effects",
  "layout": "Multi-section: Hero, Services, Why Us, Stats, Process, Testimonial, CTA, Footer"
}
```

### Wireframe Metadata
```json
{
  "id": "announcement-wireframe-01",
  "name": "Announcement Email Wireframe",
  "category": "announcement",
  "description": "Comprehensive email wireframe structure with header, hero section, features, testimonials, services, and footer layout",
  "tags": ["wireframe", "structure", "announcement", "layout", "comprehensive"],
  "author": "MarAI Team",
  "version": "1.0.0",
  "platforms": ["email"],
  "features": ["Complete Structure", "Hero Section", "Feature Layout", "Testimonials", "Services Grid", "Footer"],
  "preview": {
    "image": "preview.png",
    "description": "Announcement email wireframe preview"
  },
  "files": {
    "html": "wireframe.html"
  },
  "prompt": "Create an announcement email wireframe with complete structure including header, hero section, alternating features, testimonials, services grid, and comprehensive footer",
  "layoutType": "Hero-focused with comprehensive sections",
  "sections": ["Hero", "Feature Preview", "Features Grid", "Testimonials", "Feature List", "Lead Form", "Final CTA", "Footer"],
  "wireframeStyle": "Gray boxes with clear section boundaries and placeholder content"
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
  targetAudience?: string;      // Target audience (advanced)
  conversionElements?: string[]; // Conversion features (advanced)
  colorScheme?: string;         // Design color scheme (advanced)
  layout?: string;              // Layout description (advanced)
  layoutType?: string;          // Layout type (wireframes)
  sections?: string[];          // Section list (wireframes)
  wireframeStyle?: string;      // Wireframe visual style
}
```

## 📧 Email Template System
### Email Template Implementation - Announcement Example
```html
<!-- Company Announcement Email Template -->
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff;">
  
  <!-- Header Section -->
  <div style="background-color: #2c3e50; padding: 30px 20px; text-align: center;">
    <div style="color: #ffffff; font-size: 28px; font-weight: bold; margin-bottom: 10px;">
      Company Update
    </div>
    <div style="color: #ecf0f1; font-size: 16px;">
      Important News & Announcements
    </div>
  </div>
  
  <!-- Main Content Section -->
  <div style="padding: 40px 30px;">
    
    <!-- Announcement Badge -->
    <div style="background-color: #e74c3c; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 25px;">
      IMPORTANT ANNOUNCEMENT
    </div>
    
    <!-- Main Headline -->
    <h1 style="color: #2c3e50; font-size: 24px; margin: 0 0 20px 0; line-height: 1.3;">
      Exciting News: We're Growing!
    </h1>
    
    <!-- Announcement Content -->
    <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      We're thrilled to share some exciting news with you. Our company is expanding into new markets and launching innovative products that will revolutionize how we serve our customers.
    </p>
    
    <!-- Key Points Section -->
    <div style="background-color: #f8f9fa; padding: 25px; border-left: 4px solid #3498db; margin: 25px 0;">
      <h3 style="color: #2c3e50; font-size: 18px; margin: 0 0 15px 0;">Key Highlights:</h3>
      <ul style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
        <li style="margin-bottom: 8px;">Expansion into new geographic markets</li>
        <li style="margin-bottom: 8px;">Launch of innovative product lines</li>
        <li style="margin-bottom: 8px;">Enhanced customer service capabilities</li>
        <li style="margin-bottom: 0;">Strengthened partnerships and collaborations</li>
      </ul>
    </div>
    
    <!-- Call to Action -->
    <div style="text-align: center; margin: 35px 0;">
      <a href="#" style="background-color: #3498db; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">
        Learn More Details
      </a>
    </div>
    
  </div>
  
  <!-- Footer Section -->
  <div style="background-color: #34495e; padding: 25px 30px; text-align: center;">
    <p style="color: #bdc3c7; font-size: 14px; margin: 0 0 10px 0;">
      Thank you for your continued support and partnership.
    </p>
    <p style="color: #95a5a6; font-size: 12px; margin: 0;">
      © 2024 Your Company Name. All rights reserved.<br>
      123 Business Street, City, State 12345
    </p>
  </div>
  
</div>
```

#### Email Template Standards
-  Width: 600px for optimal email client display
-  Inline Styles: All CSS inline to prevent email client stripping
-  Table-Based Layouts: For maximum email client compatibility
-  Professional Color Schemes: Consistent branding throughout
-  Clear CTAs: Prominent call-to-action buttons for conversion

### Email Wireframe Implementation
```html
<div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; box-sizing: border-box; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <!-- Header -->
        <tr>
            <td style="background-color: #f0f0f0; padding: 15px; text-align: center;">
                <h3 style="font-size: 16px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin: 0; color: #666666;">Header Text</h3>
            </td>
        </tr>
        
        <!-- Logo -->
        <tr>
            <td style="padding: 25px; text-align: center;">
                <h2 style="margin: 0; font-size: 32px; font-weight: 700; color: #333333;">Company Name</h2>
                <p style="font-size: 16px; margin-top: 5px; margin-bottom: 0; color: #666666;">Tagline or Description</p>
            </td>
        </tr>
        
        <!-- Hero Image -->
        <tr>
            <td>
                <div style="background-color: #e0e0e0; border: 1px dashed #999999; display: flex; align-items: center; justify-content: center; color: #666666; font-size: 12px; font-weight: bold; width: 100%; height: 300px;">
                    HERO IMAGE<br>600 x 300px
                </div>
            </td>
        </tr>
        
        <!-- Main Content -->
        <tr>
            <td style="background-color: #f5f5f5; padding: 48px 50px; text-align: center;">
                <h3 style="font-size: 16px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 20px 0; color: #666666;">Subheading</h3>
                <h1 style="font-size: 48px; font-weight: 700; margin: 0; color: #333333;">Main Headline</h1>
                <p style="color: #666666; font-size: 18px; margin: 20px 0;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="#" style="background-color: #f5f5f5; border: 1px solid #999999; border-radius: 15px; color: #666666; text-decoration: none; display: inline-block; font-size: 12px; padding: 8px 16px; margin: 20px 0;">Primary CTA Button</a>
            </td>
        </tr>
    </table>
</div>
```

## 🌐 Landing Page Template System
### Landing Page Implementation - FluxAgency Example
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FluxAgency - Digital Marketing Reimagined</title>
    <meta name="description" content="Transform your brand with FluxAgency's cutting-edge digital marketing strategies.">
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Sans+Pro:wght@300;400;600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #27233a;
            background: linear-gradient(135deg, #eaefd3 0%, #dcc48e 100%);
            background-attachment: fixed;
        }

        .header {
            background: rgba(234, 239, 211, 0.95);
            backdrop-filter: blur(10px);
            padding: 20px 0;
            border-radius: 50px;
            margin: 20px;
            box-shadow: 0 8px 32px rgba(39, 35, 58, 0.1);
            border: 1px solid rgba(220, 196, 142, 0.3);
        }

        .hero {
            background: url('https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop') center/cover;
            min-height: 85vh;
            display: flex;
            align-items: center;
            color: white;
            position: relative;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(39, 35, 58, 0.7), rgba(80, 81, 104, 0.6));
        }

        .hero-content {
            background: rgba(234, 239, 211, 0.15);
            backdrop-filter: blur(15px);
            padding: 60px;
            border-radius: 30px;
            max-width: 650px;
            color: #eaefd3;
            border: 1px solid rgba(220, 196, 142, 0.2);
            position: relative;
            z-index: 1;
        }

        .services {
            background: rgba(234, 239, 211, 0.95);
            backdrop-filter: blur(10px);
            padding: 100px 0;
            margin: 40px 20px;
            border-radius: 30px;
            box-shadow: 0 10px 40px rgba(39, 35, 58, 0.1);
        }

        .service-card {
            background: rgba(234, 239, 211, 0.8);
            padding: 40px 30px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(39, 35, 58, 0.1);
            transition: all 0.3s ease;
            border: 2px solid transparent;
            position: relative;
            overflow: hidden;
        }

        .service-card:hover {
            transform: translateY(-10px);
            border-color: #b3c0a4;
            box-shadow: 0 20px 40px rgba(179, 192, 164, 0.3);
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="nav">
            <div class="logo">
                <svg class="logo-icon" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="12" fill="url(#gradient1)"/>
                    <path d="M10 15L20 25L30 15" stroke="#eaefd3" stroke-width="3"/>
                </svg>
                <span class="logo-text">FluxAgency</span>
            </div>
            <ul class="nav-links">
                <li><a href="#services">Services</a></li>
                <li><a href="#why-us">Why Us</a></li>
                <li><a href="#results">Results</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <button class="cta-btn">Get Started</button>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>Digital Marketing Reimagined</h1>
                <p>Transform your brand with cutting-edge strategies that drive real results. We create campaigns that convert, brands that inspire, and growth that lasts.</p>
                <button class="hero-btn">Start Your Journey</button>
            </div>
        </div>
    </section>
</body>
</html>
```

### Landing Page Features
- Modern CSS: Glassmorphism effects, gradient backgrounds, backdrop filters
- Custom Fonts: Google Fonts integration (Inter, Source Sans Pro, Montserrat)
- Responsive Design: CSS Grid, Flexbox, mobile-first approach
- Interactive Elements: Hover animations, smooth transitions
- Professional Branding: Custom SVG logos, consistent color schemes

### Landing Page Wireframe Implementation
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page Wireframe</title>
    <style>
        .wireframe-box {
            border: 2px solid #ccc;
            background-color: #f9f9f9;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 14px;
        }

        .wireframe-image {
            border: 2px dashed #999;
            background-color: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 14px;
        }

        .hero-section {
            background-color: #f9f9f9;
            border: 2px solid #ddd;
            padding: 72px 0;
            min-height: 727px;
        }

        .section {
            padding: 80px 0;
            border: 2px solid #ddd;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <a href="#" class="logo">
                <div class="logo-icon wireframe-box">LOGO</div>
                Brand Name
            </a>
            
            <div class="hero-content">
                <div class="hero-text">
                    <h1>Main Headline</h1>
                    <p class="subtitle">Subheading Text</p>
                    <p class="description">Description paragraph explaining the value proposition.</p>
                    <a href="#" class="btn btn-primary">Primary CTA Button</a>
                </div>
                <div class="hero-image">
                    <div class="wireframe-image" style="width: 100%; height: 400px;">
                        [HERO IMAGE PLACEHOLDER]
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="section">
        <div class="container">
            <h2 class="section-title">Features Section Title</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="wireframe-image" style="width: 200px; height: 150px; margin: 0 auto 30px;">
                        [IMAGE]
                    </div>
                    <h3>Feature 1</h3>
                    <p>Description of feature benefit.</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>
```

## 🚀 Development Workflow & Best Practices
### Setting Up Development Environment
#### Initial Setup
```bash
# Clone repository
git clone <repository-url>
cd MarAI

# Install dependencies
npm install

# Start development server
npm run dev          # Frontend on :5173
```

#### Environment Configuration
```bash
# Create environment files
cp .env.example .env.local

# Configure API keys and settings in .env.local
```

### Code Quality Maintenance
#### Pre-commit Workflow
```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build
```

### Template Development Standards
#### Template Quality Checklist
- Cross-browser compatibility testing for landing pages
- Email client testing for email templates (Outlook, Gmail, Apple Mail)
- Mobile responsiveness verification across devices
- Accessibility compliance including screen reader compatibility
- Performance optimization including image compression and CSS efficiency

#### Template File Organization
- Consistent metadata.json structure across all templates
- Clear naming conventions for template IDs and files
- Proper preview image generation (PNG format, consistent dimensions)
- Comprehensive template documentation in metadata descriptions

## 📊 Template System Statistics
### Current Template Inventory
#### Email Templates (16 total):
- Announcement: 2 production templates
- E-commerce: 3 production templates
- Newsletter: 2 production templates
- Promotional: 4 production templates
- Welcome: 0 templates (planned)

#### Email Wireframes (10 total):
- Announcement: 2 wireframes
- E-commerce: 4 wireframes
- Newsletter: 1 wireframe
- Promotional: 2 wireframes
- Welcome: 1 wireframe

#### Landing Page Templates (8 total):
- Agency: 1 production template
- E-commerce: 2 production templates
- SaaS: 5 production templates
- Empty categories: app, course, event, portfolio, startup

#### Landing Page Wireframes (10 total):
- Agency: 2 wireframes
- App: 1 wireframe
- E-commerce: 2 wireframes
- SaaS: 3 wireframes
- Startup: 2 wireframes

### Platform Deployment Support
Templates support deployment across multiple platforms:
- Static HTML: Direct deployment to any web server
- WordPress: Theme-compatible structure for CMS integration
- Shopify: E-commerce optimized for online store integration
- React: Component-ready markup for modern JavaScript frameworks
- Vue: Framework compatibility for Vue.js applications
- Email Platforms: Cross-client compatibility for email service providers

### AI Integration Points
- Metadata Prompts: Each template includes AI generation prompts
- Content Customization: AI can adapt templates for specific audiences
- Wireframe Conversion: AI transforms structural wireframes into styled templates
- Template Variations: AI generates multiple versions for A/B testing

## 🔧 Troubleshooting Common Issues
### Build Issues
#### TypeScript Compilation Errors
```bash
# Clear TypeScript cache
rm -rf .tsbuildinfo
rm -rf node_modules/.cache

# Regenerate types
npm run build
```

#### Vite Development Server Issues
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Template System Issues
#### Email Client Compatibility
- Test templates with Email on Acid or Litmus
- Verify inline CSS implementation
- Check image alt text and fallback fonts
- Test with major email clients (Outlook, Gmail, Apple Mail)

#### Landing Page Responsiveness
- Use browser developer tools for breakpoint testing
- Verify CSS Grid and Flexbox support
- Test with various screen sizes and orientations
- Ensure touch-friendly interactive elements

### Common Template Fixes
#### Email Template Issues
```html
<!-- Fix: Outlook table spacing -->
<table cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="line-height: 0; font-size: 0;">&nbsp;</td>
  </tr>
</table>

<!-- Fix: Gmail image blocking -->
<img src="image.jpg" alt="Description" style="display: block;" />
```

#### Landing Page Issues
```css
/* Fix: Safari backdrop-filter support */
.glassmorphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* Safari support */
}

/* Fix: iOS safe area */
.hero {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

## 📝 Maintenance Schedule
### Weekly Tasks
- Dependency security audit: npm audit
- Template functionality testing across browsers/clients
- Performance monitoring for build times and asset sizes
- User feedback review and template optimization

### Monthly Tasks
- Major dependency updates with compatibility testing
- Template library expansion based on user requests
- A/B testing results analysis for template effectiveness
- Documentation updates and improvements

### Quarterly Tasks
- Comprehensive platform security review
- Template performance benchmarking
- AI model evaluation and prompt optimization
- Platform integration testing (WordPress, Shopify, etc.)

📝 This comprehensive guide documents the current state of MarAI's configuration files and sophisticated template system, serving as the definitive reference for developers, maintainers, and stakeholders working with the platform.

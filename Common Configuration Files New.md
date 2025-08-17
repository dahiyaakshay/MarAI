# MarAI Common Configuration Files - Complete Developer Guide

- **Tool Overview:** MarAI is a comprehensive marketing tool built with React, TypeScript, and Vite. It's designed as a complete marketing solution that includes email template generation, landing page creation, and various marketing asset generators. The tool provides both templates and wireframes for different marketing use cases.

## 📁 File Structure Overview
<pre>MarAI/ (Root - Common Files)
│   .gitignore
│   eslint.config.js
│   index.html
│   package-lock.json
│   package.json
│   postcss.config.js
│   tailwind.config.js
│   tsconfig.app.json
│   tsconfig.json
│   tsconfig.node.json
│   vite.config.ts
│
└───public
    └───assets
        └───generator-assets
            ├───email
            │   ├───templates
            │   │   ├───announcement
            │   │   │   ├───announcement-01
            │   │   │   │       metadata.json
            │   │   │   │       preview.png
            │   │   │   │       template.html
            │   │   │   │
            │   │   │   └───announcement-02
            │   │   │           metadata.json
            │   │   │           preview.png
            │   │   │           template.html
            │   │   │
            │   │   ├───ecommerce
            │   │   │   ├───ecommerce-01
            │   │   │   │       metadata.json
            │   │   │   │       preview.png
            │   │   │   │       template.html
            │   │   │   │
            │   │   │   ├───ecommerce-02
            │   │   │   │       metadata.json
            │   │   │   │       preview.png
            │   │   │   │       template.html
            │   │   │   │
            │   │   │   └───ecommerce-03
            │   │   │           metadata.json
            │   │   │           preview.png
            │   │   │           template.html
            │   │   │
            │   │   ├───newsletter
            │   │   │   ├───newsletter-01
            │   │   │   │       metadata.json
            │   │   │   │       preview.png
            │   │   │   │       template.html
            │   │   │   │
            │   │   │   └───newsletter-02
            │   │   │           metadata.json
            │   │   │           preview.png
            │   │   │           template.html
            │   │   │
            │   │   ├───promotional
            │   │   │   ├───promotional-01
            │   │   │   │       metadata.json
            │   │   │   │       preview.png
            │   │   │   │       template.html
            │   │   │   │
            │   │   │   ├───promotional-02
            │   │   │   │       metadata.json
            │   │   │   │       preview.png
            │   │   │   │       template.html
            │   │   │   │
            │   │   │   ├───promotional-03
            │   │   │   │       metadata.json
            │   │   │   │       preview.png
            │   │   │   │       template.html
            │   │   │   │
            │   │   │   └───promotional-04
            │   │   │           metadata.json
            │   │   │           preview.png
            │   │   │           template.html
            │   │   │
            │   │   └───welcome
            │   └───wireframes
            │       ├───announcement
            │       │   ├───announcement-wireframe-01
            │       │   │       metadata.json
            │       │   │       preview.png
            │       │   │       wireframe.html
            │       │   │
            │       │   └───announcement-wireframe-02
            │       │           metadata.json
            │       │           preview.png
            │       │           wireframe.html
            │       │
            │       ├───e-commerce
            │       │   ├───ecommerce-wireframe-01
            │       │   │       metadata.json
            │       │   │       preview.png
            │       │   │       wireframe.html
            │       │   │
            │       │   ├───ecommerce-wireframe-02
            │       │   │       metadata.json
            │       │   │       preview.png
            │       │   │       wireframe.html
            │       │   │
            │       │   ├───ecommerce-wireframe-03
            │       │   │       metadata.json
            │       │   │       preview.png
            │       │   │       wireframe.html
            │       │   │
            │       │   └───ecommerce-wireframe-04
            │       │           metadata.json
            │       │           preview.png
            │       │           wireframe.html
            │       │
            │       ├───newsletter
            │       │   └───newsletter-wireframe-01
            │       │           metadata.json
            │       │           preview.png
            │       │           wireframe.html
            │       │
            │       ├───promotional
            │       │   ├───promotional-wireframe-01
            │       │   │       metadata.json
            │       │   │       preview.png
            │       │   │       wireframe.html
            │       │   │
            │       │   └───promotional-wireframe-02
            │       │           metadata.json
            │       │           preview.png
            │       │           wireframe.html
            │       │
            │       └───welcome
            │           └───welcome-wireframe-01
            │                   metadata.json
            │                   preview.png
            │                   wireframe.html
            │
            └───landing-page
                ├───templates
                │   ├───agency
                │   │   └───agency-01
                │   │           metadata.json
                │   │           preview.png
                │   │           template.html
                │   │
                │   ├───app
                │   ├───course
                │   ├───ecommerce
                │   │   ├───ecommerce-01
                │   │   │       metadata.json
                │   │   │       preview.png
                │   │   │       template.html
                │   │   │
                │   │   └───ecommerce-02
                │   │           metadata.json
                │   │           preview.png
                │   │           template.html
                │   │
                │   ├───event
                │   ├───portfolio
                │   ├───saas
                │   │   ├───saas-01
                │   │   │       metadata.json
                │   │   │       preview.png
                │   │   │       template.html
                │   │   │
                │   │   ├───saas-02
                │   │   │       metadata.json
                │   │   │       preview.png
                │   │   │       template.html
                │   │   │
                │   │   ├───saas-03
                │   │   │       metadata.json
                │   │   │       preview.png
                │   │   │       template.html
                │   │   │
                │   │   ├───saas-04
                │   │   │       metadata.json
                │   │   │       preview.png
                │   │   │       template.html
                │   │   │
                │   │   └───saas-05
                │   │           metadata.json
                │   │           preview.png
                │   │           template.html
                │   │
                │   └───startup
                └───wireframes
                    ├───agency
                    │   ├───agency-wireframe-01
                    │   │       metadata.json
                    │   │       preview.png
                    │   │       wireframe.html
                    │   │
                    │   └───agency-wireframe-02
                    │           metadata.json
                    │           preview.png
                    │           wireframe.html
                    │
                    ├───app
                    │   └───app-wireframe-01
                    │           metadata.json
                    │           preview.png
                    │           wireframe.html
                    │
                    ├───ecommerce
                    │   ├───ecommerce-wireframe-01
                    │   │       metadata.json
                    │   │       preview.png
                    │   │       wireframe.html
                    │   │
                    │   └───ecommerce-wireframe-02
                    │           metadata.json
                    │           preview.png
                    │           wireframe.html
                    │
                    ├───saas
                    │   ├───saas-wireframe-01
                    │   │       metadata.json
                    │   │       preview.png
                    │   │       wireframe.html
                    │   │
                    │   ├───saas-wireframe-02
                    │   │       metadata.json
                    │   │       preview.png
                    │   │       wireframe.html
                    │   │
                    │   └───saas-wireframe-03
                    │           metadata.json
                    │           preview.png
                    │           wireframe.html
                    │
                    └───startup
                        ├───startup-wireframe-01
                        │       metadata.json
                        │       preview.png
                        │       wireframe.html
                        │
                        └───startup-wireframe-02
                                metadata.json
                                preview.png
                                wireframe.html</pre>

## Core Technology Stack
- Frontend Framework: React 18.3.1 with TypeScript
- Build Tool: Vite 7.0.3 (fast development and building)
- Styling: Tailwind CSS 3.4.1 (utility-first CSS framework)
- Icons: Lucide React (modern icon library)
- Code Quality: ESLint with TypeScript support

## 🔧 Configuration Files
### 1. .gitignore
```bash
Dependencies Section:
node_modules/
package-lock.json

Build Output:
dist/
build/

Environment Variables:
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

Logs and Runtime Data:
logs
*.log
pids
*.pid
*.seed
*.pid.lock

Development Tools:
coverage/
.nyc_output
.vscode/
.idea/

System Files:
.DS_Store
Thumbs.db
*.tmp
*.temp
```

### 2. eslint.config.js
```javascript
Imports:
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

Configuration Export:
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

### 3. index.html
```html
HTML Structure:
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

### 4. package.json
```json
Project Info:
"name": "vite-react-typescript-starter"
"type": "module"

Scripts:
"dev": "vite"
"build": "vite build"
"lint": "eslint ."
"preview": "vite preview"

Dependencies:
"exceljs": "^4.4.0"
"file-saver": "^2.0.5"
"jspdf": "^3.0.1"
"jspdf-autotable": "^5.0.2"
"jszip": "^3.10.1"
"lodash": "^4.17.21"
"lucide-react": "^0.344.0"
"papaparse": "^5.5.3"
"react": "^18.3.1"
"react-dom": "^18.3.1"

DevDependencies:
"@vitejs/plugin-react": "^4.3.1"
"tailwindcss": "^3.4.1"
"typescript": "^5.5.3"
"vite": "^7.0.3"
```

### 5. vite.config.ts
```typescript
Configuration:
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### 6. postcss.config.js
```javascript
Plugins:
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 7. tailwind.config.js
```javascript
Configuration:
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 8. tsconfig.app.json
```json
Compiler Options:
"target": "ES2020"
"lib": ["ES2020", "DOM", "DOM.Iterable"]
"module": "ESNext"
"moduleResolution": "bundler"
"jsx": "react-jsx"
"noEmit": true

Linting:
"strict": true
"noUnusedLocals": true
"noUnusedParameters": true
"noFallthroughCasesInSwitch": true

Include:
["src"]
```

9. tsconfig.json
```json
Project References:
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

10. tsconfig.node.json
```json
Compiler Options:
"target": "ES2022"
"lib": ["ES2023"]
"module": "ESNext"
"moduleResolution": "bundler"
"noEmit": true

Include:
["vite.config.ts"]
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

### Script Commands
### Available Scripts
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint code analysis
npm run preview   # Preview production build locally
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

## Project Structure
### Root Configuration Files
#### 1. .gitignore
   - Purpose: Controls version control exclusions
   - Key Exclusions: node_modules/, dist/, .env files, logs, IDE files, system files
   - MarAI Specific: Excludes build outputs and sensitive environment variables

#### 2. eslint.config.js
   - Purpose: Code quality and linting configuration
   - Setup: TypeScript ESLint with React hooks and React refresh plugins
   - Rules: Enforces React hooks rules and component export patterns
   - Target: All .ts and .tsx files with browser globals

#### 3. index.html
   - Purpose: Main HTML entry point
   - Title: "Complete Marketing Tool"
   - Structure: Minimal HTML5 with React root div and Vite module script

#### 4. package.json
   - Project Name: "vite-react-typescript-starter"
   - ##### Key Production Dependencies:
      - exceljs (4.4.0) - Excel file manipulation for exports
      - file-saver (2.0.5) - File download functionality
      - jspdf (3.0.1) + jspdf-autotable (5.0.2) - PDF generation
      - jszip (3.10.1) - ZIP file creation for bulk exports
      - lodash (4.17.21) - Utility functions
      - papaparse (5.5.3) - CSV parsing

#### 5. vite.config.ts
- Purpose: Vite build tool configuration
- Plugins: React plugin enabled
- Optimization: Excludes lucide-react from dependency optimization

#### 6. postcss.config.js
- Purpose: PostCSS configuration for Tailwind
- Plugins: Tailwind CSS and Autoprefixer

#### 7. tailwind.config.js
- Purpose: Tailwind CSS configuration
- Content: Scans HTML and all JS/TS/JSX/TSX files in src/
- Theme: Extended default theme (customizable)

#### 8. tsconfig.app.json
- Purpose: TypeScript configuration for application code
- Target: ES2020 with DOM libraries
- Module: ESNext with bundler resolution
- JSX: React JSX transform
- Strict Mode: Enabled with unused variable checking

#### 9. tsconfig.json
- Purpose: Root TypeScript configuration
- Structure: References both app and node configurations

#### 10. tsconfig.node.json
- Purpose: TypeScript configuration for Node.js tools
- Target: ES2022 for Vite configuration files

## Asset Structure
### Email Templates & Wireframes
The tool includes comprehensive email marketing assets:

#### Template Categories:
- Announcement (2 templates) - Company announcements and updates
- Ecommerce (3 templates) - Product promotions and sales
- Newsletter (2 templates) - Regular communications
- Promotional (4 templates) - Marketing campaigns and offers
- Welcome - User onboarding emails

#### Wireframe Categories:
- Announcement (2 wireframes) - Structural layouts for announcements
- E-commerce (4 wireframes) - Product-focused email structures
- Newsletter (1 wireframe) - Newsletter layout framework
- Promotional (2 wireframes) - Marketing email structures
- Welcome (1 wireframe) - Onboarding email structure

### Landing Page Templates & Wireframes
#### Template Categories:
- Agency (1 template) - Marketing agency landing pages
- Ecommerce (2 templates) - Online store landing pages
- SaaS (5 templates) - Software service landing pages
- Empty Categories: App, Course, Event, Portfolio, Startup (ready for expansion)

#### Wireframe Categories:
- Agency (2 wireframes) - Agency page structures
- App (1 wireframe) - Mobile app landing structure
- Ecommerce (2 wireframes) - E-commerce page layouts
- SaaS (3 wireframes) - SaaS landing page frameworks
- Startup (2 wireframes) - Startup company page structures

### Asset File Structure
Each template/wireframe includes:
- metadata.json - Template information and configuration
- preview.png - Visual preview image
- template.html or wireframe.html - The actual HTML content

## Development Features
### Export Capabilities
- Excel Export: Using ExcelJS for data export functionality
- PDF Generation: JSPDF with auto-table for document creation
- File Downloads: File-saver for client-side file downloads
- Bulk Operations: JSZip for creating zip archives

### Available Scripts
- npm run dev - Start development server (typically port 5173)
- npm run build - Create production build
- npm run lint - Run code quality checks
- npm run preview - Preview production build locally

### Code Quality Features
- TypeScript: Full type safety across the application
- ESLint: Automated code quality enforcement
- React Hooks Linting: Ensures proper React patterns
- Strict Mode: Enhanced error catching and performance

## Key Strengths of MarAI
1. Comprehensive Marketing Solution: Covers email marketing and landing page creation
2. Template Variety: Multiple categories for different marketing needs
3. Modern Tech Stack: Uses latest React, TypeScript, and Vite for optimal development
4. Export Capabilities: Multiple format exports (Excel, PDF, ZIP)
5. Structured Assets: Well-organized template and wireframe system
6. Developer-Friendly: Strong typing, linting, and modern build tools
7. Scalable Architecture: Easy to add new template categories and features

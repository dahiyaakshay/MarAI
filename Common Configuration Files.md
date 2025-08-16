# MarAI Common Configuration Files - Complete Developer Guide

- **🎯 Purpose:** Comprehensive guide to MarAI's shared configuration files for future updates and maintenance

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

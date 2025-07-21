# Project Structure

D:\MarAI>tree /f
<pre>D:.
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
├───public
│   └───assets
│       └───generator-assets
│           ├───email
│           │   ├───templates
│           │   │   ├───announcement
│           │   │   │   └───announcement-01
│           │   │   │           metadata.json
│           │   │   │           preview.png
│           │   │   │           template.html
│           │   │   │
│           │   │   ├───ecommerce
│           │   │   ├───newsletter
│           │   │   ├───promotional
│           │   │   └───welcome
│           │   └───wireframes
│           │       ├───complex
│           │       ├───grid
│           │       ├───header-footer
│           │       ├───sidebar
│           │       └───simple
│           └───landing-page
│               ├───templates
│               │   ├───agency
│               │   ├───app
│               │   ├───course
│               │   ├───ecommerce
│               │   ├───event
│               │   ├───portfolio
│               │   ├───saas
│               │   └───startup
│               └───wireframes
│                   ├───feature-grid
│                   ├───hero-focused
│                   ├───long-form
│                   ├───minimal
│                   └───product-showcase
├───server
│   │   .env.example
│   │   .gitignore
│   │   package-lock.json
│   │   package.json
│   │   README.md
│   │   tsconfig.json
│   │
│   └───src
│       │   index.ts
│       │
│       ├───middleware
│       │       auth.ts
│       │       rateLimiter.ts
│       │
│       ├───routes
│       │       generate.ts
│       │       validate.ts
│       │
│       ├───services
│       │       aiService.ts
│       │
│       ├───types
│       │       index.ts
│       │
│       └───{routes,services,middleware,types,utils}
└───src
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
    │       │   │   └───announcement
    │       │   │       └───announcement-01
    │       │   │               metadata.json
    │       │   │
    │       │   └───wireframes
    │       │           index.js
    │       │
    │       └───landing-page
    │           ├───templates
    │           │       index.js
    │           │
    │           └───wireframes
    │                   index.js
    │
    ├───components
    │   ├───Common
    │   │       DownloadButton.tsx
    │   │       MultiSelect.tsx
    │   │
    │   ├───Layout
    │   │       Header.tsx
    │   │       Sidebar.css
    │   │       Sidebar.tsx
    │   │
    │   ├───Modals
    │   │       AddClientModal.tsx
    │   │       EditModal.tsx
    │   │       EditPersonaModal.tsx
    │   │       PreviewModal.tsx
    │   │
    │   └───Pages
    │           ContentCreator.tsx
    │           Dashboard.tsx
    │           EmailCalendar.tsx
    │           EmailGenerator.tsx
    │           LandingPageBuilder.tsx
    │           MarketingCalendar.tsx
    │           PersonaBuilder.tsx
    │           PromptLibrary.tsx
    │           Settings.tsx
    │           SocialCalendar.tsx
    │
    └───services
            apiService.ts
            assetLoader.js
            exportService.ts</pre>

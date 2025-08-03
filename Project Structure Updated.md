# Project Structure

<pre>MarAI>
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
│           │   │   │   ├───announcement-01
│           │   │   │   │       metadata.json
│           │   │   │   │       preview.png
│           │   │   │   │       template.html
│           │   │   │   │
│           │   │   │   └───announcement-02
│           │   │   │           metadata.json
│           │   │   │           preview.png
│           │   │   │           template.html
│           │   │   │
│           │   │   ├───ecommerce
│           │   │   │   ├───ecommerce-01
│           │   │   │   │       metadata.json
│           │   │   │   │       preview.png
│           │   │   │   │       template.html
│           │   │   │   │
│           │   │   │   ├───ecommerce-02
│           │   │   │   │       metadata.json
│           │   │   │   │       preview.png
│           │   │   │   │       template.html
│           │   │   │   │
│           │   │   │   └───ecommerce-03
│           │   │   │           metadata.json
│           │   │   │           preview.png
│           │   │   │           template.html
│           │   │   │
│           │   │   ├───newsletter
│           │   │   │   ├───newsletter-01
│           │   │   │   │       metadata.json
│           │   │   │   │       preview.png
│           │   │   │   │       template.html
│           │   │   │   │
│           │   │   │   └───newsletter-02
│           │   │   │           metadata.json
│           │   │   │           preview.png
│           │   │   │           template.html
│           │   │   │
│           │   │   ├───promotional
│           │   │   │   ├───promotional-01
│           │   │   │   │       metadata.json
│           │   │   │   │       preview.png
│           │   │   │   │       template.html
│           │   │   │   │
│           │   │   │   ├───promotional-02
│           │   │   │   │       metadata.json
│           │   │   │   │       preview.png
│           │   │   │   │       template.html
│           │   │   │   │
│           │   │   │   ├───promotional-03
│           │   │   │   │       metadata.json
│           │   │   │   │       preview.png
│           │   │   │   │       template.html
│           │   │   │   │
│           │   │   │   └───promotional-04
│           │   │   │           metadata.json
│           │   │   │           preview.png
│           │   │   │           template.html
│           │   │   │
│           │   │   └───welcome
│           │   └───wireframes
│           │       ├───announcement
│           │       │   ├───announcement-wireframe-01
│           │       │   │       metadata.json
│           │       │   │       preview.png
│           │       │   │       wireframe.html
│           │       │   │
│           │       │   └───announcement-wireframe-02
│           │       │           metadata.json
│           │       │           preview.png
│           │       │           wireframe.html
│           │       │
│           │       ├───e-commerce
│           │       │   ├───ecommerce-wireframe-01
│           │       │   │       metadata.json
│           │       │   │       preview.png
│           │       │   │       wireframe.html
│           │       │   │
│           │       │   ├───ecommerce-wireframe-02
│           │       │   │       metadata.json
│           │       │   │       preview.png
│           │       │   │       wireframe.html
│           │       │   │
│           │       │   ├───ecommerce-wireframe-03
│           │       │   │       metadata.json
│           │       │   │       preview.png
│           │       │   │       wireframe.html
│           │       │   │
│           │       │   └───ecommerce-wireframe-04
│           │       │           metadata.json
│           │       │           preview.png
│           │       │           wireframe.html
│           │       │
│           │       ├───newsletter
│           │       │   └───newsletter-wireframe-01
│           │       │           metadata.json
│           │       │           preview.png
│           │       │           wireframe.html
│           │       │
│           │       ├───promotional
│           │       │   ├───promotional-wireframe-01
│           │       │   │       metadata.json
│           │       │   │       preview.png
│           │       │   │       wireframe.html
│           │       │   │
│           │       │   └───promotional-wireframe-02
│           │       │           metadata.json
│           │       │           preview.png
│           │       │           wireframe.html
│           │       │
│           │       └───welcome
│           │           └───welcome-wireframe-01
│           │                   metadata.json
│           │                   preview.png
│           │                   wireframe.html
│           │
│           └───landing-page
│               ├───templates
│               │   ├───agency
│               │   │   └───agency-01
│               │   │           metadata.json
│               │   │           preview.png
│               │   │           template.html
│               │   │
│               │   ├───app
│               │   ├───course
│               │   ├───ecommerce
│               │   │   ├───ecommerce-01
│               │   │   │       metadata.json
│               │   │   │       preview.png
│               │   │   │       template.html
│               │   │   │
│               │   │   └───ecommerce-02
│               │   │           metadata.json
│               │   │           preview.png
│               │   │           template.html
│               │   │
│               │   ├───event
│               │   ├───portfolio
│               │   ├───saas
│               │   │   ├───saas-01
│               │   │   │       metadata.json
│               │   │   │       preview.png
│               │   │   │       template.html
│               │   │   │
│               │   │   ├───saas-02
│               │   │   │       metadata.json
│               │   │   │       preview.png
│               │   │   │       template.html
│               │   │   │
│               │   │   ├───saas-03
│               │   │   │       metadata.json
│               │   │   │       preview.png
│               │   │   │       template.html
│               │   │   │
│               │   │   ├───saas-04
│               │   │   │       metadata.json
│               │   │   │       preview.png
│               │   │   │       template.html
│               │   │   │
│               │   │   └───saas-05
│               │   │           metadata.json
│               │   │           preview.png
│               │   │           template.html
│               │   │
│               │   └───startup
│               └───wireframes
│                   ├───agency
│                   │   ├───agency-wireframe-01
│                   │   │       metadata.json
│                   │   │       preview.png
│                   │   │       wireframe.html
│                   │   │
│                   │   └───agency-wireframe-02
│                   │           metadata.json
│                   │           preview.png
│                   │           wireframe.html
│                   │
│                   ├───app
│                   │   └───app-wireframe-01
│                   │           metadata.json
│                   │           preview.png
│                   │           wireframe.html
│                   │
│                   ├───ecommerce
│                   │   ├───ecommerce-wireframe-01
│                   │   │       metadata.json
│                   │   │       preview.png
│                   │   │       wireframe.html
│                   │   │
│                   │   └───ecommerce-wireframe-02
│                   │           metadata.json
│                   │           preview.png
│                   │           wireframe.html
│                   │
│                   ├───saas
│                   │   ├───saas-wireframe-01
│                   │   │       metadata.json
│                   │   │       preview.png
│                   │   │       wireframe.html
│                   │   │
│                   │   ├───saas-wireframe-02
│                   │   │       metadata.json
│                   │   │       preview.png
│                   │   │       wireframe.html
│                   │   │
│                   │   └───saas-wireframe-03
│                   │           metadata.json
│                   │           preview.png
│                   │           wireframe.html
│                   │
│                   └───startup
│                       ├───startup-wireframe-01
│                       │       metadata.json
│                       │       preview.png
│                       │       wireframe.html
│                       │
│                       └───startup-wireframe-02
│                               metadata.json
│                               preview.png
│                               wireframe.html
│
├───server
│   │   .env
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
│       ├───config
│       │       database.ts
│       │
│       ├───middleware
│       │       auth.ts
│       │       authMiddleware.ts
│       │       rateLimiter.ts
│       │
│       ├───migrations
│       │       001_create_users_table.sql
│       │       002_create_tokens_table.sql
│       │       003_add_user_profile_fields.sql
│       │       004_create_email_verifications_table.sql
│       │       005_create_password_resets_table.sql
│       │
│       ├───models
│       │       EmailVerification.ts
│       │       Token.ts
│       │       User.ts
│       │
│       ├───routes
│       │       auth.ts
│       │       generate.ts
│       │       validate.ts
│       │
│       ├───services
│       │       aiService.ts
│       │       emailService.ts
│       │       tokenService.ts
│       │
│       └───types
│               index.ts
│
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
    │           Settings.tsx
    │           SocialCalendar.tsx
    │
    └───services
            apiService.ts
            assetLoader.js
            authService.ts
            exportService.ts</pre>

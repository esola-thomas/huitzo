# Huitzo Website

The official marketing and documentation website for **Huitzo** - an Intelligence-as-a-Service platform that democratizes intelligent data analysis through a plugin-based architecture.

## 🌟 About Huitzo

Huitzo transforms overwhelming data into unfair competitive advantage. Using a web-based command-line interface, users can access AI-powered intelligence through simple text commands, regardless of technical expertise.

**Key Features:**

- **Plugin-based intelligence** - Extensible architecture for specialized domains
- **Web-based CLI interface** - Command-driven intelligence access
- **Intelligence-as-a-Service** - On-demand data analysis and insights
- **Multiple intelligence domains** - Financial analysis, and more
- **Repository-driven content** - Dynamic stats and metrics from live plugin data

**Current Plugins (4):**

1. **Financial Intelligence** - Market insights, portfolio analysis, investment guidance
2. **Mechanical Engineering Intelligence** - Engineering calculations, stress analysis, unit conversions
3. **Rubber Ducky** - Collaborative problem-solving and brainstorming

**Project Timeline:** October 2025 - May 2026 (7-month development cycle)

## 🚀 Project Structure

```
huitzo.com/
├── src/
│   ├── layouts/
│   │   ├── Layout.astro              # Main layout with header/footer
│   │   ├── PageLayout.astro          # Standard page layout
│   │   ├── LandingLayout.astro       # Landing page layout
│   │   └── MarkdownLayout.astro      # Blog post layout
│   ├── pages/
│   │   ├── index.astro               # Homepage with hero, features, carousel
│   │   ├── roadmap.astro             # Development roadmap with timeline
│   │   ├── plugins/
│   │   │   ├── index.astro           # Plugins directory with search/filter
│   │   │   └── [slug].astro          # Individual plugin detail pages
│   │   └── 404.astro                 # 404 error page
│   ├── components/
│   │   ├── FeatureCard.astro         # Feature highlight cards (supports slots)
│   │   ├── PluginCard.astro          # Plugin directory card
│   │   ├── RoadmapTimeline.astro     # Timeline visualization
│   │   ├── TerminalPrompt.astro      # Terminal-style text display
│   │   ├── CTAButton.astro           # Call-to-action button
│   │   ├── Command.astro             # Command with copy functionality
│   │   ├── Logo.astro                # Huitzo logo
│   │   ├── CustomStyles.astro        # Custom CSS management
│   │   ├── Favicons.astro            # Favicon setup
│   │   ├── widgets/                  # Widget components (Hero, Features, etc.)
│   │   ├── common/                   # Common components (Header, Footer, Analytics)
│   │   ├── ui/                       # UI primitives (Button, Timeline, etc.)
│   │   └── blog/                     # Blog components
│   ├── utils/
│   │   ├── plugins.ts                # Plugin data loading and statistics
│   │   ├── blog.ts                   # Blog utilities
│   │   ├── frontmatter.ts            # Frontmatter parsing
│   │   ├── permalinks.ts             # URL generation
│   │   ├── images.ts                 # Image optimization
│   │   └── utils.ts                  # General utilities
│   ├── data/
│   │   ├── roadmap.json              # Roadmap milestones and progress
│   │   ├── roadmap.schema.json       # Validation schema for roadmap
│   │   ├── config.yaml               # Site configuration
│   │   └── plugins/
│   │       ├── financial.json        # Financial Intelligence plugin
│   │       ├── job-report.json       # Job Market Report plugin
│   │       ├── rubber-ducky.json     # Rubber Ducky plugin
│   │       ├── schema.json           # Plugin data validation schema
│   │       └── SCHEMA.md             # Plugin schema documentation
│   ├── assets/
│   │   ├── styles/
│   │   │   └── tailwind.css          # Tailwind directives
│   │   ├── images/                   # Static images
│   │   └── favicons/                 # Favicon assets
│   └── content/
│       └── config.ts                 # Content collection config
├── public/
│   ├── favicon.svg                   # Huitzo favicon
│   ├── robots.txt                    # SEO robots file
│   └── fonts/                        # Custom fonts
├── scripts/
│   ├── generate-plugin-docs.js       # Generate plugin documentation
│   ├── validate-plugins.js           # Validate plugin data
│   ├── validate-roadmap.js           # Validate roadmap data
│   ├── validate-deployment.sh        # Check deployment readiness
│   └── setup-deployment.sh           # Setup CI/CD pipeline
├── astro.config.ts                   # Astro configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json
```

## 🎨 Design System

**Terminal-Inspired Dark Theme with Modern Intelligence Aesthetic:**

- **Primary Background:** `#0a0e27` (deep space blue)
- **Secondary Background:** `rgba(10, 14, 39, 0.6)` (semi-transparent layer)
- **Accent Color:** `#00ff9f` (bright cyan/mint green)
- **Text Primary:** `#e3e8ef` (off-white)
- **Text Muted:** `#8892b0` (slate gray)
- **Typography:**
  - Headers: JetBrains Mono (monospace energy)
  - Body: Inter (modern, readable)
- **Component Patterns:**
  - Terminal-style text prompts with animated cursors
  - Cards with left-accent borders for emphasis
  - Gradient text for key messaging
  - Animated carousel with user controls (Play/Pause, navigation dots, hover pause)
  - Responsive grid layouts (mobile-first)
- **Interactive Elements:**
  - Smooth CSS transitions (0.3s default)
  - Hover state changes for buttons and cards
  - Animated gradient text for accents
  - Carousel with 8-second slide display + 0.8s fade transitions

## 🛠️ Technology Stack

- **Framework:** Astro 5.x (static site generation with zero JavaScript by default)
- **Styling:** Tailwind CSS 3.x with custom terminal-inspired theme
- **Animations:** CSS transitions + keyframe animations, minimal JavaScript for interactivity
- **Type Safety:** TypeScript with strict type checking (`astro check`)
- **Data Validation:** JSON Schema for plugin and roadmap data
- **SEO:** Astro Sitemap integration, meta tags, robots.txt, Open Graph
- **Performance:**
  - Image optimization with lazy loading
  - Critical CSS inlined
  - Gzip-ready static assets
  - Lighthouse 90+ targets
- **Development Tools:**
  - ESLint for code quality
  - Prettier for code formatting
  - Node.js 18.17.1+ required

## 🧞 Commands

All commands are run from the root of the project:

| Command                        | Action                                         |
| :----------------------------- | :--------------------------------------------- |
| `npm install`                  | Installs dependencies                          |
| `npm run dev`                  | Starts local dev server at `localhost:4321`    |
| `npm run build`                | Build your production site to `./dist/`        |
| `npm run preview`              | Preview your build locally, before deploying   |
| `npm run check`                | Run all checks (Astro types, ESLint, Prettier) |
| `npm run check:astro`          | Type-check all Astro files                     |
| `npm run check:eslint`         | Lint code with ESLint                          |
| `npm run check:prettier`       | Check code formatting with Prettier            |
| `npm run fix`                  | Auto-fix ESLint and Prettier issues            |
| `npm run generate:plugin-docs` | Generate plugin documentation                  |
| `npm run validate:plugins`     | Validate all plugin data against schema        |
| `npm run validate:roadmap`     | Validate roadmap data against schema           |

## 📄 Pages & Features

### Core Pages

- **Homepage** (`/`)
  - Dynamic hero with real-time plugin counts and launch date
  - Terminal-style demo with animated prompt
  - Feature highlights with left-accent borders
  - **Interactive intelligence carousel** - Cycles through 5 empowering messaging angles with Play/Pause controls and navigation dots
  - Project status and current milestone progress
  - Featured plugin showcase
  - Multiple CTAs for engagement

- **Development Roadmap** (`/roadmap`)
  - Visual timeline of project milestones
  - Progress tracking for current milestone
  - Status indicators (completed, in-progress, upcoming)
  - Last updated timestamp
  - Detailed milestone descriptions

- **Plugins Directory** (`/plugins`)
  - Dynamic plugin listing from JSON data
  - Filter by category and status
  - Real-time stats (active, coming soon, total)
  - Search functionality
  - Individual plugin cards with icons and descriptions

- **Plugin Detail Pages** (`/plugins/[slug]`)
  - Full plugin documentation
  - Features and capabilities
  - Installation instructions
  - Quick-start guide
  - Command reference
  - Pricing information
  - Status and version badges

- **404 Error Page** (`/404`)
  - Terminal-themed error message
  - Navigation options

## 🔌 Plugin System

### Adding New Plugins

To add a new plugin to the website:

1. **Create plugin data file** at `src/data/plugins/[plugin-slug].json`:

   ```bash
   cp src/data/plugins/_template.json src/data/plugins/new-plugin.json
   ```

2. **Update plugin metadata** in the new JSON file:

   ```json
   {
     "id": "plugin-id",
     "slug": "plugin-slug",
     "name": "Plugin Name",
     "version": "1.0.0",
     "icon": "🔧",
     "tagline": "Short description",
     "description": "Detailed description...",
     "status": "active|coming-soon|beta",
     "category": "category-name",
     "features": ["Feature 1", "Feature 2"],
     "pricing": { "model": "freemium", "freeLimit": "100 queries/month" },
     "installation": {
       "method": "cli",
       "command": "huitzo install plugin-slug"
     },
     "quickstart": [
       { "title": "Step 1", "description": "..." },
       { "title": "Step 2", "description": "..." }
     ],
     "commands": [
       { "command": "plugin command --flag", "description": "What it does" }
     ]
   }
   ```

3. **Validate plugin data**:

   ```bash
   npm run validate:plugins
   ```

4. **Plugin auto-loads** - No additional configuration needed! The plugin will appear in:
   - Plugin directory (`/plugins`)
   - Homepage featured plugin (first active plugin)
   - Plugin statistics (count by status)

### Current Plugins

| Plugin                              | Slug                    | Status      | Version |
| ----------------------------------- | ----------------------- | ----------- | ------- |
| Financial Intelligence              | `financial`             | Active      | 1.0.0   |
| Mechanical Engineering Intelligence | `mechanical-engineering`| Idea Phase  | 0.0.0   |
| Job Market Report                   | `job-report`            | Coming Soon | 0.8.0   |
| Rubber Ducky                        | `rubber-ducky`          | Coming Soon | 0.7.0   |

### Plugin Data Validation

All plugin data is validated against `src/data/plugins/schema.json`. Run validation with:

```bash
npm run validate:plugins
```

This ensures all plugins have required fields and proper data types.

### Data & Roadmap

**Roadmap Data** (`src/data/roadmap.json`):

- Milestone title, description, progress, and status
- Target dates for each milestone
- Auto-computed public launch date on homepage
- Validated against `src/data/roadmap.schema.json`

**Plugin Statistics** (computed dynamically):

- Total plugins across all statuses
- Active, coming-soon, and beta counts
- Unique categories for filtering
- Used on homepage hero and plugins directory

**Validation Tools:**

```bash
npm run validate:roadmap   # Check roadmap data
npm run validate:plugins   # Check plugin data
```

## 🔗 Key Resources

- **CLI Platform:** https://cli.huitzo.com (WIP)

## 📝 License

This website is part of the Huitzo project. All rights reserved.

---

## 🙏 Acknowledgements

- https://github.com/arthelokyo/astrowind

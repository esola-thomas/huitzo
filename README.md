# Huitzo Website

The official website for **Huitzo** - an Intelligence-as-a-Service platform that democratizes intelligent data analysis through a plugin-based architecture.

## 🌟 About Huitzo

Huitzo makes complex data analysis as simple as having a conversation. Using a web-based command-line interface, users can configure sophisticated data processing tools with simple commands, regardless of technical expertise.

**Key Features:**

- Plugin-based architecture for extensibility
- Web-based CLI interface for easy access
- Intelligence-as-a-Service offerings
- First plugin: Financial Analysis with market insights

**Project Timeline:** October 2025 - May 2026 (7-month development cycle)

## 🚀 Project Structure

```text
huitzo.com/
├── src/
│   ├── layouts/
│   │   └── Layout.astro              # Main layout with header/footer
│   ├── pages/
│   │   ├── index.astro               # Homepage
│   │   ├── roadmap.astro             # Development roadmap
│   │   ├── plugins/
│   │   │   ├── index.astro           # Plugins directory
│   │   │   └── [slug].astro          # Individual plugin pages
│   │   └── 404.astro                 # 404 page
│   ├── components/
│   │   ├── Hero.astro                # Homepage hero section
│   │   ├── FeatureCard.astro         # Feature cards
│   │   ├── PluginCard.astro          # Plugin card component
│   │   ├── RoadmapTimeline.astro     # Timeline visualization
│   │   ├── CTAButton.astro           # Call-to-action button
│   │   ├── TerminalPrompt.astro      # Terminal-style text display
│   │   └── Command.astro             # Command with copy functionality
│   ├── styles/
│   │   └── global.css                # Global styles and CSS variables
│   └── data/
│       ├── roadmap.json              # Roadmap milestones data
│       └── plugins/
│           ├── financial.json        # Financial plugin manifest
│           └── _template.json        # Template for new plugins
├── public/
│   ├── favicon.svg                   # Huitzo-branded favicon
│   ├── og-image.png                  # Social media preview
│   └── robots.txt                    # SEO robots file
├── astro.config.mjs                  # Astro configuration
├── tailwind.config.cjs               # Tailwind CSS configuration
└── package.json
```

## 🎨 Design System

**Terminal-Inspired Dark Theme:**

- Primary Background: `#0a0e27` (very dark blue/black)
- Accent Color: `#00ff9f` (bright cyan/green)
- Typography: JetBrains Mono for headers, Inter for body text
- Terminal-style components with modern touches
- Responsive design with mobile-first approach

## 🛠️ Technology Stack

- **Framework:** Astro 4.x (static site generation)
- **Styling:** Tailwind CSS with custom terminal theme
- **Animations:** CSS animations + minimal JavaScript
- **SEO:** Automatic sitemap generation, meta tags, robots.txt
- **Performance:** Optimized for Lighthouse 90+ scores

## 🧞 Commands

All commands are run from the root of the project:

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `npm install`       | Installs dependencies                            |
| `npm run dev`       | Starts local dev server at `localhost:4321`      |
| `npm run build`     | Build your production site to `./dist/`          |
| `npm run preview`   | Preview your build locally, before deploying     |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro check` |

## 📄 Pages

- **Homepage** (`/`) - Hero, features, project status, featured plugin
- **Roadmap** (`/roadmap`) - Development timeline with progress tracking
- **Plugins** (`/plugins`) - Plugin directory with search and filtering
- **Plugin Details** (`/plugins/[slug]`) - Individual plugin information
- **404 Page** - Terminal-themed error page

## 🔌 Adding New Plugins

To add a new plugin to the website:

1. Create a new JSON file in `src/data/plugins/` using `_template.json` as a guide
2. Add the plugin slug to the `getStaticPaths()` function in `src/pages/plugins/[slug].astro`
3. Import and include the plugin in `src/pages/plugins/index.astro`

Example plugin data structure:

```json
{
  "id": "plugin-id",
  "slug": "plugin-slug",
  "name": "Plugin Name",
  "version": "1.0.0",
  "author": "Author Name",
  "icon": "🔧",
  "tagline": "Short description",
  "description": "Detailed description...",
  "features": ["Feature 1", "Feature 2"],
  "pricing": { ... },
  "installation": { ... },
  "quickstart": [ ... ],
  "commands": [ ... ]
}
```

## 🚀 Deployment

This site uses an **Azure DevOps → GitHub → GitHub Pages** CI/CD pipeline for free hosting while maintaining Azure DevOps as the primary development environment.

### Quick Start

1. **Validate configuration:**

   ```bash
   ./scripts/validate-deployment.sh
   ```

2. **Setup deployment:**

   ```bash
   ./scripts/setup-deployment.sh
   ```

**Deployment-ready features:**

- Automatic sitemap generation
- SEO-optimized meta tags
- Robots.txt for search engines
- Performance optimizations
- Mobile-responsive design
- CI/CD pipeline automation

## 📊 Performance Features

- **Zero JavaScript by default** (Astro islands for interactivity)
- **Optimized images** with lazy loading
- **Critical CSS inlined** for faster first paint
- **Google Fonts preloaded** for better performance
- **Gzip-ready** static assets

## 🔗 Key Links

- **CLI Platform:** https://cli.huitzo.com (to be built)
- **Azure DevOps:** https://dev.azure.com/huitzo-cli/Huitzo%20Site/_git/Huitzo_Site
- **Contact:** huitzo@solathomas.com

## 📝 License

This website is part of the Huitzo project. All rights reserved.

---

## 🙏 Acknowledgements

- https://github.com/arthelokyo/astrowind

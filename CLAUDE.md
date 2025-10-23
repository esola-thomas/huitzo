# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site to ./dist/
npm run preview      # Preview production build locally

# Code Quality
npm run check        # Run all checks (astro, eslint, prettier)
npm run fix          # Auto-fix eslint and prettier issues
npm run check:astro  # Check Astro types and errors
```

## Architecture Overview

This is an **Astro 5.14 static site** built from the **AstroWind template** with extensive customization for the Huitzo brand. The site uses a **widget-based architecture** from AstroWind combined with custom components for the terminal-inspired dark theme.

### Key Architecture Decisions

1. **Template Foundation**: Built on AstroWind template structure but with Huitzo-specific content and theming
2. **Static Output**: Pure static site generation, zero JavaScript by default except for interactivity islands
3. **Widget System**: Pages composed of reusable widget components (Hero, Features, Content, Steps, etc.)
4. **Path Aliasing**: Uses `~/` alias for imports (e.g., `import Layout from '~/layouts/PageLayout.astro'`)
5. **Configuration-driven**: Central `src/config.yaml` controls site metadata, analytics, and features

### Theming System

The site uses a **dark terminal aesthetic** with a custom theme defined in `src/components/CustomStyles.astro`:

- **Primary Color**: Cyan `#00BFFF` (`--aw-color-primary`)
- **Secondary Accent**: Magenta `#FF00FF` (`--aw-color-accent-secondary`)
- **Backgrounds**: Deep blacks `#010101`, `#0D0D0D`, `#1A1A1A`
- **Font**: JetBrains Mono for monospace/terminal elements, Inter Variable for body text
- **Responsive**: Mobile-first with breakpoints at 640px, 768px, 1024px

**Important**: All color customization uses CSS variables prefixed with `--aw-color-*` and `--aw-font-*`. Never hardcode colors directly in components.

### Navigation Structure

Navigation is centrally defined in `src/navigation.ts`:

```typescript
export const headerData = { links: [...], actions: [...] }
export const footerData = { links: [...], socialLinks: [...], footNote: '...' }
```

To add/remove navigation items, edit this file only. The Header and Footer widgets automatically consume this data.

### Layout System

- **PageLayout.astro**: Main layout wrapper (includes Header, Footer, SEO)
- **MarkdownLayout.astro**: For MDX content pages
- Most pages use `<Layout metadata={{...}}>` wrapper

### Data-Driven Content

Plugin and roadmap data are JSON files in `src/data/`:

```
src/data/
├── roadmap.json              # Roadmap milestones and metrics
└── plugins/
    ├── _template.json        # Template for new plugins
    └── financial.json        # Financial plugin data
```

To add a new plugin:

1. Create JSON file in `src/data/plugins/` using `_template.json`
2. Import in `src/pages/plugins/index.astro`
3. Add slug to `getStaticPaths()` in `src/pages/plugins/[slug].astro`

### Custom Components

**Huitzo-specific components** (not from template):

- **TerminalPrompt.astro**: Terminal-style text display with optional typing animation
  - Prefix syntax: `$` (command), `i>` (info), `s>` (success), `w>` (warning), `e>` (error), `!` (highlight)
- **FeatureCard.astro**: Feature cards with icons
- **PluginCard.astro**: Plugin showcase cards
- **RoadmapTimeline.astro**: Roadmap visualization with progress bars
- **Command.astro**: Command display with copy-to-clipboard

**Template widgets** (in `src/components/widgets/`):

- Hero, Features, Content, Steps, CallToAction, Header, Footer, Announcement

## Astro Configuration

File: `astro.config.ts`

- **Output**: `static` (SSG)
- **Site URL**: Dynamically set based on `NODE_ENV` (production: `https://huitzo.com`, dev: `localhost:4321`)
- **Base Path**: `/` (root)
- **Path Alias**: `~` → `./src`
- **Integrations**: Tailwind (no base styles), Sitemap, MDX, Astro Icon, Partytown (conditional), astro-compress

**Important**: When modifying `astro.config.ts`, ensure `site` URL matches deployment target. Never commit absolute localhost URLs.

## Styling Approach

- **Tailwind CSS 3.4**: Utility-first styling with custom theme
- **CustomStyles.astro**: Global CSS variables and custom classes (`.terminal-prompt`, `.glow`, `.card`, `.glassmorphism`, etc.)
- **No Base Styles**: `applyBaseStyles: false` in Tailwind integration to allow full control
- **Responsive Design**: Mobile-first breakpoints (`sm:`, `md:`, `lg:`)

### Adding Custom Styles

1. For theme-level changes (colors, fonts), edit `src/components/CustomStyles.astro` CSS variables
2. For utility classes, add to `src/components/CustomStyles.astro` within `<style is:inline>` tag
3. For component-specific styles, use Tailwind utilities in component files

## Deployment Architecture

**Azure DevOps → GitHub → GitHub Pages**

- Primary repo: Azure DevOps (`Huitzo_Site`)
- Mirror repo: GitHub (for public Pages hosting)
- Pipeline: `azure-pipelines.yml` syncs Azure → GitHub
- Hosting: GitHub Actions (`.github/workflows/astro.yml`) builds and deploys to Pages

**Deployment workflow**:

1. Push to Azure DevOps main branch
2. Azure Pipeline syncs to GitHub
3. GitHub Actions builds and deploys to GitHub Pages
4. Site live at production URL

See `DEPLOYMENT.md` for complete setup instructions.

## SEO and Analytics

- **Sitemap**: Auto-generated by `@astrojs/sitemap`
- **Analytics**: GoatCounter (dashboard: https://hutzo-cli.goatcounter.com/)
- **Metadata**: Configured in `src/config.yaml` under `metadata` section
- **Open Graph**: Images at `src/assets/images/default.png` (1200x628)

## Common Patterns

### Adding a New Page

```astro
---
import Layout from '~/layouts/PageLayout.astro';
---

<Layout metadata={{ title: 'Page Title', description: 'Description' }}>
  <!-- Page content -->
</Layout>
```

### Using TerminalPrompt with Animation

```astro
---
import TerminalPrompt from '~/components/TerminalPrompt.astro';

const lines = [
  '$ huitzo start',
  'i> Starting platform...',
  's> Success!'
];
---

<TerminalPrompt lines={lines} animate={true} class="glow" />
```

### Responsive Text Sizing

The terminal and other monospace elements use responsive font sizing:

- Mobile (≤639px): 12px
- Tablet (640-1023px): 14px
- Desktop (≥1024px): 16px

When adding new terminal-style components, follow this pattern in `CustomStyles.astro`.

## Important Notes

- **Blog Disabled**: `apps.blog.isEnabled: false` in config.yaml. Blog functionality exists in template but is not used.
- **Dark Mode Only**: `ui.theme: 'dark:only'` in config.yaml. No light mode toggle.
- **Node Version**: Requires Node 18.17.1+ or 20.3.0+ or 21+

## Project Timeline

Development: October 2025 - May 2026 (7-month cycle)
Expected Launch: May 2026 (IF NOT SOONER 👀)

## External Links

- CLI Platform (planned): https://cli.huitzo.com
- Issue Tracker: https://github.com/esola-thomas/huitzo/issues
- Azure DevOps: https://dev.azure.com/huitzo-cli/Huitzo%20Site/_git/Huitzo_Site

# Plugin Schema Documentation

> **Auto-generated documentation from [`schema.json`](./schema.json)**
>
> This documentation is automatically generated and should not be manually edited.
> Changes to plugin schema should be made in `schema.json` and documentation should be regenerated using:
>
> ```bash
> npm run generate:plugin-docs
> ```

## Overview

Schema for Huitzo plugin definitions. This is the single source of truth for plugin structure.

## Required Fields

The following fields are mandatory for every plugin definition:

- `id`
- `slug`
- `name`
- `version`
- `author`
- `icon`
- `tagline`
- `description`
- `category`
- `status`

## Field Reference

#### `id`

**Type:** `string`
**Required:** ✅ Yes

Unique identifier for the plugin (kebab-case, lowercase with hyphens)

**Pattern:** `^[a-z0-9]+(-[a-z0-9]+)*$`

**Examples:**
`financial-analysis`, `weather-plugin`

#### `slug`

**Type:** `string`
**Required:** ✅ Yes

URL-friendly slug for the plugin (kebab-case, lowercase with hyphens)

**Pattern:** `^[a-z0-9]+(-[a-z0-9]+)*$`

**Examples:**
`financial`, `weather`

#### `name`

**Type:** `string`
**Required:** ✅ Yes

Human-readable name of the plugin

**String length:** min: 1, max: 100

**Examples:**
`Financial Analysis`, `Weather Integration`

#### `version`

**Type:** `string`
**Required:** ✅ Yes

Semantic version of the plugin (MAJOR.MINOR.PATCH)

**Pattern:** `^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$`

**Examples:**
`1.0.0`, `0.1.0`, `2.3.4`

#### `author`

**Type:** `string`
**Required:** ✅ Yes

Author or organization that created the plugin

**String length:** min: 1, max: 100

**Examples:**
`Huitzo Team`, `John Doe`

#### `icon`

**Type:** `string`
**Required:** ✅ Yes

Icon identifier for the plugin (emoji or icon name from @iconify)

**Examples:**
`💰`, `📊`, `🔌`, `tabler:chart-bar`

#### `tagline`

**Type:** `string`
**Required:** ✅ Yes

Short one-liner description of what the plugin does

**String length:** min: 5, max: 160

**Examples:**
`Get real-time market insights`, `Connect to weather data`

#### `description`

**Type:** `string`
**Required:** ✅ Yes

Longer, detailed description explaining the plugin's functionality and benefits

**String length:** min: 10, max: 1000

**Examples:**
`Get personalized financial market analysis delivered to your inbox...`

#### `category`

**Type:** `string`
**Required:** ✅ Yes

Category classification for the plugin (lowercase, kebab-case)

**Allowed values:**

- `finance`
- `analytics`
- `automation`
- `integration`
- `data`
- `communication`
- `productivity`
- `other`

**Examples:**
`finance`, `analytics`

#### `status`

**Type:** `string`
**Required:** ✅ Yes

Current status of the plugin development

**Allowed values:**

- `active`
- `coming-soon`
- `beta`
- `deprecated`
- `archived`

**Examples:**
`active`, `coming-soon`

#### `features`

**Type:** `array`
**Required:** ❌ No

List of key features provided by the plugin

**Examples:**
`["Real-time market data","Portfolio analysis","Email notifications"]`

#### `pricing`

**Type:** `object`
**Required:** ❌ No

Pricing tiers and availability for the plugin

### `pricing`

Pricing tiers and availability for the plugin

#### `free`

**Type:** `object`
**Required:** ❌ No

Free tier pricing information

#### `pro`

**Type:** `object`
**Required:** ❌ No

Professional/Premium tier pricing information

#### `enterprise`

**Type:** `object`
**Required:** ❌ No

Enterprise tier pricing information

#### `installation`

**Type:** `object`
**Required:** ❌ No

Installation instructions and requirements for the plugin

### `installation`

Installation instructions and requirements for the plugin

#### `command`

**Type:** `string`
**Required:** ✅ Yes

Command to install the plugin

**String length:** min: 1, max: 200

**Examples:**
`huitzo plugin install financial`

#### `requirements`

**Type:** `array`
**Required:** ❌ No

System or dependency requirements

**Examples:**
`["Huitzo Core v1.0+","Node.js 18+"]`

#### `quickstart`

**Type:** `array`
**Required:** ❌ No

Step-by-step quickstart guide for the plugin

### `quickstart[]` - Array Items

#### `step`

**Type:** `integer`
**Required:** ✅ Yes

Step number (sequential, starting from 1)

**Range:** min: 1

#### `title`

**Type:** `string`
**Required:** ✅ Yes

Title of the step

**String length:** min: 1, max: 100

#### `command`

**Type:** `string`
**Required:** ✅ Yes

Command to execute for this step

**String length:** min: 1, max: 300

#### `description`

**Type:** `string`
**Required:** ❌ No

Additional description for the step

**String length:** max: 500

#### `commands`

**Type:** `array`
**Required:** ❌ No

Available CLI commands provided by the plugin

### `commands[]` - Array Items

#### `name`

**Type:** `string`
**Required:** ✅ Yes

Command name

**String length:** min: 1, max: 50

#### `description`

**Type:** `string`
**Required:** ✅ Yes

What the command does

**String length:** min: 1, max: 200

#### `usage`

**Type:** `string`
**Required:** ❌ No

Command usage example

**String length:** min: 1, max: 300

#### `links`

**Type:** `object`
**Required:** ❌ No

External links related to the plugin

### `links`

External links related to the plugin

#### `documentation`

**Type:** `string`
**Required:** ❌ No

Link to plugin documentation

**Examples:**
`https://docs.example.com/plugin`

#### `repository`

**Type:** `string`
**Required:** ❌ No

Link to source code repository

**Examples:**
`https://github.com/example/plugin`

#### `support`

**Type:** `string`
**Required:** ❌ No

Link to support or issue tracking

**Examples:**
`https://github.com/example/plugin/issues`

#### `website`

**Type:** `string`
**Required:** ❌ No

Link to plugin website

## Examples

### Minimal Plugin (with only required fields)

```json
{
  "id": "my-plugin",
  "slug": "my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "author": "Your Name",
  "icon": "🔌",
  "tagline": "Brief description of what it does",
  "description": "Longer description explaining the plugin functionality",
  "category": "productivity",
  "status": "active"
}
```

### Complete Plugin Example

```json
{
  "id": "financial-analysis",
  "slug": "financial",
  "name": "Financial Analysis",
  "version": "1.0.0",
  "author": "Huitzo Team",
  "icon": "💰",
  "tagline": "Personalized market insights delivered to your inbox",
  "description": "Get personalized financial market analysis...",
  "category": "finance",
  "status": "active",
  "features": [
    "Real-time market data",
    "Portfolio analysis",
    "Automated insights"
  ],
  "pricing": {
    "free": {
      "available": true,
      "limits": "5 reports per month"
    },
    "pro": {
      "price": "$10/month",
      "features": ["Unlimited reports", "Priority support"]
    }
  },
  "installation": {
    "command": "huitzo plugin install financial",
    "requirements": ["Huitzo Core v1.0+"]
  },
  "quickstart": [
    {
      "step": 1,
      "title": "Initialize the plugin",
      "command": "finance setup"
    }
  ],
  "links": {
    "documentation": "https://docs.example.com",
    "repository": "https://github.com/example/plugin"
  }
}
```

## Validation

All plugin files are automatically validated against this schema. Validation is performed:

- On every PR via GitHub Actions workflow
- Pre-commit using the validation script
- During local development

### Running Validation Locally

```bash
npm run validate:plugins
```

### Validation Errors

If you encounter validation errors, ensure:

1. All required fields are present
2. Values match the specified types and constraints
3. Enums only contain allowed values
4. String lengths are within limits
5. IDs and slugs follow the kebab-case pattern
6. Semantic versions follow MAJOR.MINOR.PATCH format

## Categories

Plugins must belong to one of these categories:

- `finance` - Financial and banking integrations
- `analytics` - Data analytics and reporting
- `automation` - Workflow automation
- `integration` - Third-party integrations
- `data` - Data management and processing
- `communication` - Communication tools
- `productivity` - Productivity and utilities
- `other` - Other categories

## Status Values

- `active` - Fully functional and supported
- `coming-soon` - In development, not yet available
- `beta` - Available but still undergoing testing
- `deprecated` - No longer maintained, users should migrate
- `archived` - Permanently retired

---

**Last updated:** 2025-10-23T03:15:59.612Z

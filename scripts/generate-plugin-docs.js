#!/usr/bin/env node

/**
 * Generate plugin schema documentation from schema.json
 * This script generates human-readable documentation from the JSON schema
 * Run: node scripts/generate-plugin-docs.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(__dirname, "../src/data/plugins/schema.json");
const docsPath = path.join(__dirname, "../src/data/plugins/SCHEMA.md");

function getTypeDescription(prop) {
  let type = prop.type;
  if (Array.isArray(type)) {
    type = type.join(" | ");
  }
  return type;
}

function formatExamples(examples) {
  if (!examples || !Array.isArray(examples)) return "";
  return examples
    .map((ex) => {
      if (typeof ex === "string") {
        return `\`${ex}\``;
      }
      return `\`${JSON.stringify(ex)}\``;
    })
    .join(", ");
}

function generatePropertyDocumentation(propName, prop, isRequired) {
  let doc = `#### \`${propName}\`\n\n`;

  doc += `**Type:** \`${getTypeDescription(prop)}\`\n`;
  doc += `**Required:** ${isRequired ? "✅ Yes" : "❌ No"}\n\n`;

  if (prop.description) {
    doc += `${prop.description}\n\n`;
  }

  if (prop.enum) {
    doc += `**Allowed values:**\n`;
    prop.enum.forEach((val) => {
      doc += `- \`${val}\`\n`;
    });
    doc += "\n";
  }

  if (prop.pattern) {
    doc += `**Pattern:** \`${prop.pattern}\`\n\n`;
  }

  if (prop.minLength || prop.maxLength) {
    const constraints = [];
    if (prop.minLength) constraints.push(`min: ${prop.minLength}`);
    if (prop.maxLength) constraints.push(`max: ${prop.maxLength}`);
    doc += `**String length:** ${constraints.join(", ")}\n\n`;
  }

  if (prop.minimum || prop.maximum) {
    const constraints = [];
    if (prop.minimum !== undefined) constraints.push(`min: ${prop.minimum}`);
    if (prop.maximum !== undefined) constraints.push(`max: ${prop.maximum}`);
    doc += `**Range:** ${constraints.join(", ")}\n\n`;
  }

  if (prop.examples && prop.examples.length > 0) {
    doc += `**Examples:**\n`;
    const examples = formatExamples(prop.examples);
    doc += `${examples}\n\n`;
  }

  if (prop.default !== undefined) {
    doc += `**Default:** \`${JSON.stringify(prop.default)}\`\n\n`;
  }

  return doc;
}

function generateNestedObjectDocumentation(propName, prop, parentPath = "") {
  let doc = "";
  const fullPath = parentPath ? `${parentPath}.${propName}` : propName;

  if (prop.type === "object") {
    doc += `### \`${fullPath}\`\n\n`;
    if (prop.description) {
      doc += `${prop.description}\n\n`;
    }

    const required = prop.required || [];

    if (prop.properties) {
      for (const [childName, childProp] of Object.entries(prop.properties)) {
        const isRequired = required.includes(childName);
        doc += generatePropertyDocumentation(childName, childProp, isRequired);
      }
    }

    if (prop.items && prop.items.properties) {
      doc += `#### Item Properties\n\n`;
      for (const [itemName, itemProp] of Object.entries(
        prop.items.properties,
      )) {
        const isRequired = (prop.items.required || []).includes(itemName);
        doc += generatePropertyDocumentation(itemName, itemProp, isRequired);
      }
    }
  }

  return doc;
}

function generateMarkdown(schema) {
  let markdown = `# Plugin Schema Documentation

> **Auto-generated documentation from [\`schema.json\`](./schema.json)**
> 
> This documentation is automatically generated and should not be manually edited.
> Changes to plugin schema should be made in \`schema.json\` and documentation should be regenerated using:
> \`\`\`bash
> npm run generate:plugin-docs
> \`\`\`

## Overview

${schema.description}

## Required Fields

The following fields are mandatory for every plugin definition:

`;

  const required = schema.required || [];
  required.forEach((field) => {
    markdown += `- \`${field}\`\n`;
  });

  markdown += `

## Field Reference

`;

  // Generate documentation for top-level properties
  for (const [propName, prop] of Object.entries(schema.properties)) {
    const isRequired = required.includes(propName);
    markdown += generatePropertyDocumentation(propName, prop, isRequired);

    // Handle nested objects
    if (prop.type === "object" && prop.properties) {
      markdown += generateNestedObjectDocumentation(propName, prop);
    }

    // Handle arrays of objects
    if (prop.type === "array" && prop.items && prop.items.properties) {
      markdown += `### \`${propName}[]\` - Array Items\n\n`;
      if (prop.items.description) {
        markdown += `${prop.items.description}\n\n`;
      }

      const itemRequired = prop.items.required || [];
      for (const [itemName, itemProp] of Object.entries(
        prop.items.properties,
      )) {
        const isRequired = itemRequired.includes(itemName);
        markdown += generatePropertyDocumentation(
          itemName,
          itemProp,
          isRequired,
        );
      }
    }
  }

  markdown += `

## Examples

### Minimal Plugin (with only required fields)

\`\`\`json
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
\`\`\`

### Complete Plugin Example

\`\`\`json
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
\`\`\`

## Validation

All plugin files are automatically validated against this schema. Validation is performed:

- On every PR via GitHub Actions workflow
- Pre-commit using the validation script
- During local development

### Running Validation Locally

\`\`\`bash
npm run validate:plugins
\`\`\`

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

- \`finance\` - Financial and banking integrations
- \`analytics\` - Data analytics and reporting
- \`automation\` - Workflow automation
- \`integration\` - Third-party integrations
- \`data\` - Data management and processing
- \`communication\` - Communication tools
- \`productivity\` - Productivity and utilities
- \`other\` - Other categories

## Status Values

- \`active\` - Fully functional and supported
- \`coming-soon\` - In development, not yet available
- \`beta\` - Available but still undergoing testing
- \`deprecated\` - No longer maintained, users should migrate
- \`archived\` - Permanently retired

---

**Last updated:** ${new Date().toISOString()}
`;

  return markdown;
}

try {
  const schemaContent = fs.readFileSync(schemaPath, "utf-8");
  const schema = JSON.parse(schemaContent);

  const markdown = generateMarkdown(schema);
  fs.writeFileSync(docsPath, markdown, "utf-8");

  console.log(`✅ Plugin documentation generated successfully!`);
  console.log(`📄 Output: ${docsPath}`);
  process.exit(0);
} catch (error) {
  console.error("❌ Error generating documentation:", error.message);
  process.exit(1);
}

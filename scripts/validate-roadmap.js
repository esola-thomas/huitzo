#!/usr/bin/env node

/**
 * Validate roadmap schema
 * This script validates the roadmap JSON file against the schema
 * Run: npm run validate:roadmap
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Ajv from "ajv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../src/data");
const roadmapPath = path.join(dataDir, "roadmap.json");
const schemaPath = path.join(dataDir, "roadmap.schema.json");

// Initialize AJV validator
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false,
});

// Add custom format validators used by the roadmap schema
ajv.addFormat(
  "date-time",
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/,
);
ajv.addFormat("date", /^\d{4}-\d{2}-\d{2}$/);

function formatError(error) {
  const { instancePath, keyword, params, message } = error;

  let output = `  ❌ ${keyword}`;

  if (instancePath) {
    output += ` at ${instancePath}`;
  }

  output += `: ${message}`;

  if (params) {
    if (params.allowedValues) {
      output += ` (allowed: ${params.allowedValues.join(", ")})`;
    }
    if (params.pattern) {
      output += ` (pattern: ${params.pattern})`;
    }
    if (params.limit !== undefined) {
      if (
        keyword === "minLength" ||
        keyword === "minimum" ||
        keyword === "minItems" ||
        keyword === "minProperties"
      ) {
        output += ` (minimum: ${params.limit})`;
      } else if (
        keyword === "maxLength" ||
        keyword === "maximum" ||
        keyword === "maxItems"
      ) {
        output += ` (maximum: ${params.limit})`;
      }
    }
  }

  return output;
}

function main() {
  // Load schema
  let schema;
  try {
    const schemaContent = fs.readFileSync(schemaPath, "utf-8");
    schema = JSON.parse(schemaContent);
    console.log(`📋 Schema loaded from ${path.basename(schemaPath)}\n`);
  } catch (error) {
    console.error(`❌ Failed to load schema: ${error.message}`);
    process.exit(1);
  }

  // Compile schema
  let validate;
  try {
    validate = ajv.compile(schema);
  } catch (error) {
    console.error(`❌ Failed to compile schema: ${error.message}`);
    process.exit(1);
  }

  // Load roadmap data
  let roadmap;
  try {
    const roadmapContent = fs.readFileSync(roadmapPath, "utf-8");
    roadmap = JSON.parse(roadmapContent);
    console.log(`📄 Validating ${path.basename(roadmapPath)}\n`);
  } catch (error) {
    console.error(`❌ Failed to load roadmap file: ${error.message}`);
    process.exit(1);
  }

  const isValid = validate(roadmap);

  if (!isValid) {
    console.error(
      `❌ Roadmap validation failed with ${validate.errors.length} error(s):`,
    );
    validate.errors.forEach((error) => {
      console.error(formatError(error));
    });
    process.exit(1);
  }

  console.log("✅ Roadmap validated successfully!");
  process.exit(0);
}

main();

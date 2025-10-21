#!/usr/bin/env node

/**
 * Validate plugin schema
 * This script validates all plugin JSON files against the schema
 * Run: npm run validate:plugins
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Ajv from "ajv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pluginsDir = path.join(__dirname, "../src/data/plugins");
const schemaPath = path.join(pluginsDir, "schema.json");

// Initialize AJV validator
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false,
});

// Add custom format validator for URIs
ajv.addFormat("uri", /^https?:\/\/.+/i);

function formatError(error) {
  const { instancePath, schemaPath, keyword, params, message } = error;

  let output = `  ❌ ${keyword}`;

  if (instancePath) {
    output += ` at ${instancePath}`;
  }

  output += ": " + message;

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
        keyword === "minItems"
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

function validatePluginFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const plugin = JSON.parse(content);
    return { valid: true, data: plugin, errors: [] };
  } catch (error) {
    return {
      valid: false,
      data: null,
      errors: [`JSON Parse Error: ${error.message}`],
    };
  }
}

function validateAgainstSchema(plugin, schema, validate) {
  const isValid = validate(plugin);

  if (!isValid) {
    return validate.errors.map(formatError);
  }

  return [];
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

  // Find all plugin files
  let pluginFiles;
  try {
    pluginFiles = fs
      .readdirSync(pluginsDir)
      .filter((file) => file.endsWith(".json") && file !== "schema.json")
      .map((file) => path.join(pluginsDir, file));
  } catch (error) {
    console.error(`❌ Failed to read plugins directory: ${error.message}`);
    process.exit(1);
  }

  if (pluginFiles.length === 0) {
    console.warn("⚠️  No plugin files found to validate");
    return;
  }

  console.log(`🔍 Validating ${pluginFiles.length} plugin file(s)...\n`);

  let totalErrors = 0;
  const results = [];

  // Validate each plugin file
  pluginFiles.forEach((filePath) => {
    const fileName = path.basename(filePath);

    // First, validate JSON syntax
    const parseResult = validatePluginFile(filePath);

    if (!parseResult.valid) {
      totalErrors += parseResult.errors.length;
      results.push({
        file: fileName,
        status: "error",
        errors: parseResult.errors,
      });
      return;
    }

    // Then validate against schema
    const schemaErrors = validateAgainstSchema(
      parseResult.data,
      schema,
      validate,
    );

    if (schemaErrors.length > 0) {
      totalErrors += schemaErrors.length;
      results.push({
        file: fileName,
        status: "error",
        errors: schemaErrors,
      });
    } else {
      results.push({
        file: fileName,
        status: "success",
        errors: [],
      });
    }
  });

  // Print results
  results.forEach((result) => {
    if (result.status === "success") {
      console.log(`✅ ${result.file}`);
    } else {
      console.log(`❌ ${result.file}`);
      result.errors.forEach((error) => {
        console.log(error);
      });
      console.log("");
    }
  });

  // Summary
  const successCount = results.filter((r) => r.status === "success").length;
  const errorCount = results.filter((r) => r.status === "error").length;

  console.log("---\n");
  console.log(`📊 Validation Summary:`);
  console.log(`  ✅ Passed: ${successCount}`);
  console.log(`  ❌ Failed: ${errorCount}`);
  console.log(`  ⚠️  Errors: ${totalErrors}\n`);

  if (totalErrors > 0) {
    console.error("❌ Validation failed. Please fix the errors above.");
    process.exit(1);
  } else {
    console.log("✅ All plugins validated successfully!");
    process.exit(0);
  }
}

main();

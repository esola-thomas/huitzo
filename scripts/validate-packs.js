#!/usr/bin/env node

/**
 * Validate intelligence pack schema
 * This script validates all intelligence pack JSON files against the schema
 * Run: npm run validate:packs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Ajv from "ajv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packsDir = path.join(__dirname, "../src/data/intelligence-packs");
const schemaPath = path.join(packsDir, "schema.json");

// Initialize AJV validator
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false,
});

// Add custom format validator for URIs
ajv.addFormat("uri", /^https?:\/\/.+/i);

function formatError(error) {
  const { instancePath, keyword, params, message } = error;

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

function validatePackFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const pack = JSON.parse(content);
    return { valid: true, data: pack, errors: [] };
  } catch (error) {
    return {
      valid: false,
      data: null,
      errors: [`JSON Parse Error: ${error.message}`],
    };
  }
}

function validateAgainstSchema(pack, schema, validate) {
  const isValid = validate(pack);

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
    console.log(`📋 Schema loaded\n`);
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

  // Find all intelligence pack files
  let packFiles;
  try {
    packFiles = fs
      .readdirSync(packsDir)
      .filter((file) => file.endsWith(".json") && file !== "schema.json")
      .map((file) => path.join(packsDir, file));
  } catch (error) {
    console.error(`❌ Failed to read intelligence packs directory: ${error.message}`);
    process.exit(1);
  }

  if (packFiles.length === 0) {
    console.warn("⚠️  No intelligence pack files found to validate");
    return;
  }

  console.log(`🔍 Validating ${packFiles.length} intelligence pack file(s)...\n`);

  let totalErrors = 0;
  const results = [];

  // Validate each intelligence pack file
  packFiles.forEach((filePath) => {
    const fileName = path.basename(filePath);

    // First, validate JSON syntax
    const parseResult = validatePackFile(filePath);

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
    console.log("✅ All intelligence packs validated successfully!");
    process.exit(0);
  }
}

main();

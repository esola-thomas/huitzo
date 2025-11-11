---
title: "Install Your First Plugin"
description: "Learn how to discover, install, and use your first Huitzo plugin"
tags: [getting-started, plugins, quickstart]
category: "getting-started"
order: 2
audience: "users"
lastUpdated: 2025-11-09
---

# Install Your First Plugin

Plugins are the heart of Huitzo, providing specialized intelligence services for different domains. This guide walks you through installing and using your first plugin.

## Understanding Plugins

Each Huitzo plugin provides:

- **Domain-specific analysis** - Specialized for financial, engineering, or other fields
- **Pre-configured workflows** - Common analysis patterns ready to use
- **Context preservation** - Maintains state across commands
- **Simple commands** - Complex analysis through simple CLI commands

## Discovering Plugins

### List Available Plugins

See all available plugins:

```bash
huitzo plugin list --available
```

### Search for Plugins

Search by keyword:

```bash
huitzo plugin search financial
```

### View Plugin Details

Get detailed information about a plugin:

```bash
huitzo plugin info financial
```

This displays:
- Plugin description
- Available commands
- Installation requirements
- Usage examples

## Installing a Plugin

### Install Command

Install the financial plugin as an example:

```bash
huitzo plugin install financial
```

You'll see output like:

```
i> Installing financial plugin...
s> Successfully installed financial v1.0.0
i> Run 'huitzo financial --help' to get started
```

### Verify Installation

List installed plugins:

```bash
huitzo plugin list
```

## Using Your Plugin

### View Plugin Commands

See what commands your plugin provides:

```bash
huitzo financial --help
```

### Run Your First Analysis

Try a simple command:

```bash
huitzo financial analyze --symbol AAPL --period 1y
```

This analyzes Apple stock over the past year.

### Understanding Output

Plugins output structured data in terminal-friendly format:

```
$ huitzo financial analyze --symbol AAPL --period 1y
i> Fetching data for AAPL...
s> Analysis complete

📊 Financial Analysis: AAPL (1 year)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current Price:    $178.45
52-Week High:     $199.62
52-Week Low:      $164.08
Average Volume:   52.3M
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Key Insights:
• Price trending upward (+8.7% YoY)
• Volume above average
• Strong momentum indicators
```

## Plugin Configuration

### View Plugin Config

```bash
huitzo plugin config financial --show
```

### Modify Configuration

```bash
huitzo plugin config financial --set api_key=your_key
```

## Plugin Management

### Update a Plugin

Keep plugins up to date:

```bash
huitzo plugin update financial
```

### Update All Plugins

```bash
huitzo plugin update --all
```

### Uninstall a Plugin

If you no longer need a plugin:

```bash
huitzo plugin uninstall financial
```

## Common Plugin Patterns

### Chaining Commands

Plugins support command chaining for complex workflows:

```bash
huitzo financial fetch AAPL | huitzo financial analyze | huitzo financial report
```

### Saving Results

Save analysis results to file:

```bash
huitzo financial analyze --symbol AAPL --output results.json
```

### Scheduled Analysis

Set up recurring analysis with cron:

```bash
huitzo financial analyze --symbol AAPL --schedule "0 9 * * *"
```

This runs analysis daily at 9 AM.

## Troubleshooting

### Plugin Installation Fails

If installation fails:

```bash
# Check Python version
python --version  # Should be 3.10+

# Update pip
pip install --upgrade pip

# Try again with verbose output
huitzo plugin install financial --verbose
```

### Missing Dependencies

Some plugins require additional dependencies:

```bash
# Install with dependencies
huitzo plugin install financial --with-deps
```

### Plugin Not Found

If a plugin command isn't recognized:

```bash
# Verify plugin is installed
huitzo plugin list

# Reinstall if needed
huitzo plugin reinstall financial
```

## Plugin Examples by Category

### Financial Analysis
```bash
huitzo plugin install financial
huitzo financial analyze --symbol AAPL
```

### Engineering Calculations
```bash
huitzo plugin install mechanical-engineering
huitzo mech calculate --type stress --material steel
```

### Data Transformation
```bash
huitzo plugin install data-transform
huitzo transform csv-to-json input.csv
```

## Best Practices

1. **Keep plugins updated** - Run `huitzo plugin update --all` regularly
2. **Read plugin docs** - Each plugin has specific usage patterns
3. **Start simple** - Use basic commands before complex workflows
4. **Check versions** - Ensure plugin compatibility with your Huitzo version
5. **Report issues** - Help improve plugins by reporting bugs

## What's Next?

- **[CLI Basics](/docs/users/guides/cli-basics)** - Master the command-line interface
- **[Browse All Plugins](/plugins)** - Explore the plugin marketplace
- **[Advanced Workflows](/docs/users/guides/workflows)** - Build complex analysis pipelines

## Quick Reference

```bash
# Plugin Management
huitzo plugin list                    # List installed plugins
huitzo plugin list --available        # List all available plugins
huitzo plugin install <name>          # Install a plugin
huitzo plugin update <name>           # Update a plugin
huitzo plugin uninstall <name>        # Remove a plugin
huitzo plugin info <name>             # View plugin details
huitzo plugin search <keyword>        # Search for plugins

# Plugin Usage
huitzo <plugin> --help                # View plugin commands
huitzo <plugin> <command> --help      # View command options
```

---

**Previous:** [← Getting Started](/docs/users/getting-started/installation) | **Next:** [CLI Basics →](/docs/users/guides/cli-basics)

---
title: "Getting Started with Huitzo"
description: "Learn how to install and start using Huitzo CLI for intelligent data analysis"
tags: [getting-started, installation, quickstart]
category: "getting-started"
order: 1
audience: "users"
lastUpdated: 2025-11-09
---

# Getting Started with Huitzo

Welcome to Huitzo! This guide will help you get up and running with the Huitzo CLI platform in just a few minutes.

## What is Huitzo?

Huitzo is an Intelligence-as-a-Service platform that brings powerful data analysis capabilities to your command line. Through a plugin-based architecture, Huitzo democratizes access to sophisticated analytical tools.

## Prerequisites

Before installing Huitzo, ensure you have:

- **Python 3.10 or later**
- **pip** (Python package installer)
- **Command line terminal** (bash, zsh, or PowerShell)

## Installation

### Quick Install

Install Huitzo using pip:

```bash
pip install huitzo
```

### Verify Installation

After installation, verify Huitzo is working:

```bash
huitzo --version
```

You should see output similar to:

```
Huitzo CLI v1.0.0
```

## First Steps

### Check Available Commands

See all available commands:

```bash
huitzo --help
```

### Configure Your Environment

Set up your Huitzo configuration:

```bash
huitzo config init
```

This will create a configuration file at `~/.huitzo/config.yaml`.

### Authentication

If you're using cloud-based features, authenticate with your API key:

```bash
export HUITZO_API_TOKEN=your_api_token_here
```

> **Tip:** Add this to your shell profile (`~/.bashrc`, `~/.zshrc`) to persist across sessions.

## Your First Command

Let's try a simple command to verify everything is working:

```bash
huitzo status
```

This should display your current Huitzo installation status and configuration.

## What's Next?

Now that you have Huitzo installed, explore these resources:

- **[Install Your First Plugin](/docs/users/getting-started/first-plugin)** - Learn how to install and use plugins
- **[CLI Basics](/docs/users/guides/cli-basics)** - Master the command-line interface
- **[Available Plugins](/plugins)** - Browse the plugin marketplace

## Getting Help

If you encounter issues:

- Check our [Troubleshooting Guide](/docs/users/reference/troubleshooting)
- [Report an issue](https://github.com/esola-thomas/huitzo/issues/new) on GitHub
- Contact support at support@huitzo.com

## Quick Reference

### Common Commands

```bash
# Show help
huitzo --help

# Check version
huitzo --version

# List installed plugins
huitzo plugin list

# Install a plugin
huitzo plugin install <plugin-name>

# Update Huitzo
pip install --upgrade huitzo
```

---

**Next:** [Install Your First Plugin →](/docs/users/getting-started/first-plugin)

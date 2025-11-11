---
title: "Huitzo SDK Installation"
description: "Install and configure the Huitzo Python SDK for plugin development"
tags: [sdk, installation, setup, python]
category: "getting-started"
order: 1
audience: "developers"
lastUpdated: 2025-11-09
---

# Huitzo SDK Installation

The Huitzo SDK provides a comprehensive Python toolkit for building powerful intelligence plugins. This guide walks you through installation and initial setup.

## Prerequisites

### System Requirements

- **Python 3.10 or later** (required)
- **pip** package manager
- **Virtual environment** (recommended)
- **Git** (for development)

### Check Python Version

```bash
python --version
# Should output: Python 3.10.x or higher
```

If you need to upgrade Python, visit [python.org](https://python.org).

## Installation

### Quick Install

Install the Huitzo SDK from PyPI:

```bash
pip install huitzo-sdk
```

### Install from Source

For development or latest features:

```bash
git clone https://github.com/huitzo/huitzo-sdk
cd huitzo-sdk
pip install -e .
```

### Verify Installation

```bash
python -c "import huitzo; print(huitzo.__version__)"
```

Expected output:
```
1.0.20251108
```

## Configuration

### API Token Setup

The Huitzo SDK requires an API token for authentication:

```bash
export HUITZO_API_TOKEN=your_api_token_here
```

### Persistent Configuration

Add to your shell profile (`~/.bashrc`, `~/.zshrc`, or `~/.profile`):

```bash
# Huitzo Configuration
export HUITZO_API_TOKEN=your_api_token_here
export HUITZO_BASE_URL=https://api.huitzo.com  # Optional
```

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `HUITZO_API_TOKEN` | Yes | - | Your API authentication token |
| `HUITZO_BASE_URL` | No | `https://api.huitzo.com` | API endpoint URL |
| `HUITZO_TIMEOUT` | No | `30` | Request timeout in seconds |

## Virtual Environment Setup

We strongly recommend using virtual environments:

### Using venv

```bash
# Create virtual environment
python -m venv huitzo-env

# Activate (Linux/Mac)
source huitzo-env/bin/activate

# Activate (Windows)
huitzo-env\Scripts\activate

# Install SDK
pip install huitzo-sdk
```

### Using conda

```bash
# Create environment
conda create -n huitzo python=3.10

# Activate
conda activate huitzo

# Install SDK
pip install huitzo-sdk
```

## Quick Start

### Your First SDK Call

Create a file `test_sdk.py`:

```python
import asyncio
from huitzo import HuitzoClient

async def main():
    async with HuitzoClient() as client:
        # Test connection
        status = await client.get_status()
        print(f"Connected to Huitzo API: {status}")

if __name__ == "__main__":
    asyncio.run(main())
```

Run it:

```bash
python test_sdk.py
```

### Basic SDK Usage

```python
import asyncio
from huitzo import HuitzoClient

async def example():
    # Initialize client with context manager
    async with HuitzoClient() as client:
        # Use LLM service
        response = await client.llm.complete(
            prompt="Analyze this data...",
            model="gpt-4"
        )
        print(response.content)

        # Schedule a CRON job
        job = await client.cron.create(
            name="daily-analysis",
            schedule="0 9 * * *",
            command="huitzo analyze"
        )
        print(f"Created job: {job.id}")

        # Send an email
        await client.email.send(
            to="user@example.com",
            subject="Analysis Complete",
            body="Your analysis is ready!"
        )

asyncio.run(example())
```

## SDK Features Overview

The Huitzo SDK provides four main services:

### CRON Service
Schedule recurring command executions with cron expressions.

```python
await client.cron.create(
    name="job-name",
    schedule="0 * * * *"  # Every hour
)
```

### Email Service
Send templated emails with Jinja2 support.

```python
await client.email.send(
    to="user@example.com",
    template="report.html",
    context={"data": results}
)
```

### LLM Service
Generate text using OpenAI, Claude, and other providers.

```python
response = await client.llm.complete(
    prompt="Your prompt here",
    model="gpt-4",
    stream=True
)
```

### Hosting Service
Deploy temporary static sites from .zip archives.

```python
site = await client.hosting.upload(
    file_path="site.zip",
    expires_in_days=7
)
```

## Development Setup

### Install Development Dependencies

```bash
pip install huitzo-sdk[dev]
```

This installs:
- **pytest** - Testing framework
- **mypy** - Type checking
- **black** - Code formatting
- **ruff** - Linting

### Project Structure

```
my-plugin/
├── src/
│   └── my_plugin/
│       ├── __init__.py
│       └── main.py
├── tests/
│   └── test_main.py
├── pyproject.toml
├── README.md
└── .env
```

### Example pyproject.toml

```toml
[project]
name = "my-huitzo-plugin"
version = "0.1.0"
requires-python = ">=3.10"
dependencies = [
    "huitzo-sdk>=1.0.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0",
    "mypy>=1.0",
    "black>=23.0",
    "ruff>=0.1.0",
]
```

## Troubleshooting

### Import Error

If you see `ModuleNotFoundError: No module named 'huitzo'`:

```bash
# Verify installation
pip list | grep huitzo

# Reinstall if needed
pip install --force-reinstall huitzo-sdk
```

### Authentication Error

If you see `AuthenticationError`:

```bash
# Verify token is set
echo $HUITZO_API_TOKEN

# Test connection
python -c "from huitzo import HuitzoClient; import asyncio; asyncio.run(HuitzoClient().get_status())"
```

### SSL Certificate Error

If you encounter SSL errors:

```bash
# Update certificates (Mac)
/Applications/Python\ 3.x/Install\ Certificates.command

# Update certifi (All platforms)
pip install --upgrade certifi
```

### Timeout Errors

Increase timeout for slow connections:

```python
client = HuitzoClient(timeout=60)  # 60 seconds
```

## Rate Limits

Be aware of rate limits by plan:

| Service | FREE | PRO | ENTERPRISE |
|---------|------|-----|------------|
| CRON Jobs | 10 | 100 | Unlimited |
| Daily Emails | 100 | 1,000 | Unlimited |
| Daily LLM Requests | 100 | 1,000 | Unlimited |
| Site Storage | 200MB (5 sites) | - | - |

## Additional Resources

- **[SDK API Reference](https://pypi.org/project/huitzo-sdk/)** - Complete API documentation
- **[Code Examples](/docs/developers/examples)** - Real-world usage patterns
- **[Plugin Architecture](/docs/developers/plugin-development/architecture)** - Design your plugin
- **[GitHub Repository](https://github.com/huitzo/huitzo-sdk)** - Source code and issues

## What's Next?

- **[Your First Plugin](/docs/developers/getting-started/first-plugin)** - Build a simple plugin
- **[SDK Reference](/docs/developers/sdk-reference/overview)** - Explore all SDK features
- **[LLM Service](/docs/developers/sdk-reference/llm-service)** - Work with AI models

## Quick Reference

```bash
# Installation
pip install huitzo-sdk                # Install from PyPI
pip install huitzo-sdk[dev]           # Install with dev dependencies
pip install --upgrade huitzo-sdk      # Upgrade to latest version

# Environment Setup
export HUITZO_API_TOKEN=your_token    # Set API token
export HUITZO_BASE_URL=https://...    # Set custom API endpoint

# Testing
python -c "import huitzo"             # Test import
python test_sdk.py                    # Run your code
```

---

**Next:** [Build Your First Plugin →](/docs/developers/getting-started/first-plugin)

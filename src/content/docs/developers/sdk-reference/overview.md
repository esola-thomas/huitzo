---
title: "Huitzo SDK Overview"
description: "Comprehensive overview of the Huitzo Python SDK architecture and capabilities"
tags: [sdk, overview, architecture, api]
category: "sdk-reference"
order: 1
audience: "developers"
lastUpdated: 2025-11-09
---

# Huitzo SDK Overview

The Huitzo SDK is a Python developer toolkit that provides async/await support for building intelligent plugins. Built on aiohttp, it offers a clean, modern API for interacting with Huitzo's Intelligence-as-a-Service platform.

## SDK Architecture

### Core Design Principles

1. **Async-First** - Built on async/await for high performance
2. **Type-Safe** - Full type hints for IDE support and type checking
3. **Pydantic Models** - Strong request/response validation
4. **Context Managers** - Automatic resource management
5. **Error Handling** - Comprehensive exception hierarchy

### Client Initialization

```python
from huitzo import HuitzoClient

# Using context manager (recommended)
async with HuitzoClient() as client:
    response = await client.llm.complete("Hello, world!")

# Manual initialization
client = HuitzoClient(
    api_token="your_token",
    base_url="https://api.huitzo.com",
    timeout=30
)
try:
    response = await client.llm.complete("Hello, world!")
finally:
    await client.close()
```

## Service Overview

The SDK provides four main services, each with its own API surface:

### 1. CRON Service

Schedule recurring command executions with cron expressions.

```python
# Create a scheduled job
job = await client.cron.create(
    name="daily-report",
    schedule="0 9 * * *",  # Every day at 9 AM
    command="huitzo analyze --daily",
    enabled=True
)

# List all jobs
jobs = await client.cron.list()

# Update a job
await client.cron.update(job.id, schedule="0 10 * * *")

# Delete a job
await client.cron.delete(job.id)
```

**Key Features:**
- Standard cron expression syntax
- Enable/disable jobs without deleting
- Job execution history
- Timezone support

**Limits:**
- FREE: 10 jobs
- PRO: 100 jobs
- ENTERPRISE: Unlimited

### 2. Email Service

Send messages and manage Jinja2-templated emails.

```python
# Send simple email
await client.email.send(
    to="user@example.com",
    subject="Your Report",
    body="Analysis complete!"
)

# Send templated email
await client.email.send(
    to="user@example.com",
    subject="Monthly Report",
    template="monthly_report.html",
    context={
        "user_name": "John",
        "metrics": {...},
        "charts": [...]
    }
)

# Send with attachments
await client.email.send(
    to="user@example.com",
    subject="Files Attached",
    body="See attached files",
    attachments=["report.pdf", "data.csv"]
)
```

**Key Features:**
- Jinja2 template engine
- HTML and plain text support
- File attachments
- Bulk sending

**Limits:**
- FREE: 100 emails/day
- PRO: 1,000 emails/day
- ENTERPRISE: Unlimited

### 3. LLM Service

Generate text using OpenAI, Claude, and other providers.

```python
# Simple completion
response = await client.llm.complete(
    prompt="Analyze this data: ...",
    model="gpt-4"
)
print(response.content)

# Streaming response
async for chunk in client.llm.stream(
    prompt="Write a long article...",
    model="gpt-4"
):
    print(chunk.content, end="", flush=True)

# With parameters
response = await client.llm.complete(
    prompt="Creative writing task",
    model="claude-3-opus",
    temperature=0.9,
    max_tokens=2000,
    system="You are a creative writer..."
)

# Cost calculation
cost = await client.llm.calculate_cost(
    model="gpt-4",
    input_tokens=1000,
    output_tokens=500
)
print(f"Estimated cost: ${cost:.4f}")
```

**Supported Models:**
- **OpenAI**: GPT-4, GPT-4 Turbo, GPT-3.5
- **Anthropic**: Claude 3 Opus, Sonnet, Haiku
- **Others**: Custom model endpoints

**Key Features:**
- Streaming completions
- Token counting
- Cost calculation
- Template workflows
- Response caching

**Limits:**
- FREE: 100 requests/day
- PRO: 1,000 requests/day
- ENTERPRISE: Unlimited

### 4. Hosting Service

Deploy temporary static sites from .zip archives.

```python
# Upload a site
site = await client.hosting.upload(
    file_path="site.zip",
    expires_in_days=7
)
print(f"Site URL: {site.url}")

# List all sites
sites = await client.hosting.list()

# Get site details
site = await client.hosting.get(site_id)

# Delete a site
await client.hosting.delete(site_id)

# Update expiration
await client.hosting.update(
    site_id,
    expires_in_days=14
)
```

**Key Features:**
- Automatic deployment from .zip
- Custom expiration (up to 7 days on FREE)
- SSL/HTTPS included
- CDN delivery

**Limits:**
- FREE: 5 sites, 200MB total, 7 days max
- PRO: Custom limits
- ENTERPRISE: Custom limits

## Response Models

All SDK methods return Pydantic models with full type safety:

```python
from huitzo.models import CronJob, EmailResponse, LLMCompletion, HostedSite

# Cron job response
job: CronJob = await client.cron.create(...)
print(job.id)          # UUID
print(job.name)        # str
print(job.schedule)    # str
print(job.next_run)    # datetime

# LLM completion
completion: LLMCompletion = await client.llm.complete(...)
print(completion.content)        # str
print(completion.model)          # str
print(completion.usage.tokens)   # int
print(completion.cost)           # float

# Email response
email: EmailResponse = await client.email.send(...)
print(email.message_id)   # str
print(email.status)       # str

# Hosted site
site: HostedSite = await client.hosting.upload(...)
print(site.url)           # str
print(site.expires_at)    # datetime
print(site.size_bytes)    # int
```

## Error Handling

The SDK provides a comprehensive exception hierarchy:

```python
from huitzo.exceptions import (
    HuitzoError,          # Base exception
    ValidationError,      # Request validation failed
    AuthenticationError,  # Invalid API token
    RateLimitError,       # Rate limit exceeded
    QuotaExceededError,   # Plan quota exceeded
    NotFoundError,        # Resource not found
    NetworkError,         # Connection issues
)

try:
    response = await client.llm.complete("...")
except AuthenticationError:
    print("Invalid API token")
except RateLimitError as e:
    print(f"Rate limited. Retry after {e.retry_after}s")
except QuotaExceededError as e:
    print(f"Quota exceeded: {e.message}")
except ValidationError as e:
    print(f"Invalid request: {e.errors}")
except HuitzoError as e:
    print(f"SDK error: {e}")
```

## Usage Tracking

All billable operations return usage information:

```python
# LLM usage
response = await client.llm.complete("...")
print(f"Tokens: {response.usage.total_tokens}")
print(f"Cost: ${response.cost:.4f}")

# Email usage
email = await client.email.send(...)
print(f"Emails sent today: {email.quota.used}/{email.quota.limit}")

# CRON usage
job = await client.cron.create(...)
print(f"Jobs: {job.quota.used}/{job.quota.limit}")
```

## Configuration Options

### Client Configuration

```python
client = HuitzoClient(
    api_token="your_token",           # API authentication token
    base_url="https://api.huitzo.com", # API endpoint
    timeout=30,                        # Request timeout (seconds)
    max_retries=3,                     # Retry failed requests
    retry_delay=1.0,                   # Delay between retries (seconds)
    verify_ssl=True,                   # SSL certificate verification
    user_agent="MyPlugin/1.0",         # Custom user agent
)
```

### Per-Request Options

```python
# Custom timeout for specific request
response = await client.llm.complete(
    prompt="...",
    timeout=60  # 60 seconds for this request
)

# Disable retries
response = await client.llm.complete(
    prompt="...",
    max_retries=0
)
```

## Best Practices

### 1. Use Context Managers

```python
# Good
async with HuitzoClient() as client:
    response = await client.llm.complete("...")

# Avoid
client = HuitzoClient()
response = await client.llm.complete("...")
# (client connections not properly closed)
```

### 2. Handle Errors Gracefully

```python
from huitzo.exceptions import RateLimitError, QuotaExceededError

async def smart_completion(prompt: str):
    try:
        return await client.llm.complete(prompt)
    except RateLimitError as e:
        # Wait and retry
        await asyncio.sleep(e.retry_after)
        return await client.llm.complete(prompt)
    except QuotaExceededError:
        # Upgrade prompt
        print("Quota exceeded. Consider upgrading your plan.")
        return None
```

### 3. Stream Large Responses

```python
# Good for long outputs
async for chunk in client.llm.stream(prompt):
    process_chunk(chunk)

# Avoid for large responses (waits for complete response)
response = await client.llm.complete(very_long_prompt)
```

### 4. Monitor Usage

```python
# Track costs
total_cost = 0
for prompt in prompts:
    response = await client.llm.complete(prompt)
    total_cost += response.cost
    if total_cost > budget:
        break
```

### 5. Use Type Hints

```python
from huitzo import HuitzoClient
from huitzo.models import LLMCompletion

async def analyze(client: HuitzoClient, text: str) -> LLMCompletion:
    return await client.llm.complete(f"Analyze: {text}")
```

## Testing

### Mock Client

```python
from unittest.mock import AsyncMock
from huitzo import HuitzoClient

# Create mock client
client = AsyncMock(spec=HuitzoClient)
client.llm.complete.return_value = MockCompletion("mocked response")

# Test your code
result = await my_function(client)
assert result == expected
```

### Integration Tests

```python
import pytest
from huitzo import HuitzoClient

@pytest.mark.asyncio
async def test_completion():
    async with HuitzoClient() as client:
        response = await client.llm.complete("Test prompt")
        assert response.content
        assert response.usage.total_tokens > 0
```

## Next Steps

Explore specific services:

- **[CRON Service](/docs/developers/sdk-reference/cron-service)** - Schedule recurring tasks
- **[Email Service](/docs/developers/sdk-reference/email-service)** - Send templated emails
- **[LLM Service](/docs/developers/sdk-reference/llm-service)** - AI completions and streaming
- **[Hosting Service](/docs/developers/sdk-reference/hosting-service)** - Deploy temporary sites

Or dive into plugin development:

- **[Plugin Architecture](/docs/developers/plugin-development/architecture)** - Design patterns
- **[Code Examples](/docs/developers/examples)** - Real-world patterns
- **[Testing Guide](/docs/developers/plugin-development/testing)** - Test your plugins

## External Resources

- **[Full API Reference on PyPI](https://pypi.org/project/huitzo-sdk/)** - Complete API documentation
- **[GitHub Repository](https://github.com/huitzo/huitzo-sdk)** - Source code
- **[Issue Tracker](https://github.com/huitzo/huitzo-sdk/issues)** - Report bugs

---

**Previous:** [← SDK Installation](/docs/developers/getting-started/sdk-installation) | **Next:** [CRON Service →](/docs/developers/sdk-reference/cron-service)

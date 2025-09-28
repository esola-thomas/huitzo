#!/bin/bash
# Huitzo Site Deployment Setup Script
# This script helps configure the Azure Pipeline and GitHub integration

set -e

echo "🚀 Huitzo Site Deployment Setup"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "\n${BLUE}[STEP]${NC} $1"
}

# Gather configuration information
print_step "Gathering Configuration Information"

echo "Please provide the following information:"
echo ""

# GitHub username
read -p "GitHub Username: " GITHUB_USERNAME
while [[ -z "$GITHUB_USERNAME" ]]; do
    print_error "GitHub username cannot be empty"
    read -p "GitHub Username: " GITHUB_USERNAME
done

# GitHub repository name
read -p "GitHub Repository Name (default: huitzo-site): " GITHUB_REPO_NAME
GITHUB_REPO_NAME=${GITHUB_REPO_NAME:-huitzo-site}

# Construct URLs
GITHUB_REPO_URL="https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}.git"
GITHUB_PAGES_URL="https://${GITHUB_USERNAME}.github.io/${GITHUB_REPO_NAME}/"

print_step "Configuration Summary"
echo "GitHub Username: $GITHUB_USERNAME"
echo "Repository Name: $GITHUB_REPO_NAME"
echo "Repository URL: $GITHUB_REPO_URL"
echo "GitHub Pages URL: $GITHUB_PAGES_URL"
echo ""

read -p "Is this configuration correct? (y/n): " CONFIRM
if [[ $CONFIRM != "y" && $CONFIRM != "Y" ]]; then
    print_error "Setup cancelled. Please run the script again."
    exit 1
fi

# Update azure-pipelines.yml
print_step "Updating Azure Pipeline Configuration"

if [[ -f "azure-pipelines.yml" ]]; then
    # Create backup
    cp azure-pipelines.yml azure-pipelines.yml.backup
    print_status "Created backup: azure-pipelines.yml.backup"

    # Update configuration
    sed -i "s|value: 'https://github.com/your-username/huitzo-site.git'|value: '${GITHUB_REPO_URL}'|g" azure-pipelines.yml
    sed -i "s|value: 'your-github-username'|value: '${GITHUB_USERNAME}'|g" azure-pipelines.yml

    print_status "Updated azure-pipelines.yml with your configuration"
else
    print_error "azure-pipelines.yml not found. Please run this script from the project root."
    exit 1
fi

# Update Astro config for GitHub Pages
print_step "Updating Astro Configuration"

if [[ -f "astro.config.mjs" ]]; then
    # Create backup
    cp astro.config.mjs astro.config.mjs.backup
    print_status "Created backup: astro.config.mjs.backup"

    # Update site URL for GitHub Pages
    sed -i "s|site: 'https://huitzo.com'|site: '${GITHUB_PAGES_URL}'|g" astro.config.mjs

    print_status "Updated astro.config.mjs for GitHub Pages deployment"
else
    print_error "astro.config.mjs not found. Please run this script from the project root."
    exit 1
fi

# Create environment-specific configs
print_step "Creating Environment Configuration"

# Create .env.example for reference
cat > .env.example << EOF
# Environment Variables for Huitzo Site
# Copy this file to .env.local for local development

# Site Configuration
SITE_URL=http://localhost:4321
NODE_ENV=development

# GitHub Configuration (for reference - not used in build)
GITHUB_USERNAME=${GITHUB_USERNAME}
GITHUB_REPO_NAME=${GITHUB_REPO_NAME}
GITHUB_PAGES_URL=${GITHUB_PAGES_URL}
EOF

print_status "Created .env.example with configuration reference"

# Generate Azure DevOps variable setup commands
print_step "Generating Azure DevOps Setup Commands"

cat > azure-devops-variables.txt << EOF
Azure DevOps Pipeline Variables Setup
====================================

Run these commands in Azure DevOps CLI or set manually in the UI:

# Set GitHub Personal Access Token (KEEP SECRET!)
az pipelines variable create --name GITHUB_PERSONAL_ACCESS_TOKEN --value "YOUR_GITHUB_TOKEN_HERE" --secret true

# Set GitHub Username
az pipelines variable create --name GITHUB_USERNAME --value "${GITHUB_USERNAME}"

# Set GitHub Repository URL
az pipelines variable create --name GITHUB_REPO_URL --value "${GITHUB_REPO_URL}"

# Optional: Enable GitHub releases
az pipelines variable create --name CREATE_GITHUB_RELEASE --value "false"

Manual Setup in Azure DevOps UI:
1. Go to: Pipelines > Your Pipeline > Edit > Variables
2. Add these variables:
   - GITHUB_PERSONAL_ACCESS_TOKEN (secret: yes)
   - GITHUB_USERNAME (secret: no)
   - GITHUB_REPO_URL (secret: no)
   - CREATE_GITHUB_RELEASE (secret: no, value: false)

GitHub Repository URL: ${GITHUB_REPO_URL}
GitHub Pages URL: ${GITHUB_PAGES_URL}
EOF

print_status "Created azure-devops-variables.txt with setup commands"

# Generate GitHub repository creation commands
print_step "Generating GitHub Setup Commands"

cat > github-setup.txt << EOF
GitHub Repository Setup
=======================

1. Create GitHub Repository:
   - Go to: https://github.com/new
   - Repository name: ${GITHUB_REPO_NAME}
   - Visibility: Public (required for free GitHub Pages)
   - Don't initialize with README

2. Create Personal Access Token:
   - Go to: https://github.com/settings/tokens
   - Generate new token (classic)
   - Permissions needed: repo, workflow
   - Copy token for Azure DevOps variables

3. Enable GitHub Pages:
   - Go to: https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/settings/pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

Repository URL: ${GITHUB_REPO_URL}
Pages URL: ${GITHUB_PAGES_URL}
EOF

print_status "Created github-setup.txt with setup instructions"

# Test local build
print_step "Testing Local Build"

if command -v npm &> /dev/null; then
    print_status "Testing npm build..."
    if npm run build > build-test.log 2>&1; then
        print_status "✅ Local build successful!"
        rm build-test.log
    else
        print_warning "❌ Local build failed. Check build-test.log for details."
    fi
else
    print_warning "npm not found. Please install Node.js to test the build."
fi

# Summary
print_step "Setup Complete!"

echo ""
echo "📋 Next Steps:"
echo "1. Create GitHub repository: ${GITHUB_REPO_URL}"
echo "2. Create GitHub Personal Access Token"
echo "3. Set up Azure DevOps variables (see azure-devops-variables.txt)"
echo "4. Create Azure DevOps pipeline using azure-pipelines.yml"
echo "5. Enable GitHub Pages in repository settings"
echo ""
echo "📁 Generated Files:"
echo "- azure-devops-variables.txt (Azure DevOps setup commands)"
echo "- github-setup.txt (GitHub setup instructions)"
echo "- .env.example (environment configuration reference)"
echo ""
echo "🔗 URLs:"
echo "- GitHub Repository: ${GITHUB_REPO_URL}"
echo "- GitHub Pages Site: ${GITHUB_PAGES_URL}"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
print_status "Setup script completed successfully! 🎉"
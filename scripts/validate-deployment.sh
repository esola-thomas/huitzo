#!/bin/bash
# Huitzo Site Deployment Validation Script
# This script validates the deployment configuration

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
CHECKS_TOTAL=0
CHECKS_PASSED=0
CHECKS_FAILED=0

# Function to print colored output
print_pass() {
    echo -e "  ${GREEN}✅ PASS${NC} $1"
    ((CHECKS_PASSED++))
    ((CHECKS_TOTAL++))
}

print_fail() {
    echo -e "  ${RED}❌ FAIL${NC} $1"
    ((CHECKS_FAILED++))
    ((CHECKS_TOTAL++))
}

print_warning() {
    echo -e "  ${YELLOW}⚠️  WARN${NC} $1"
    ((CHECKS_TOTAL++))
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_section() {
    echo -e "\n${BLUE}🔍 $1${NC}"
}

echo "🔧 Huitzo Site Deployment Validation"
echo "====================================="

# Check 1: File existence
print_section "Checking Required Files"

if [[ -f "azure-pipelines.yml" ]]; then
    print_pass "azure-pipelines.yml exists"
else
    print_fail "azure-pipelines.yml missing"
fi

if [[ -f ".github/workflows/astro.yml" ]]; then
    print_pass ".github/workflows/astro.yml exists"
else
    print_fail ".github/workflows/astro.yml missing"
fi

if [[ -f "astro.config.mjs" ]]; then
    print_pass "astro.config.mjs exists"
else
    print_fail "astro.config.mjs missing"
fi

if [[ -f "package.json" ]]; then
    print_pass "package.json exists"
else
    print_fail "package.json missing"
fi

if [[ -f "DEPLOYMENT.md" ]]; then
    print_pass "DEPLOYMENT.md exists"
else
    print_fail "DEPLOYMENT.md missing"
fi

# Check 2: Azure Pipeline Configuration
print_section "Validating Azure Pipeline Configuration"

if [[ -f "azure-pipelines.yml" ]]; then
    # Check for required variables
    if grep -q "GITHUB_PERSONAL_ACCESS_TOKEN" azure-pipelines.yml; then
        print_pass "GitHub token variable referenced"
    else
        print_fail "GitHub token variable not found"
    fi

    if grep -q "trigger:" azure-pipelines.yml; then
        print_pass "Pipeline trigger configured"
    else
        print_fail "Pipeline trigger not configured"
    fi

    if grep -q "git push github" azure-pipelines.yml; then
        print_pass "GitHub sync command present"
    else
        print_fail "GitHub sync command missing"
    fi

    # Check for placeholder values
    if grep -q "your-username" azure-pipelines.yml; then
        print_warning "Placeholder username still present - update before use"
    else
        print_pass "No placeholder usernames found"
    fi
fi

# Check 3: GitHub Actions Configuration
print_section "Validating GitHub Actions Configuration"

if [[ -f ".github/workflows/astro.yml" ]]; then
    # Check workflow structure
    if grep -q "name: Deploy Huitzo Site" .github/workflows/astro.yml; then
        print_pass "Workflow name configured"
    else
        print_fail "Workflow name not set"
    fi

    if grep -q "astro build" .github/workflows/astro.yml; then
        print_pass "Astro build command present"
    else
        print_fail "Astro build command missing"
    fi

    if grep -q "actions/deploy-pages" .github/workflows/astro.yml; then
        print_pass "GitHub Pages deployment action present"
    else
        print_fail "GitHub Pages deployment action missing"
    fi

    if grep -q "github-pages" .github/workflows/astro.yml; then
        print_pass "GitHub Pages environment configured"
    else
        print_fail "GitHub Pages environment not configured"
    fi
fi

# Check 4: Astro Configuration
print_section "Validating Astro Configuration"

if [[ -f "astro.config.mjs" ]]; then
    if grep -q "site:" astro.config.mjs; then
        print_pass "Site URL configured in Astro config"
    else
        print_fail "Site URL not configured in Astro config"
    fi

    if grep -q "sitemap" astro.config.mjs; then
        print_pass "Sitemap integration enabled"
    else
        print_warning "Sitemap integration not found"
    fi

    if grep -q "tailwindcss" astro.config.mjs; then
        print_pass "Tailwind CSS integration enabled"
    else
        print_fail "Tailwind CSS integration missing"
    fi
fi

# Check 5: Package.json Configuration
print_section "Validating Package Configuration"

if [[ -f "package.json" ]]; then
    if grep -q '"astro"' package.json; then
        print_pass "Astro dependency present"
    else
        print_fail "Astro dependency missing"
    fi

    if grep -q '"build": "astro build"' package.json; then
        print_pass "Build script configured"
    else
        print_fail "Build script not configured"
    fi

    if grep -q '"dev": "astro dev"' package.json; then
        print_pass "Dev script configured"
    else
        print_fail "Dev script not configured"
    fi

    if grep -q '"tailwindcss"' package.json; then
        print_pass "Tailwind CSS dependency present"
    else
        print_fail "Tailwind CSS dependency missing"
    fi
fi

# Check 6: Node.js and Dependencies
print_section "Checking Development Environment"

if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_pass "Node.js installed ($NODE_VERSION)"

    # Check Node version (should be 18+ for Astro)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [[ $NODE_MAJOR -ge 18 ]]; then
        print_pass "Node.js version supported (>= 18)"
    else
        print_fail "Node.js version too old (need >= 18, have $NODE_VERSION)"
    fi
else
    print_fail "Node.js not installed"
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_pass "npm installed ($NPM_VERSION)"
else
    print_fail "npm not installed"
fi

# Check if dependencies are installed
if [[ -d "node_modules" ]]; then
    print_pass "Node modules installed"
else
    print_warning "Node modules not installed - run 'npm install'"
fi

# Check 7: Build Test
print_section "Testing Build Process"

if command -v npm &> /dev/null && [[ -d "node_modules" ]]; then
    print_info "Running build test..."
    if npm run build > /tmp/huitzo-build-test.log 2>&1; then
        print_pass "Build test successful"
        if [[ -d "dist" ]]; then
            DIST_SIZE=$(du -sh dist | cut -f1)
            print_pass "Build output created (size: $DIST_SIZE)"
        fi
    else
        print_fail "Build test failed - check /tmp/huitzo-build-test.log"
    fi
else
    print_warning "Skipping build test - npm or node_modules not available"
fi

# Check 8: Required Environment Setup
print_section "Environment Setup Validation"

if [[ -f "scripts/setup-deployment.sh" ]]; then
    print_pass "Deployment setup script available"
else
    print_warning "Deployment setup script missing"
fi

# Summary
print_section "Validation Summary"

echo ""
echo "📊 Results:"
echo "  Total checks: $CHECKS_TOTAL"
echo "  Passed: $CHECKS_PASSED"
echo "  Failed: $CHECKS_FAILED"
echo ""

if [[ $CHECKS_FAILED -eq 0 ]]; then
    echo -e "${GREEN}🎉 All critical checks passed!${NC}"
    echo ""
    echo "🚀 Ready for deployment setup:"
    echo "1. Run './scripts/setup-deployment.sh' to configure variables"
    echo "2. Create GitHub repository"
    echo "3. Set up Azure DevOps pipeline"
    echo "4. Enable GitHub Pages"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
    exit 0
else
    echo -e "${RED}❌ $CHECKS_FAILED checks failed${NC}"
    echo ""
    echo "🔧 Please fix the failed checks before proceeding with deployment"
    echo ""
    echo "Common fixes:"
    echo "- Install missing dependencies: npm install"
    echo "- Update configuration files"
    echo "- Check file paths and structure"
    echo ""
    exit 1
fi
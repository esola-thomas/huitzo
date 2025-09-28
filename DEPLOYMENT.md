# Huitzo Site Deployment Guide

This document explains how to set up the complete CI/CD pipeline for deploying the Huitzo website from Azure DevOps to GitHub Pages.

## 🏗️ Architecture Overview

```
Azure DevOps Repository (Source)
    ↓ (Azure Pipeline)
GitHub Repository (Mirror)
    ↓ (GitHub Actions)
GitHub Pages (Hosting)
```

**Workflow:**
1. Developers push code to Azure DevOps main branch
2. Azure Pipeline syncs changes to GitHub repository
3. GitHub Actions automatically builds and deploys to GitHub Pages
4. Site is live at `https://your-username.github.io/huitzo-site/`

## 📋 Prerequisites

### Required Accounts & Tools
- [x] Azure DevOps account with repository access
- [x] GitHub account
- [x] Azure DevOps project with the Huitzo site code

### Required Tokens & Permissions
- GitHub Personal Access Token (Classic) with `repo` permissions
- Azure DevOps project admin access (to create pipelines)

## 🚀 Step-by-Step Setup

### Step 1: Create GitHub Repository

1. **Go to GitHub** and create a new repository:
   - Repository name: `huitzo-site` (or your preferred name)
   - Visibility: Public (required for free GitHub Pages)
   - Don't initialize with README (we'll sync from Azure DevOps)

2. **Note the repository details:**
   - Repository URL: `https://github.com/YOUR-USERNAME/huitzo-site`
   - Clone URL: `https://github.com/YOUR-USERNAME/huitzo-site.git`

### Step 2: Create GitHub Personal Access Token

1. **Go to GitHub Settings** → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate new token** with these permissions:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)

3. **Copy the token** and save it securely (you'll need it for Azure DevOps)

### Step 3: Configure Azure DevOps Pipeline Variables

1. **Go to your Azure DevOps project** → Pipelines

2. **Create new pipeline variables** (keep them secret):

   | Variable Name | Value | Secret |
   |---------------|--------|--------|
   | `GITHUB_PERSONAL_ACCESS_TOKEN` | Your GitHub token from Step 2 | ✅ Yes |
   | `GITHUB_USERNAME` | Your GitHub username | ❌ No |
   | `GITHUB_REPO_URL` | `https://github.com/YOUR-USERNAME/huitzo-site.git` | ❌ No |

3. **Optional variables:**
   | Variable Name | Value | Description |
   |---------------|--------|-------------|
   | `CREATE_GITHUB_RELEASE` | `false` | Set to `true` to create releases |

### Step 4: Update Azure Pipeline Configuration

1. **Edit `azure-pipelines.yml`** in your Azure DevOps repository:

   ```yaml
   variables:
     - name: GITHUB_REPO_URL
       value: 'https://github.com/YOUR-USERNAME/huitzo-site.git'  # ← Update this
     - name: GITHUB_USERNAME
       value: 'YOUR-GITHUB-USERNAME'  # ← Update this
   ```

2. **Commit the changes** to your Azure DevOps repository

### Step 5: Create Azure DevOps Pipeline

1. **Go to Azure DevOps** → Pipelines → New Pipeline

2. **Select your repository** (Azure Repos Git)

3. **Choose "Existing Azure Pipelines YAML file"**

4. **Select the path:** `/azure-pipelines.yml`

5. **Review and run** the pipeline

### Step 6: Configure GitHub Pages

1. **Go to your GitHub repository** → Settings → Pages

2. **Configure GitHub Pages:**
   - Source: "Deploy from a branch"
   - Branch: `gh-pages` (will be created by GitHub Actions)
   - Folder: `/ (root)`

3. **Save the configuration**

### Step 7: Test the Pipeline

1. **Make a small change** in Azure DevOps (e.g., update README.md)

2. **Commit and push** to the main branch

3. **Monitor the process:**
   - Azure DevOps Pipeline should run and sync to GitHub
   - GitHub Actions should trigger and deploy to Pages
   - Site should be live at your GitHub Pages URL

## 📂 File Structure

After setup, your repositories will have these key files:

```
Azure DevOps Repository:
├── azure-pipelines.yml          # Sync pipeline configuration
├── .github/workflows/astro.yml  # GitHub Actions workflow
├── src/                         # Astro site source
├── DEPLOYMENT.md               # This documentation
└── README.md                   # Project documentation

GitHub Repository (Mirror):
├── .github/workflows/astro.yml  # Auto-deployed workflow
├── src/                         # Mirrored source code
└── [all other files mirrored]
```

## 🔍 Monitoring & Troubleshooting

### Pipeline Status Locations

1. **Azure DevOps Pipeline:**
   - URL: `https://dev.azure.com/YOUR-ORG/YOUR-PROJECT/_build`
   - Check: Sync to GitHub status

2. **GitHub Actions:**
   - URL: `https://github.com/YOUR-USERNAME/huitzo-site/actions`
   - Check: Build and deployment status

3. **GitHub Pages:**
   - URL: `https://github.com/YOUR-USERNAME/huitzo-site/settings/pages`
   - Check: Deployment status and site URL

### Common Issues & Solutions

#### ❌ Azure Pipeline Fails: "Authentication Failed"
**Solution:** Check GitHub Personal Access Token
- Ensure token has `repo` permissions
- Verify token is added as secret variable in Azure DevOps
- Check if token has expired

#### ❌ GitHub Actions Fails: "Build Error"
**Solution:** Check Astro build configuration
- Verify `package.json` has correct dependencies
- Ensure `astro.config.mjs` has correct site URL
- Check build logs for specific errors

#### ❌ GitHub Pages Shows 404
**Solution:** Check Pages configuration
- Ensure GitHub Pages is enabled
- Verify source is set to `gh-pages` branch
- Wait 5-10 minutes for propagation

#### ❌ Site Loads but Assets Missing
**Solution:** Check base path configuration
- Verify `astro.config.mjs` site URL
- Check if repository name matches expected path

### Pipeline Logs

**Azure DevOps Pipeline Logs:**
```bash
# View pipeline status
echo "Azure Pipeline Status: [Success/Failed]"
echo "GitHub Sync: [Completed/Failed]"
```

**GitHub Actions Logs:**
```bash
# View deployment status
echo "Build Status: [Success/Failed]"
echo "Deployment URL: https://your-username.github.io/huitzo-site/"
```

## 🛠️ Maintenance

### Updating the Site

1. **Make changes** in your Azure DevOps repository
2. **Commit to main branch**
3. **Pipeline automatically syncs** to GitHub
4. **GitHub Actions deploys** to Pages
5. **Site updates** within 5-10 minutes

### Manual Sync (if needed)

If automatic sync fails, you can manually sync:

```bash
# Clone Azure DevOps repo
git clone https://dev.azure.com/YOUR-ORG/YOUR-PROJECT/_git/Huitzo_Site

# Add GitHub remote
git remote add github https://YOUR-TOKEN@github.com/YOUR-USERNAME/huitzo-site.git

# Push to GitHub
git push github main --force-with-lease
```

### Updating Dependencies

1. **Update `package.json`** in Azure DevOps
2. **Test locally** with `npm install && npm run build`
3. **Commit changes** - pipeline will handle the rest

## 🔗 Useful Links

- **Live Site:** `https://your-username.github.io/huitzo-site/`
- **Azure DevOps Project:** `https://dev.azure.com/YOUR-ORG/YOUR-PROJECT`
- **GitHub Repository:** `https://github.com/YOUR-USERNAME/huitzo-site`
- **Pipeline Status:** `https://dev.azure.com/YOUR-ORG/YOUR-PROJECT/_build`
- **GitHub Actions:** `https://github.com/YOUR-USERNAME/huitzo-site/actions`

## 🎯 Next Steps

1. **Set up custom domain** (optional):
   - Add CNAME file with your domain
   - Configure DNS settings
   - Enable HTTPS in GitHub Pages settings

2. **Set up monitoring** (optional):
   - Add uptime monitoring
   - Set up analytics (Google Analytics, etc.)
   - Configure error tracking

3. **Automate releases** (optional):
   - Set `CREATE_GITHUB_RELEASE=true` in Azure DevOps
   - Automatic release tags for major updates

---

## 📞 Support

If you encounter issues:

1. **Check the logs** in Azure DevOps and GitHub Actions
2. **Verify all variables** are set correctly
3. **Ensure tokens** have correct permissions
4. **Test locally** with `npm run build`

The deployment process should be seamless once properly configured! 🚀
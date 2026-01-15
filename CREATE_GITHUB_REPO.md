# Create GitHub Repository - Step by Step

## Quick Method (5 minutes)

### Step 1: Create Repository on GitHub

1. **Go to GitHub**: https://github.com/new
2. **Repository name**: `king-koney-app`
3. **Description**: "King Koney restaurant mobile app built with Expo and React Native"
4. **Visibility**: 
   - ✅ **Private** (recommended - keeps your code and API keys safe)
   - Or Public (if you want it open source)
5. **DO NOT CHECK** any of these:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
6. **Click**: "Create repository"

### Step 2: Push Your Code

After creating the repository, **run this PowerShell script**:

```powershell
.\push-to-github.ps1
```

The script will:
- Ask for your GitHub username
- Ask for repository name (or use default)
- Add the remote
- Push your code

### Alternative: Manual Commands

If you prefer to do it manually:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/king-koney-app.git

# Rename branch to main
git branch -M main

# Push code
git push -u origin main
```

## Authentication

When you push, GitHub will ask for authentication. Choose one:

### Option 1: GitHub CLI (Recommended)
```bash
# Install GitHub CLI first
winget install GitHub.cli

# Then authenticate
gh auth login
```

### Option 2: Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control)
4. Copy the token
5. When git asks for password, paste the token

### Option 3: GitHub Desktop
- Download: https://desktop.github.com/
- Sign in and push through the GUI

## After Pushing

Your repository will be at:
```
https://github.com/YOUR_USERNAME/king-koney-app
```

## Next Steps

1. ✅ Code pushed to GitHub
2. Update `app.json` with repository URL (optional):
   ```json
   {
     "expo": {
       "githubUrl": "https://github.com/YOUR_USERNAME/king-koney-app"
     }
   }
   ```
3. Set up EAS Build (for app store submission)
4. Configure CI/CD (optional)

## Troubleshooting

### "Repository not found"
- Make sure you created the repository on GitHub first
- Check the repository name matches exactly
- Verify your GitHub username is correct

### "Authentication failed"
- Use a Personal Access Token instead of password
- Or install GitHub CLI and authenticate

### "Remote already exists"
- The script will ask if you want to update it
- Or manually update: `git remote set-url origin NEW_URL`

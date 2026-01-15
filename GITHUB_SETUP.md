# GitHub Repository Setup

## ✅ Git Repository Initialized

Your project is now ready to be pushed to GitHub!

## Steps to Create GitHub Repository

### Option 1: Using GitHub Website (Easiest)

1. **Create a New Repository on GitHub**
   - Go to: https://github.com/new
   - Repository name: `king-koney-app` (or your preferred name)
   - Description: "King Koney restaurant mobile app built with Expo and React Native"
   - Choose: **Private** (recommended for apps with API keys) or **Public**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

2. **Push Your Code**
   ```bash
   # Add the remote (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/king-koney-app.git
   
   # Rename branch to main (if needed)
   git branch -M main
   
   # Push your code
   git push -u origin main
   ```

### Option 2: Using GitHub CLI

```bash
# Install GitHub CLI if you haven't
# Windows: winget install GitHub.cli
# Or download from: https://cli.github.com/

# Login to GitHub
gh auth login

# Create repository and push
gh repo create king-koney-app --private --source=. --remote=origin --push
```

## 🔒 Security Reminders

### ✅ Already Protected (in .gitignore):
- `.env` file (contains API keys)
- `node_modules/`
- Build artifacts
- Sensitive files

### ⚠️ Before Pushing, Verify:
- [ ] `.env` is in `.gitignore` (✅ already there)
- [ ] No API keys in code files
- [ ] No passwords or secrets committed

## 📝 Repository Structure

Your repository includes:
```
king-koney-app/
├── app/                    # Expo Router pages
├── components/             # React components
├── contexts/               # React Context
├── hooks/                  # Custom hooks
├── lib/                    # Supabase config
├── utils/                  # Utility functions
├── assets/                 # App assets
├── package.json            # Dependencies
├── app.json                # Expo config
├── eas.json                # EAS Build config
├── README.md               # Project documentation
└── ...                     # Other config files
```

## 🔗 After Pushing to GitHub

### For Expo/EAS:
1. **Link to EAS** (if using EAS Build):
   ```bash
   eas build:configure
   # Follow prompts to link your GitHub repo
   ```

2. **Update app.json** (if needed):
   - Add repository URL to `app.json`:
   ```json
   {
     "expo": {
       "githubUrl": "https://github.com/YOUR_USERNAME/king-koney-app"
     }
   }
   ```

### For Collaboration:
- Share the repository URL with team members
- Set up branch protection rules
- Configure GitHub Actions for CI/CD (optional)

## 📋 Quick Commands Reference

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# Pull latest changes
git pull

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main
```

## 🚀 Next Steps After GitHub Setup

1. ✅ Push code to GitHub
2. Set up EAS Build (if using)
3. Configure GitHub Actions (optional)
4. Add collaborators (if needed)
5. Set up branch protection (recommended)

## 📚 Useful Links

- [GitHub Docs](https://docs.github.com/)
- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

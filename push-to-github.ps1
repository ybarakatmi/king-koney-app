# PowerShell script to push King Koney app to GitHub
# Run this after creating the repository on GitHub

Write-Host "🚀 King Koney App - GitHub Push Script" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git repository not initialized. Initializing now..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit: King Koney Expo React Native app"
}

# Get GitHub username
$username = Read-Host "Enter your GitHub username"
$repoName = Read-Host "Enter repository name (default: king-koney-app)"

if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "king-koney-app"
}

# Check if remote already exists
$remoteExists = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "⚠️  Remote 'origin' already exists: $remoteExists" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to update it? (y/n)"
    if ($overwrite -eq "y" -or $overwrite -eq "Y") {
        git remote set-url origin "https://github.com/$username/$repoName.git"
    } else {
        Write-Host "Keeping existing remote." -ForegroundColor Green
    }
} else {
    Write-Host "📦 Adding remote repository..." -ForegroundColor Cyan
    git remote add origin "https://github.com/$username/$repoName.git"
}

# Check current branch
$currentBranch = git branch --show-current
if ($currentBranch -ne "main" -and $currentBranch -ne "master") {
    Write-Host "🔄 Renaming branch to 'main'..." -ForegroundColor Cyan
    git branch -M main
    $currentBranch = "main"
}

Write-Host ""
Write-Host "📋 Repository URL: https://github.com/$username/$repoName" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT: Make sure you've created the repository on GitHub first!" -ForegroundColor Yellow
Write-Host "   Go to: https://github.com/new" -ForegroundColor Yellow
Write-Host "   Repository name: $repoName" -ForegroundColor Yellow
Write-Host "   Choose Private (recommended) or Public" -ForegroundColor Yellow
Write-Host "   DO NOT initialize with README" -ForegroundColor Yellow
Write-Host ""

$continue = Read-Host "Have you created the repository on GitHub? (y/n)"
if ($continue -eq "y" -or $continue -eq "Y") {
    Write-Host ""
    Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
    
    # Try to push
    git push -u origin $currentBranch
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host "🔗 Repository: https://github.com/$username/$repoName" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ Push failed. You may need to:" -ForegroundColor Red
        Write-Host "   1. Create the repository on GitHub first" -ForegroundColor Yellow
        Write-Host "   2. Authenticate with GitHub (git will prompt you)" -ForegroundColor Yellow
        Write-Host "   3. Or use a personal access token" -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "📝 Please create the repository first, then run this script again." -ForegroundColor Yellow
    Write-Host "   Or run these commands manually:" -ForegroundColor Yellow
    Write-Host "   git remote add origin https://github.com/$username/$repoName.git" -ForegroundColor Cyan
    Write-Host "   git branch -M main" -ForegroundColor Cyan
    Write-Host "   git push -u origin main" -ForegroundColor Cyan
}

Write-Host ""

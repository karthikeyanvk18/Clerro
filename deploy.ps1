# Cleero Deployment Script - Updates GitHub and Netlify
# Usage: ./deploy.ps1 "your commit message"

param(
    [string]$commitMessage = "Update: production deployment"
)

Write-Host "Starting Cleero Deployment Process..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Step 1: Build the project
Write-Host "`nStep 1: Building the project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Build successful!" -ForegroundColor Green

# Step 2: Check for changes
Write-Host "`nStep 2: Checking for changes..." -ForegroundColor Yellow
$changes = git status --porcelain
if ([string]::IsNullOrWhiteSpace($changes)) {
    Write-Host "No changes detected" -ForegroundColor Gray
} else {
    Write-Host "Changes detected:" -ForegroundColor Gray
    Write-Host $changes
}

# Step 3: Stage changes
Write-Host "`nStep 3: Staging changes..." -ForegroundColor Yellow
git add .
Write-Host "Changes staged" -ForegroundColor Green

# Step 4: Commit changes
Write-Host "`nStep 4: Committing to Git..." -ForegroundColor Yellow
git commit -m $commitMessage
if ($LASTEXITCODE -ne 0) {
    Write-Host "Nothing to commit or commit failed" -ForegroundColor Yellow
} else {
    Write-Host "Changes committed" -ForegroundColor Green
}

# Step 5: Push to GitHub
Write-Host "`nStep 5: Pushing to GitHub..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "Push to GitHub failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Pushed to GitHub" -ForegroundColor Green

# Step 6: Deploy to Netlify
Write-Host "`nStep 6: Deploying to Netlify..." -ForegroundColor Yellow
netlify deploy --prod --dir=dist
if ($LASTEXITCODE -ne 0) {
    Write-Host "Netlify deployment failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Deployed to Netlify" -ForegroundColor Green

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "Live URL: https://cleero.netlify.app" -ForegroundColor Cyan
Write-Host "Dashboard: https://app.netlify.com/projects/cleero/overview" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

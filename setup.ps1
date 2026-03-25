param(
  [switch]$SkipInstall
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

Write-Host "Checking Node version..."
$nodeVersion = & node --version
if ($nodeVersion -notmatch '^v22\.') {
  throw "This project expects Node.js 22.x. Current version: $nodeVersion. Please install Node 22 and run setup again."
}

if (-not (Test-Path "backend\.env")) {
  Copy-Item "backend\.env.example" "backend\.env"
  Write-Host "Created backend\.env"
}

if (-not (Test-Path "frontend\.env")) {
  Copy-Item "frontend\.env.example" "frontend\.env"
  Write-Host "Created frontend\.env"
}

if (-not $SkipInstall) {
  Write-Host "Installing dependencies..."
  & npm.cmd install
}

Write-Host ""
Write-Host "Setup complete."
Write-Host "Next run: .\start.ps1"


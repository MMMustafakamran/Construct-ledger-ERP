param(
  [switch]$SkipSetup
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

if (-not $SkipSetup) {
  & powershell -ExecutionPolicy Bypass -File "$root\setup.ps1" -SkipInstall
}

Write-Host "Starting backend and frontend in separate windows..."

$backendCommand = "Set-Location '$root'; npm.cmd run dev:backend"
$frontendCommand = "Set-Location '$root'; npm.cmd run dev:frontend"

Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", $backendCommand
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", $frontendCommand

Write-Host ""
Write-Host "Backend:  http://localhost:4000"
Write-Host "Frontend: http://localhost:5173"

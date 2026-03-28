#!/bin/bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# Load nvm if available
[ -s "$HOME/.nvm/nvm.sh" ] && \. "$HOME/.nvm/nvm.sh" && nvm use 22

echo "Checking Node version..."
NODE_VERSION=$(node --version)
if [[ ! $NODE_VERSION =~ ^v22\. ]]; then
  echo "Error: This project expects Node.js 22.x. Current version: $NODE_VERSION. Please install Node 22 and run setup again."
  exit 1
fi

if [[ ! -f "backend/.env" ]]; then
  # check if .env.example exists before copying
  if [[ -f "backend/.env.example" ]]; then
    cp "backend/.env.example" "backend/.env"
    echo "Created backend/.env"
  fi
fi

if [[ ! -f "frontend/.env" ]]; then
  # check if .env.example exists before copying
  if [[ -f "frontend/.env.example" ]]; then
    cp "frontend/.env.example" "frontend/.env"
    echo "Created frontend/.env"
  fi
fi

SKIP_INSTALL=false
if [[ "$1" == "--skip-install" || "$1" == "-SkipInstall" ]]; then
  SKIP_INSTALL=true
fi

if [[ "$SKIP_INSTALL" == false ]]; then
  echo "Installing dependencies..."
  npm install
fi

echo ""
echo "Setup complete."
echo "Next run: ./start.sh"

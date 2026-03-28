#!/bin/bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# Load nvm if available
[ -s "$HOME/.nvm/nvm.sh" ] && \. "$HOME/.nvm/nvm.sh" && nvm use 22 || true

SKIP_SETUP=false
if [[ "$1" == "--skip-setup" || "$1" == "-SkipSetup" ]]; then
  SKIP_SETUP=true
fi

if [[ "$SKIP_SETUP" == false ]]; then
  ./setup.sh --skip-install
fi

echo "Starting backend and frontend in background..."

npm run dev:backend &
BACKEND_PID=$!

npm run dev:frontend &
FRONTEND_PID=$!

echo ""
echo "Backend:  http://localhost:4000"
echo "Frontend: http://localhost:5173"
echo "Press Ctrl+C to stop"

trap 'kill $BACKEND_PID $FRONTEND_PID 2>/dev/null' EXIT
wait

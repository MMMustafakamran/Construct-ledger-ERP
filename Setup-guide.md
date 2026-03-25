# Install and Run Guide

This guide is written to be as simple as possible.

If you follow it step by step, you should be able to run the project on your machine.

## 1. What You Need Before Starting

You need these things installed on your computer:

- Git
- Node.js `22.x`
- npm `11.x`

Important:

- Do **not** use Node 25 for this project
- This repo is currently pinned to Node `22.x`

## 2. The Easiest Path

If you want the simplest possible setup, run these two scripts from the project root:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup.ps1
powershell -ExecutionPolicy Bypass -File .\start.ps1
```

What they do:

- `setup.ps1` checks Node, creates `.env` files, and installs dependencies
- `start.ps1` opens the backend and frontend in separate windows

## 3. Manual Setup

If you prefer to do it manually, follow the steps below.

### Check Your Versions

Open PowerShell in any folder and run:

```powershell
node --version
npm.cmd --version
```

You want to see:

- Node version starting with `v22`
- npm version starting with `11`

If your Node version is not `22`, fix that first before continuing.

### Download The Project

Open PowerShell and run:

```powershell
git clone <YOUR-REPO-URL>
cd "rayyan project"
```

If you already downloaded the folder manually, just open PowerShell inside the project folder.

### Create Environment Files

```powershell
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.example frontend\.env
```

### Install Dependencies

From the project root, run:

```powershell
npm.cmd install
```

Important:

- Run this in the root project folder
- Do **not** install separately inside `frontend` or `backend`

### Start The App

```powershell
powershell -ExecutionPolicy Bypass -File .\start.ps1
```

## 4. What You Should See

After starting:

- backend should be available at `http://localhost:4000`
- frontend should be available at `http://localhost:5173`

Open these in your browser:

- [http://localhost:5173](http://localhost:5173)
- [http://localhost:4000/api/health](http://localhost:4000/api/health)

## 5. Common Problems

### Problem: `npm install` fails with engine/version error

Reason:

- your Node version is wrong

Fix:

- install Node `22.x`
- reopen PowerShell
- run `node --version` again

### Problem: `npm` command is blocked in PowerShell

Use this instead:

```powershell
npm.cmd install
powershell -ExecutionPolicy Bypass -File .\setup.ps1
powershell -ExecutionPolicy Bypass -File .\start.ps1
```

### Problem: frontend opens but no data loads

Check:

- backend terminal is still running
- `backend\.env` exists
- `frontend\.env` exists
- backend is on port `4000`
- frontend is on port `5173`

### Problem: port already in use

Another app may already be using `4000` or `5173`.

You can:

- stop the other app
- or change the port in env/config later

## 6. Files You Should Not Commit

Do not commit:

- `backend\.env`
- `frontend\.env`
- `node_modules`

These are local machine files.

## 7. Normal Daily Workflow

Each time you work on the project:

1. open the project folder
2. pull latest changes
3. run `npm.cmd install` if dependencies changed
4. run `powershell -ExecutionPolicy Bypass -File .\start.ps1`

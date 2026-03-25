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

## 2. Check Your Versions

Open PowerShell in any folder and run:

```powershell
node --version
npm.cmd --version
```

You want to see:

- Node version starting with `v22`
- npm version starting with `11`

If your Node version is not `22`, fix that first before continuing.

## 3. Download the Project

Open PowerShell and run:

```powershell
git clone <YOUR-REPO-URL>
cd "rayyan project"
```

If you already downloaded the folder manually, just open PowerShell inside the project folder.

## 4. Confirm You Are In The Correct Folder

Run:

```powershell
Get-ChildItem
```

You should see folders/files like:

- `frontend`
- `backend`
- `package.json`
- `README.md`

## 5. Create Environment Files

We do not edit the example files directly.

Create the real backend env file:

```powershell
Copy-Item backend\.env.example backend\.env
```

Create the real frontend env file:

```powershell
Copy-Item frontend\.env.example frontend\.env
```

## 6. Install Dependencies

From the project root, run:

```powershell
npm.cmd install
```

Important:

- Run this in the root project folder
- Do **not** install separately inside `frontend` or `backend`

If this step fails because of Node version, go back and install Node `22.x`.

## 7. Start the Backend

Open a PowerShell window in the project root and run:

```powershell
npm.cmd run dev:backend
```

If it works, you should see a message similar to:

```text
Backend running on http://localhost:4000
```

Leave this terminal open.

## 8. Start the Frontend

Open a **second** PowerShell window in the project root and run:

```powershell
npm.cmd run dev:frontend
```

If it works, Vite will show a local URL, usually:

```text
http://localhost:5173
```

Leave this terminal open too.

## 9. Open the App

Open your browser and go to:

[http://localhost:5173](http://localhost:5173)

The frontend should load and connect to the backend at:

[http://localhost:4000/api](http://localhost:4000/api)

## 10. Quick Health Check

Open this in your browser:

[http://localhost:4000/api/health](http://localhost:4000/api/health)

You should get a JSON response showing the API is running.

## 11. Common Problems

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
npm.cmd run dev:backend
npm.cmd run dev:frontend
```

This project uses `npm.cmd` in PowerShell to avoid execution policy issues.

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

## 12. Files You Should Not Commit

Do not commit:

- `backend\.env`
- `frontend\.env`
- `node_modules`

These are local machine files.

## 13. Normal Daily Workflow

Each time you work on the project:

1. open the project folder
2. pull latest changes
3. run `npm.cmd install` if dependencies changed
4. start backend
5. start frontend

## 14. One-Line Summary

If you forget everything else, the normal setup is:

```powershell
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.example frontend\.env
npm.cmd install
npm.cmd run dev:backend
npm.cmd run dev:frontend
```

Then open:

[http://localhost:5173](http://localhost:5173)

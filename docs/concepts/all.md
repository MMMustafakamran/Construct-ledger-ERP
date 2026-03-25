Perfect. Let me build you a full visual breakdown — starting with the big picture, then drilling into each layer using this actual project.Let me build you a full visual breakdown — starting with the big picture, then drilling into each layer.This is the 30,000-foot view. Every web app works this way — three layers, each with a clear job. Now let's zoom into each one.

---

**Layer 1 — Frontend: what the user sees**

The frontend is just a React app running _inside your browser_. It doesn't do any accounting math — it only shows data and sends requests. In this project, `frontend/src/App.tsx` is the main file, and `api.ts` is a small helper that knows how to talk to the backend.Each page component calls `api.ts` to fetch data, then renders it as HTML. The browser never touches the database directly — it always asks the backend.

---

**Layer 2 — Backend: the brain**

The backend is an Express server. Its job is to receive API calls, run the accounting logic, and read/write the database. Every feature in this project has its own `*.service.ts` file that contains the real logic.Prisma is the translator between your TypeScript code and the actual database. Instead of writing raw SQL like `SELECT * FROM vendors`, you write `prisma.vendor.findMany()` and Prisma handles the rest.

---

**Layer 3 — How they connect (a real example)**

Here's what happens, step by step, when a user records a vendor payment on the frontend.That's the full cycle — one button click triggers all 6 steps in about 50–200 milliseconds. The frontend never touches the database; the backend never touches the screen. They talk only through JSON over HTTP.

---

**The mental model to internalize:**

- **Frontend** = what users _see and touch_ (React, browser)
- **Backend** = what actually _happens_ (Express, Node.js, server)
- **Database** = where data _lives permanently_ (SQLite now, PostgreSQL later)
- **API** = the contract between frontend and backend — a list of URLs with agreed-upon request/response shapes

In this project, every service file (`payment.service.ts`, `vendor.service.ts`, etc.) is one accountant specializing in one domain. The routes file is the receptionist that forwards incoming requests to the right accountant.

Want me to drill into any specific layer — like how a service file is actually structured, or how React components work?

import React from "react";
import { Link } from "react-router-dom";

const proofPoints = [
  { label: "Live modules", value: "Ledger, invoices, payments" },
  { label: "Source of truth", value: "Backend API" },
  { label: "Workflow focus", value: "Construction bookkeeping" },
];

const features = [
  "Accounts, vendors, customers, bank, invoices, payments, receipts, and journal entries.",
  "Clean accounting workspace built around the actual backend endpoints.",
  "A focused dashboard with only real, API-backed summary data.",
];

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-copy">
          <p className="landing-kicker">ConstructLedger</p>
          <h1>Accounting software for construction teams that need clarity, not clutter.</h1>
          <p className="landing-subtitle">
            Track cash, vendors, customers, invoices, payments, receipts, and ledger activity in one organized workspace.
            The interface stays grounded in real accounting data instead of decorative noise.
          </p>

          <div className="landing-actions">
            <Link className="primary-button" to="/">
              Open Dashboard
            </Link>
            <Link className="ghost-button" to="/vendors">
              Explore Modules
            </Link>
          </div>

          <div className="landing-proof">
            {proofPoints.map((point) => (
              <article key={point.label} className="landing-proof-card">
                <span>{point.label}</span>
                <strong>{point.value}</strong>
              </article>
            ))}
          </div>
        </div>

        <aside className="landing-panel">
          <div className="landing-panel-card landing-panel-card-dark">
            <p className="landing-panel-label">Product focus</p>
            <strong>Practical accounting, built for site teams.</strong>
            <span>One workspace for operational ledgers, working capital, and transaction entry.</span>
          </div>

          <div className="landing-panel-stack">
            {features.map((feature) => (
              <div key={feature} className="landing-panel-card">
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default LandingPage;

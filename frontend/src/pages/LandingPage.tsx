import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <div className="modern-landing">
      <div className="modern-landing-content">
        
        {/* Left Side: Typography & Call to Action */}
        <div className="modern-landing-text">
          <div className="glass-badge">
            <span className="glass-badge-dot"></span>
            ConstructLedger
          </div>
          
          <h1 className="hero-title">
            Accounting for construction that needs <span>clarity,</span> not clutter.
          </h1>
          
          <p className="hero-desc">
            Track cash, vendors, customers, invoices, and ledger activity in a 
            glass-smooth, beautifully organized workspace designed for real teams.
          </p>
          
          <div className="action-row">
            <Link className="btn-primary" to="/">
              Open Dashboard
            </Link>
            <Link className="btn-secondary" to="/vendors">
              Explore Modules
            </Link>
          </div>

          <div className="modern-metrics">
            <div className="metric-item">
              <strong>100%</strong>
              <span>API Backed</span>
            </div>
            <div className="metric-item">
              <strong>Zero</strong>
              <span>Clutter</span>
            </div>
            <div className="metric-item">
              <strong>Real-Time</strong>
              <span>Ledgers</span>
            </div>
          </div>
        </div>

        {/* Right Side: Animated Floating Glass Cards */}
        <div className="hero-visuals">
          <div className="glass-card card-secondary">
            <div className="card-top">
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#667066', textTransform: 'uppercase', letterSpacing: '1px' }}>Vendor Invoice</span>
            </div>
            <div className="card-amount">$12,450.00</div>
            <div className="card-label">Pending Approval</div>
            <div className="card-bars">
              <div className="bar"><div className="bar-fill" style={{width: '60%', background: '#8c5a17'}}></div></div>
              <div className="bar"><div className="bar-fill" style={{width: '40%', background: '#8c5a17', opacity: 0.5}}></div></div>
            </div>
          </div>

          <div className="glass-card card-main">
            <div className="card-top">
              <div className="card-icon">CB</div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#123f27', background: '#e1efe6', padding: '4px 10px', borderRadius: '12px' }}>Active</span>
            </div>
            <div className="card-amount">$1.2M</div>
            <div className="card-label">Working Capital • Construct Bank</div>
            <div className="card-bars">
              <div className="bar"><div className="bar-fill" style={{width: '85%'}}></div></div>
              <div className="bar"><div className="bar-fill" style={{width: '25%'}}></div></div>
              <div className="bar"><div className="bar-fill" style={{width: '45%'}}></div></div>
            </div>
          </div>

          <div className="glass-card card-tertiary">
            <div className="card-top">
              <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#a0c4ac' }}>Journal Entry</span>
            </div>
            <div className="card-amount">+ $45K</div>
            <div className="card-label">Net Operating Income</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;

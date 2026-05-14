import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';

const Unauthorized = () => (
  <div style={{
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    textAlign: 'center',
    padding: '40px 24px'
  }}>
    <ShieldOff size={64} style={{ color: '#ef4444', opacity: 0.8 }} />
    <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0 }}>403 — Access Denied</h1>
    <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '360px', margin: 0 }}>
      You don't have permission to view this page. Please log in with the correct account.
    </p>
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Link to="/login" className="btn btn-primary" id="unauth-login-btn">Go to Login</Link>
      <Link to="/" className="btn btn-secondary" id="unauth-home-btn">Back to Home</Link>
    </div>
  </div>
);

export default Unauthorized;

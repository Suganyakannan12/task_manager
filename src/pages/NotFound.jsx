import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--danger)', marginBottom: '1rem' }}>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
        🏠 Return to Dashboard
      </Link>
    </div>
  );
}
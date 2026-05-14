import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PrivateRoute — wraps a route and enforces authentication + optional role check.
 *
 * Props:
 *   children  — the protected element
 *   role      — optional: 'ROLE_ADMIN' | 'ROLE_CUSTOMER' (if omitted, any logged-in user passes)
 */
const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait for localStorage rehydration before deciding
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <span className="btn-spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
      </div>
    );
  }

  if (!user) {
    // Not logged in → send to login, preserve intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    // Logged in but wrong role
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;

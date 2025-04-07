import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles, children }) => {
  const { user, loading, loggedOut } = useAuth();

  if (loading) {
    return <div className="p-6">Chargement...</div>;
  }

  // ✅ Si l'utilisateur est volontairement déconnecté → redirection vers login
  if (!user && loggedOut) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Si session expirée non volontaire → page session expirée
  if (!user) {
    return <Navigate to="/session-expiree" replace />;
  }

  // ⛔️ Rôle non autorisé
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div className="p-6 text-red-600">⛔ Accès refusé (rôle insuffisant)</div>;
  }

  return children;
};

export default PrivateRoute;

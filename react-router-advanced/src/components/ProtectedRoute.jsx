// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

// Simulated authentication
const isAuthenticated = false; // change to true to test

function ProtectedRoute({ children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;

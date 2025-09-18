import React, { useEffect } from "react";
import { useAuthContext } from "../globals/auth/AuthProvider";
import { Navigate, replace, useLocation } from "react-router-dom";

function ProtectedRouteComponent({ children }) {
  const { isLoggedIn, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // or a spinner/skeleton
  }
  if (isLoggedIn) {
    return <>{children}</>;
  }
  if (!isLoggedIn && !loading) {
    return <Navigate to="/" replace state={location} />;
  }
}

export default ProtectedRouteComponent;

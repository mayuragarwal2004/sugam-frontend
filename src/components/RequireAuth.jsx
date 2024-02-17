import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/auth/AuthState";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const RequireAuth = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  return currentUser === 0 ? (
    <div className="loading-symbol">
      <CircularProgress />
    </div>
  ) : Boolean(currentUser) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;

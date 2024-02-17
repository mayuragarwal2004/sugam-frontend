import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/auth/AuthState";
import React from "react";

const RequireAuth = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  if(!Boolean(currentUser)){
    setTimeout(()=>console.log("hello world"),5000)
  }
  return Boolean(currentUser) ? <Outlet />: <Navigate to="/" state={{ from: location }} replace />;
}

export default RequireAuth;

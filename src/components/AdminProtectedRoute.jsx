import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function RequireAdmin() {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.currentUser || !auth.currentUser.isAdmin) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}

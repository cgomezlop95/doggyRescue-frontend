import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  console.log(auth.currentUser);
  console.log(auth.currentUser.isAdmin);
  return <Outlet />;
}

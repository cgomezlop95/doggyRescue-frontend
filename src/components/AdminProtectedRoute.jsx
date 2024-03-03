import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function RequireAdmin() {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.currentUser.isAdmin) {
    console.log("You are not an admin");
    return <Navigate to="/dogs/pending" state={{ from: location }} />;
  }

  console.log(auth.currentUser.isAdmin);
  return <Outlet />;
}
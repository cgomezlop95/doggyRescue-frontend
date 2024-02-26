import { Link, Outlet } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { logout } from "../service/auth";

export const NavBar = () => {
  return (
    <>
      <div className="flex flex-row gap-10">
        <Link to="/">Go to home page</Link>
        <Link to="/signup">Sign up</Link>
        <Link to="/login">Log in</Link>
        <Link to="/dog">All Dogs</Link>
        <Link to="/new-dog">Add New Dog</Link>
        <Link to="/mapbox">Mapbox</Link>
      </div>
      <Outlet />
    </>
  );
};

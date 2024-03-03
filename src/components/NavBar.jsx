import { Link, Outlet } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
      <div className="flex flex-row gap-10">
        <Link to="/">Go to home page</Link>
        <Link to="/signup">Sign up</Link>
        <Link to="/login">Log in</Link>
        <Link to="/dogs/pending">Pending Dogs</Link>
        <Link to="/dogs/adopted">Adopted Dogs</Link>
        <Link to="/mapbox">Dog Map</Link>
      </div>

      <div className="flex flex-row gap-10">
        <Link to="/new-dog">Add New Dog</Link>
        <Link to="/adoption-requests/pending">Pending Requests</Link>
        <Link to="/adoption-requests/approved">Approved Requests</Link>
        <Link to="/adoption-requests/rejected">Rejected Requests</Link>
      </div>
      <Outlet />
    </>
  );
};

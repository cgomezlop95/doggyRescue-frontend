import { Button } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { clearCookie } from "../service/auth";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

export const NavBar = () => {
  const navigate = useNavigate(); //For redirecting upon success
  const { mutate, isLoading } = useMutation({
    mutationKey: "logout",
    mutationFn: clearCookie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/login");
    },
    onError: (error) => {
      console.error("Error al loguear el usuario:", error);
    },
  });

  return (
    <>
      <div className="flex flex-row gap-10">
        <Link to="/">Go to home page</Link>
        <Link to="/signup">Sign up</Link>
        <Link to="/login">Log in</Link>
        <Link to="/dogs/pending">Pending Dogs</Link>
        <Link to="/dogs/adopted">Adopted Dogs</Link>
        <Link to="/mapbox">Dog Map</Link>
        <Link to="/profile">Profile</Link>
        <Button onClick={mutate} disabled={isLoading}>
          Logout
        </Button>
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

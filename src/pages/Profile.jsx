import { useAuth } from "../hooks/useAuth";

export const Profile = () => {
  let auth = useAuth();
  return (
    <>
      <h1>Profile</h1>
      <h3>First Name: {auth.currentUser.firstName}</h3>
      <h3>Last Name: {auth.currentUser.lastName}</h3>
      <h3>Phone Number: {auth.currentUser.phoneNumber}</h3>
      <h3>Email Address: {auth.currentUser.email}</h3>
    </>
  );
};

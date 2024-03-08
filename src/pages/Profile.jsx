import { useAuth } from "../hooks/useAuth";
import { getMyRequests } from "../service/adoptionRequest";
import { useQuery } from "@tanstack/react-query";

export const Profile = () => {
  let auth = useAuth();
  const { data: myRequestData, isLoading } = useQuery({
    queryKey: ["myRequests"],
    queryFn: getMyRequests,
  });

  if (isLoading) {
    return <h1>Loading dogs</h1>;
  }

  console.log(myRequestData);

  return (
    <>
      <h1>Profile</h1>
      <h3>First Name: {auth.currentUser.firstName}</h3>
      <h3>Last Name: {auth.currentUser.lastName}</h3>
      <h3>Phone Number: {auth.currentUser.phoneNumber}</h3>
      <h3>Email Address: {auth.currentUser.email}</h3>
      {myRequestData.adoptionRequests.map((el) => {
        return <p>{el.adopterAge}</p>;
      })}
    </>
  );
};

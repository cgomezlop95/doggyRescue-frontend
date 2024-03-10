import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { getMyRequests } from "../service/adoptionRequest";

export const MyAdoptionRequests = () => {
  let auth = useAuth();
  const userId = auth.currentUser.id;
  console.log("userId", userId);
  const { data: myRequestData, isLoading } = useQuery({
    queryKey: ["myRequests", userId],
    queryFn: () => getMyRequests(userId),
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  console.log(myRequestData);

  return <h1>My Adoption Requests</h1>;
};

import { useQuery } from "@tanstack/react-query";
import { getPendingRequests } from "../service/adoptionRequest";

export const PendingRequests = () => {
  const { data: pendingRequestData, isLoading } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: getPendingRequests,
  });

  console.log(pendingRequestData);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return <h1>Pending Requests</h1>;
};

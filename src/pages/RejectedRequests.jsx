import { useQuery } from "@tanstack/react-query";
import { getRejectedRequests } from "../service/adoptionRequest";

export const RejectedRequests = () => {
  const { data: rejectedRequestData, isLoading } = useQuery({
    queryKey: ["rejectedRequests"],
    queryFn: getRejectedRequests,
  });

  console.log(rejectedRequestData);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return <h1>Rejected Requests</h1>;
};

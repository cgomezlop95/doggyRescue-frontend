import { useQuery } from "@tanstack/react-query";
import { getApprovedRequests } from "../service/adoptionRequest";

export const ApprovedRequests = () => {
  const { data: approvedRequestData, isLoading } = useQuery({
    queryKey: ["approvedRequests"],
    queryFn: getApprovedRequests,
  });

  console.log(approvedRequestData);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return <h1>Approved Requests</h1>;
};

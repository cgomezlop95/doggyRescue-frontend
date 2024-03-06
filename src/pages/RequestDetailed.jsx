import { useNavigate, useParams } from "react-router-dom";
import { getRequestById } from "../service/adoptionRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { approveRequest, denyRequest } from "../service/adoptionRequest";

export const RequestDetailed = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: requestData, isLoading } = useQuery({
    queryKey: ["singleRequest", id],
    queryFn: () => getRequestById(id),
  });

  console.log(requestData);

  const { mutate: approveRequestMutation, isSuccess: approveSuccess } =
    useMutation({
      mutationKey: ["approveRequest", id],
      mutationFn: () => approveRequest(id),
      onSuccess: () => {
        // queryClient.invalidateQueries
        console.log("success, request approved");
        navigate("/adoption-requests");
      },
    });

  const { mutate: denyRequestMutation, denySuccess } = useMutation({
    mutationKey: ["denyRequest", id],
    mutationFn: () => denyRequest(id),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["dogs"] });
      console.log("success, request denied");
      navigate("/adoption-requests");
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Adoption request details</h1>
      <p>
        Requester name: {requestData.adoptionRequest.user.firstName}{" "}
        {requestData.adoptionRequest.user.lastName}
      </p>
      <p>Requester email: {requestData.adoptionRequest.user.email}</p>
      <p>
        Requester phone number: {requestData.adoptionRequest.user.phoneNumber}
      </p>
      <p>Hours away: {requestData.adoptionRequest.dailyHoursAway}</p>
      <p>Has Garden: {requestData.adoptionRequest.hasGarden ? "Yes" : "No"}</p>
      <Button onClick={approveRequestMutation}>Approve</Button>
      <Button onClick={denyRequestMutation}>Deny</Button>
      <Button>Go back</Button>
    </>
  );
};

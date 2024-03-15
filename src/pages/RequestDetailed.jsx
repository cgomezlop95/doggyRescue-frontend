import { Link, useNavigate, useParams } from "react-router-dom";
import { getRequestById } from "../service/adoptionRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { approveRequest, denyRequest } from "../service/adoptionRequest";
import { CircularIndeterminate } from "../components/CircularIndeterminate";
import { Button, Input, User } from "@nextui-org/react";

export const RequestDetailed = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: requestData, isLoading } = useQuery({
    queryKey: ["singleRequest", id],
    queryFn: () => getRequestById(id),
  });

  console.log("request data", requestData);
  console.log("dog", requestData?.adoptionRequest.dog);

  const { mutate: approveRequestMutation, isSuccess: approveSuccess } =
    useMutation({
      mutationKey: ["approveRequest", id],
      mutationFn: () => approveRequest(id),
      onSuccess: () => {
        queryClient.invalidateQueries(["singleRequest", id]);
        console.log("success, request approved");
        navigate("/adoption-requests");
      },
    });

  const { mutate: denyRequestMutation, denySuccess } = useMutation({
    mutationKey: ["denyRequest", id],
    mutationFn: () => denyRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["singleRequest", id]);
      console.log("success, request denied");
      navigate("/adoption-requests");
    },
  });

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <>
      <div className="flex items-center justify-center pt-8 pb-4 space-x-4">
        <User
          name={requestData.adoptionRequest.user.firstName}
          description={
            <Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
              {requestData.adoptionRequest.user.email}
            </Link>
          }
          avatarProps={{
            src: requestData.adoptionRequest.user.userPhotoURL,
          }}
        />

        {requestData.adoptionRequest.dog.dogPhotoURL && (
          <img
            src={requestData.adoptionRequest.dog.dogPhotoURL}
            alt="Dog"
            className="max-h-[25vh] object-contain rounded-md"
          />
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto pb-8">
        <h3>Request details</h3>
        {Object.entries(requestData.adoptionRequest)
          .filter(
            ([key]) =>
              !["userId", "dogId", "updatedAt", "user", "dog"].includes(key)
          )
          .map(([key, value]) => {
            let label =
              key.charAt(0).toUpperCase() +
              key.slice(1).replace(/([A-Z])/g, " $1");
            label = label.charAt(0).toUpperCase() + label.slice(1).trim();

            const displayValue =
              key === "requestApproved"
                ? value === null
                  ? "Pending"
                  : value
                  ? "Approved"
                  : "Rejected"
                : typeof value === "boolean"
                ? value
                  ? "Yes"
                  : "No"
                : value;

            return (
              <Input
                key={key}
                label={label}
                value={displayValue}
                color="default"
                variant="bordered"
                className="w-full"
              />
            );
          })}
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto pb-8">
        <h3>Dog details</h3>
        {Object.entries(requestData.adoptionRequest.dog)
          .filter(([key]) => !["dogPhotoURL"].includes(key))
          .map(([key, value]) => {
            let label =
              key.charAt(0).toUpperCase() +
              key.slice(1).replace(/([A-Z])/g, " $1");
            label = label.charAt(0).toUpperCase() + label.slice(1).trim();

            return (
              <Input
                key={key}
                label={label}
                value={value}
                color="default"
                variant="bordered"
                className="w-full"
              />
            );
          })}
      </div>

      <div className="flex justify-center items-center py-4 gap-4">
        {requestData.adoptionRequest.requestApproved === null && (
          <>
            <Button
              color="success"
              variant="bordered"
              onClick={() => approveRequestMutation()}
            >
              Approve
            </Button>
            <Button
              color="danger"
              variant="bordered"
              onClick={() => denyRequestMutation()}
            >
              Deny
            </Button>
          </>
        )}

        <Link to="/adoption-requests">
          <Button color="primary" variant="bordered">
            Go back
          </Button>
        </Link>
      </div>

      {approveSuccess && <p>You have approved the request succesfully</p>}
      {denySuccess && <p>You have rejected the request succesfully</p>}
    </>
  );
};

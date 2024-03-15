import { useNavigate, useParams } from "react-router-dom";
import { getRequestById } from "../service/adoptionRequest";
import { useQuery } from "@tanstack/react-query";
import { CircularIndeterminate } from "../components/CircularIndeterminate";
import { Input, Textarea } from "@nextui-org/react";

export const MySingleAdoptionRequest = () => {
  const { id } = useParams();

  const { data: requestData, isLoading } = useQuery({
    queryKey: ["singleRequest", id],
    queryFn: () => getRequestById(id),
  });

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-center pt-8 pb-4 md:space-x-6 space-y-6 md:space-y-0">
        {requestData.adoptionRequest.user.userPhotoURL && (
          <img
            src={requestData.adoptionRequest.user.userPhotoURL}
            alt="User"
            className="w-24 h-24 object-cover rounded-full"
          />
        )}
        <span className="font-bold text-lg text-center md:text-left">
          {requestData.adoptionRequest.user.firstName}{" "}
          {requestData.adoptionRequest.user.lastName}
          {" would like to adopt"}
        </span>
        {requestData.adoptionRequest.dog.dogPhotoURL && (
          <img
            src={requestData.adoptionRequest.dog.dogPhotoURL}
            alt="Dog"
            className="max-h-[25vh] object-contain rounded-md shadow-md"
          />
        )}
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 p-8">
        <div>
          <h3 className="mb-4 font-bold text-lg">Request Details</h3>
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
                <div key={key} className="mb-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {label}
                  </label>
                  <Input readOnly value={displayValue} className="w-full" />
                </div>
              );
            })}
        </div>

        <div>
          <h3 className="mb-4 font-bold text-lg">Dog Details</h3>
          {Object.entries(requestData.adoptionRequest.dog)
            .filter(([key]) => !["dogPhotoURL"].includes(key))
            .map(([key, value]) => {
              let label =
                key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, " $1");
              label = label.charAt(0).toUpperCase() + label.slice(1).trim();

              return (
                <div key={key} className="mb-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {label}
                  </label>
                  <Input readOnly value={value} className="w-full" />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

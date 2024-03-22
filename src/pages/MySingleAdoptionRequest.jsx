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
                ![
                  "userId",
                  "dogId",
                  "updatedAt",
                  "user",
                  "dog",
                  "adopterDescription",
                ].includes(key)
            )
            .map(([key, value]) => {
              let label =
                key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, " $1");
              label = label.charAt(0).toUpperCase() + label.slice(1).trim();

              const displayValue =
                key === "requestApproved"
                  ? value === null
                    ? "Pending Review"
                    : value
                    ? "Yes"
                    : "No"
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

          <Textarea
            label="Adopter Description"
            value={requestData.adoptionRequest.adopterDescription}
            readOnly
            bordered
            className="mt-3"
          />
        </div>

        <div>
          <h3 className="mb-4 font-bold text-lg">Dog Details</h3>
          {Object.entries(requestData.adoptionRequest.dog)
            .filter(([key]) => !["dogPhotoURL", "dogDescription"].includes(key))
            .map(([key, value]) => {
              let label =
                key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, " $1");
              label = label.charAt(0).toUpperCase() + label.slice(1).trim();

              const displayValue =
                typeof value === "boolean" ? (value ? "Yes" : "No") : value;

              return (
                <div key={key} className="mb-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {label}
                  </label>
                  <Input readOnly value={displayValue} className="w-full" />
                </div>
              );
            })}

          <Textarea
            label="Dog Description"
            value={requestData.adoptionRequest.dog.dogDescription}
            readOnly
            bordered
            className="mt-3"
          />
        </div>
      </div>
    </div>
  );
};

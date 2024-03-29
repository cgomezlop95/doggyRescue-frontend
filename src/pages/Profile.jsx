import { useAuth } from "../hooks/useAuth";
import { getMyRequests } from "../service/adoptionRequest";
import { useQuery } from "@tanstack/react-query";
import { Button, Chip, Input } from "@nextui-org/react";
import { UserIcon } from "../components/UserIcon";
import { Link } from "react-router-dom";
import { CircularIndeterminate } from "../components/CircularIndeterminate";

export const Profile = () => {
  let auth = useAuth();
  const userId = auth.currentUser.id;
  const { data: myRequestData, isLoading } = useQuery({
    queryKey: ["myRequests", userId],
    queryFn: () => getMyRequests(userId),
  });

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <>
      <div className="flex items-center justify-center pt-8 pb-4">
        {auth.currentUser.userPhotoURL && (
          <img
            src={auth.currentUser.userPhotoURL}
            alt="User"
            className="max-h-[25vh] object-contain"
          />
        )}
        <span className="font-bold text-lg ml-4">
          {auth.currentUser.firstName} {auth.currentUser.lastName}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pb-8">
        {Object.entries(auth.currentUser)
          .filter(
            ([key]) =>
              ![
                "password",
                "id",
                "updatedAt",
                "userPhotoURL",
                "isAdmin",
              ].includes(key)
          )
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
        <Link to="/profile/update">
          <Button color="danger" variant="bordered" startContent={<UserIcon />}>
            Update Profile
          </Button>
        </Link>

        <Link to="/my-adoption-requests">
          <Button color="danger" variant="bordered">
            View My Adoption Requests
          </Button>
        </Link>
      </div>
    </>
  );
};

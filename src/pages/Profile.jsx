import { useAuth } from "../hooks/useAuth";
import { getMyRequests } from "../service/adoptionRequest";
import { useQuery } from "@tanstack/react-query";
import { Button, Chip, Input } from "@nextui-org/react";
import { UserIcon } from "../components/UserIcon";
import { Link } from "react-router-dom";

export const Profile = () => {
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

  // console.log("myRequestData", myRequestData);
  // console.log(auth.currentUser);

  return (
    <>
      <div className="flex items-center justify-center pt-8 pb-4">
        <img
          src={auth.currentUser.userPhotoURL}
          alt="User"
          className="max-h-[25vh] object-contain"
        />
        <span className="font-bold text-lg ml-4">
          {auth.currentUser.firstName} {auth.currentUser.lastName}
        </span>
        {/* <Chip size="lg">
          {auth.currentUser.firstName} {auth.currentUser.lastName}
        </Chip> */}
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pb-8">
        {Object.entries(auth.currentUser)
          .filter(
            ([key]) =>
              !["password", "id", "updatedAt", "userPhotoURL"].includes(key)
          )
          .map(([key, value]) => (
            <Input
              key={key} // Use the object key as the React key for each input
              label={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize the first letter of the label
              value={value}
              color="default"
              variant="bordered"
              className="w-full"
            />
          ))}
      </div>

      <div className="flex justify-center items-center py-4 gap-4">
        <Link to="/profile/update">
          <Button color="danger" variant="bordered" startContent={<UserIcon />}>
            Update Profile
          </Button>
        </Link>
        <Button color="danger" variant="bordered">
          View Adoption Requests
        </Button>
      </div>
    </>
  );
};

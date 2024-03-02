import { useParams, useNavigate } from "react-router-dom";
import { getDogById } from "../service/dog";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { postRequest } from "../service/adoptionRequest";
import { BooleanGroup } from "../components/BooleanGroup";
import { SingleInput } from "../components/SingleInput";
import { Button } from "@nextui-org/react";
import { Alert, Box } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

export function AdoptionRequestForm() {
  const { id } = useParams();
  let auth = useAuth();

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const inputStringArray = [
    {
      id: "1",
      name: "adopterAge",
      label: "Age",
      type: "number",
      error: errors.adopterAge,
      isRequired: true,
    },
    {
      id: "2",
      name: "dailyHoursAway",
      label: "How many hours do you spend away daily?",
      type: "number",
      error: errors.dailyHoursAway,
      isRequired: true,
    },
    {
      id: "3",
      name: "OtherPets",
      label: "Specify which other pets you have",
      type: "string",
      error: errors.OtherPets,
      isRequired: true,
    },
    {
      id: "4",
      name: "numberOfTrips",
      label: "How many trips do you do per year?",
      type: "number",
      error: errors.numberOfTrips,
      isRequired: true,
    },
    {
      id: "5",
      name: "monthlyMoney",
      label: "How much money could you dedicate to your dog?",
      type: "number",
      error: errors.numberOfTrips,
      isRequired: true,
    },
    {
      id: "6",
      name: "numberOfPeople",
      label: "How many people do you live with?",
      type: "number",
      error: errors.numberOfTrips,
      isRequired: true,
    },
    {
      id: "7",
      name: "adopterDescription",
      label: "Please tell us a bit more about yourself",
      type: "string",
      error: errors.adopterDescription,
      isRequired: true,
    },
  ];

  const booleanInputArray = [
    {
      id: "1",
      name: "hasExperience",
      label: "Do you have experience on taking care of pets?",
    },
    {
      id: "2",
      name: "hasOtherPets",
      label: "Do you have other pets at home?",
    },
    {
      id: "3",
      name: "hasKids",
      label: "Do you have kids?",
    },
    {
      id: "4",
      name: "hasGarden",
      label: "Do you have a garden or a terrace?",
    },
  ];

  const { data: dogData, isLoading } = useQuery({
    queryKey: ["dog", id],
    queryFn: () => getDogById(id),
  });

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["createAdoptionRequest", id],
    mutationFn: (data) => postRequest(id, data),
    // mutationFn: (data) => postRequest(id, data),
    // mutationFn: (data) => console.log("mutation fn", data),
  });

  const onSubmit = (data) => {
    // console.log(data);
    // console.log("auth current user id", auth.currentUser.id);
    // // mutate(data);
    // console.log("ENTRA");
    // console.log("final data", { ...data, userId: auth.currentUser.id });
    mutate({ ...data, userId: auth.currentUser.id, dogId: dogData.dog.id });
  };

  console.log("id", id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Adoption Request Form for {dogData.dog.dogName}</h1>
      <img
        src={dogData.dog.dogPhotoURL}
        alt={dogData.dog.dogName}
        className="max-w-md"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center mt-20 gap-3"
        // className="max-w-xs"
      >
        {inputStringArray.map((el) => {
          return (
            <SingleInput
              control={control}
              resetField={resetField}
              name={el.name}
              label={el.label}
              type={el.type}
              key={el.id}
              error={el.error}
              isRequired={el.isRequired}
            />
          );
        })}

        <div className="flex flex-wrap gap-4 max-w-sm">
          {booleanInputArray.map((el) => {
            return (
              <BooleanGroup
                control={control}
                name={el.name}
                label={el.label}
                key={el.id}
              />
            );
          })}
        </div>

        <Button color="primary" type="submit">
          Submit
        </Button>

        {isSuccess && (
          <Box className="flex flex-col justify-center items-center mt-10 gap-3">
            <Alert severity="success">
              Your adoption request was succesfully created.{" "}
            </Alert>
          </Box>
        )}
      </form>
    </>
  );
}

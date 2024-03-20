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
import { CircularIndeterminate } from "../components/CircularIndeterminate";

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
      patternValue: ".*",
    },
    {
      id: "2",
      name: "dailyHoursAway",
      label: "How many hours do you spend away daily?",
      type: "number",
      error: errors.dailyHoursAway,
      isRequired: true,
      patternValue: ".*",
    },
    {
      id: "3",
      name: "OtherPets",
      label: "Specify which other pets you have",
      type: "string",
      error: errors.OtherPets,
      isRequired: false,
      patternValue: ".*",
    },
    {
      id: "4",
      name: "numberOfTrips",
      label: "How many trips do you do per year?",
      type: "number",
      error: errors.numberOfTrips,
      isRequired: true,
      patternValue: ".*",
    },
    {
      id: "5",
      name: "monthlyMoney",
      label: "How much money could you dedicate to your dog?",
      type: "number",
      error: errors.numberOfTrips,
      isRequired: true,
      patternValue: ".*",
    },
    {
      id: "6",
      name: "numberOfPeople",
      label: "How many people do you live with?",
      type: "number",
      error: errors.numberOfTrips,
      isRequired: true,
      patternValue: ".*",
    },
    {
      id: "7",
      name: "adopterDescription",
      label: "Please tell us a bit more about yourself",
      type: "string",
      error: errors.adopterDescription,
      isRequired: true,
      patternValue: ".*",
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
  });

  const onSubmit = (data) => {
    mutate({ ...data, userId: auth.currentUser.id, dogId: dogData.dog.id });
  };

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <>
      <h1 className="text-center my-5 text-3xl font-semibold text-gray-800">
        Adoption Request Form for {dogData.dog.dogName}
      </h1>

      <div className="flex justify-center items-center gap-8 m-8">
        {/* Left Column: Image */}
        <div className="overflow-hidden rounded-full w-48 h-48 border border-gray-200 shadow-lg">
          <img
            src={dogData.dog.dogPhotoURL}
            alt={`Photo of ${dogData.dog.dogName}`}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Middle Column: Input Fields */}
        <div className="flex-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {inputStringArray.map((el) => (
              <SingleInput
                control={control}
                resetField={resetField}
                name={el.name}
                label={el.label}
                type={el.type}
                key={el.id}
                error={el.error}
                isRequired={el.isRequired}
                patternValue={el.patternValue}
              />
            ))}
          </form>
        </div>

        {/* Right Column: Boolean Group */}
        <div className="flex-1">
          <div className="flex flex-col gap-2">
            {booleanInputArray.map((el) => (
              <BooleanGroup
                control={control}
                name={el.name}
                label={el.label}
                key={el.id}
                defaultValue={false}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="mt-6">
          <Button
            color="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </div>

        {isSuccess && (
          <div className="mt-6 max-w-md text-center">
            <Alert severity="success">
              Your adoption request was successfully created.
            </Alert>
          </div>
        )}
      </div>
    </>
  );
}

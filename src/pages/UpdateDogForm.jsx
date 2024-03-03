import { SingleInput } from "../components/SingleInput";
import { InputFileUpload } from "../components/InputFileUpload";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDogById, updateDog } from "../service/dog";
import { Button } from "@nextui-org/react";
import { SelectInput } from "../components/SelectInput";
import { Alert, Box } from "@mui/material";
import React, { useState } from "react";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BooleanGroup } from "../components/BooleanGroup";
import { CameraIcon } from "../components/CameraIcon";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateDogForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: dogData, isLoading } = useQuery({
    queryKey: ["dog", id],
    queryFn: () => getDogById(id),
  });

  console.log(dogData);

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    register,
    formState: { errors },
  } = useForm();

  const inputStringArray = [
    {
      id: "1",
      name: "dogName",
      label: "Name",
      type: "string",
      error: errors.dogName,
      isRequired: true,
      defaultValue: dogData?.dog.dogName,
    },
    {
      id: "2",
      name: "dogAge",
      label: "Age",
      type: "number",
      error: errors.dogAge,
      isRequired: true,
      defaultValue: dogData?.dog.dogAge,
    },
    {
      id: "3",
      name: "dogWeight",
      label: "Weight",
      type: "number",
      error: errors.dogWeight,
      isRequired: true,
      defaultValue: dogData?.dog.dogWeight,
    },
    {
      id: "4",
      name: "dogBreed",
      label: "Breed",
      type: "string",
      error: errors.dogBreed,
      isRequired: true,
      defaultValue: dogData?.dog.dogBreed,
    },
    {
      id: "5",
      name: "dogDescription",
      label: "Description",
      type: "string",
      error: errors.dogDescription,
      isRequired: false,
      defaultValue: dogData?.dog.dogDescription,
    },
    {
      id: "6",
      name: "longitude",
      label: "Longitude",
      type: "number",
      error: errors.longitude,
      isRequired: false,
      defaultValue: dogData?.dog.longitude,
    },
    {
      id: "7",
      name: "latitude",
      label: "Latitude",
      type: "number",
      error: errors.latitude,
      isRequired: false,
      defaultValue: dogData?.dog.latitude,
    },
  ];

  const booleanInputArray = [
    {
      id: "1",
      name: "dogAdopted",
      label: "Dog Adopted",
      defaultValue: dogData?.dog.dogAdopted,
    },
    {
      id: "2",
      name: "suitableForKids",
      label: "Suitable For Kids",
      defaultValue: dogData?.dog.suitableForKids,
    },
    {
      id: "3",
      name: "suitableForOtherPets",
      label: "Suitable For Other Pets",
      defaultValue: dogData?.dog.suitableForOtherPets,
    },
    {
      id: "4",
      name: "potentiallyDangerousDog",
      label: "Potentially Dangerous Dog",
      defaultValue: dogData?.dog.potentiallyDangerousDog,
    },
    {
      id: "5",
      name: "isVaccinated",
      label: "Vaccinated",
      defaultValue: dogData?.dog.isVaccinated,
    },
    {
      id: "6",
      name: "isSterilized",
      label: "Sterilized",
      defaultValue: dogData?.dog.isSterilized,
    },
  ];

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["updateDog", id],
    mutationFn: (data) => updateDog(id, data),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["dogs"] });
      console.log("dog succesffully modified");
      navigate("/dogs/pending");
    },
  });

  const onSubmit = async (data) => {
    const storageRef = ref(storage, `images/${image.name}`);
    try {
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      setUrl(downloadURL);
      console.log("Archivo disponible en", downloadURL);
      console.log({ ...data, dogPhotoURL: downloadURL });
      mutate({ ...data, dogPhotoURL: downloadURL }); //await here ?
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Update Dog Form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center mt-20 gap-3"
        // className="max-w-xs"
      >
        <SelectInput
          control={control}
          name="dogSex"
          label="Gender"
          defaultValue={dogData.dog.dogSex}
        />

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
              defaultValue={el.defaultValue}
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
                defaultValue={el.defaultValue}
              />
            );
          })}
        </div>
        {/* 
        <InputFileUpload onChange={handleChange} /> */}

        <input type="file" onChange={handleChange} />

        <Button color="primary" type="submit">
          Update Dog
        </Button>

        <Button color="primary" onClick={reset}>
          Clear Form
        </Button>

        {isSuccess && (
          <Box className="flex flex-col justify-center items-center mt-10 gap-3">
            <Alert severity="success">
              Your dog was succesfully modified.{" "}
            </Alert>
          </Box>
        )}
      </form>
    </>
  );
}

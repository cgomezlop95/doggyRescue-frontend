import { SingleInput } from "../components/SingleInput";
import { InputFileUpload } from "../components/InputFileUpload";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postDog } from "../service/dog";
import { Button } from "@nextui-org/react";
import { SelectInput } from "../components/SelectInput";
import { Alert, Box } from "@mui/material";
import React, { useState } from "react";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BooleanGroup } from "../components/BooleanGroup";
import { CameraIcon } from "../components/CameraIcon";
import { Link } from "react-router-dom";

export function DogForm() {
  const {
    control,
    handleSubmit,
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
      patternValue: ".*",
      // defaultValue: "",
    },
    {
      id: "2",
      name: "dogAge",
      label: "Age",
      type: "number",
      error: errors.dogAge,
      isRequired: true,
      patternValue: ".*",
      // defaultValue: "",
    },
    {
      id: "3",
      name: "dogWeight",
      label: "Weight",
      type: "number",
      error: errors.dogWeight,
      isRequired: true,
      patternValue: ".*",
      // defaultValue: "",
    },
    {
      id: "4",
      name: "dogBreed",
      label: "Breed",
      type: "string",
      error: errors.dogBreed,
      isRequired: true,
      patternValue: ".*",
      // defaultValue: "",
    },
    {
      id: "5",
      name: "dogDescription",
      label: "Description",
      type: "string",
      error: errors.dogDescription,
      isRequired: false,
      patternValue: ".*",
      // defaultValue: "",
    },
    {
      id: "6",
      name: "longitude",
      label: "Longitude",
      type: "number",
      error: errors.longitude,
      isRequired: false,
      patternValue: ".*",
      // defaultValue: "",
    },
    {
      id: "7",
      name: "latitude",
      label: "Latitude",
      type: "number",
      error: errors.latitude,
      isRequired: false,
      patternValue: ".*",
      // defaultValue: "",
    },
  ];

  const booleanInputArray = [
    {
      id: "1",
      name: "suitableForKids",
      label: "Suitable For Kids",
    },
    {
      id: "2",
      name: "suitableForOtherPets",
      label: "Suitable For Other Pets",
    },
    {
      id: "3",
      name: "potentiallyDangerousDog",
      label: "Potentially Dangerous Dog",
    },
    {
      id: "4",
      name: "isVaccinated",
      label: "Vaccinated",
    },
    {
      id: "5",
      name: "isSterilized",
      label: "Sterilized",
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
    mutationKey: "createDog",
    mutationFn: postDog,
  });

  const onSubmit = async (data) => {
    try {
      if (image) {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        setUrl(downloadURL);
        console.log("Archivo disponible en", downloadURL);
        console.log({ ...data, dogPhotoURL: downloadURL });
        mutate({ ...data, dogPhotoURL: downloadURL }); //await here ?
      } else {
        console.log(data);
        mutate(data);
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  return (
    <>
      <h1>Dog Form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center mt-20 gap-3"
        // className="max-w-xs"
      >
        <SelectInput control={control} name="dogSex" label="Gender" />

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
              // defaultValue={el.defaultValue}
              patternValue={el.patternValue}
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
        {/* 
        <InputFileUpload onChange={handleChange} /> */}

        <input type="file" onChange={handleChange} />

        <Button color="primary" type="submit">
          Submit
        </Button>

        {isSuccess && (
          <>
            <Box className="flex flex-col justify-center items-center mt-10 gap-3">
              <Alert severity="success">
                Your dog was succesfully created.{" "}
              </Alert>
            </Box>
            <Link to="/dogs/pending">
              <Button>View All Pending Dogs</Button>
            </Link>
          </>
        )}
      </form>
    </>
  );
}

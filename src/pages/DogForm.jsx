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
import { Link, useNavigate } from "react-router-dom";

export function DogForm() {
  const navigate = useNavigate(); //For redirecting upon success

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
    },
    {
      id: "2",
      name: "dogAge",
      label: "Age",
      type: "string",
      error: errors.dogAge,
      isRequired: true,
      patternValue: "^-?(0|[1-9][0-9]*).[0-9]+$",
    },
    {
      id: "3",
      name: "dogWeight",
      label: "Weight",
      type: "string",
      error: errors.dogWeight,
      isRequired: true,
      patternValue: "^-?(0|[1-9][0-9]*).[0-9]+$",
    },
    {
      id: "4",
      name: "dogBreed",
      label: "Breed",
      type: "string",
      error: errors.dogBreed,
      isRequired: true,
      patternValue: ".*",
    },
    {
      id: "5",
      name: "dogDescription",
      label: "Description",
      type: "string",
      error: errors.dogDescription,
      isRequired: false,
      patternValue: ".*",
    },
    {
      id: "6",
      name: "longitude",
      label: "Longitude",
      type: "string",
      error: errors.longitude,
      isRequired: false,
      patternValue: "^-?(0|[1-9][0-9]*).[0-9]+$", //Positive or negative decimal numbers
    },
    {
      id: "7",
      name: "latitude",
      label: "Latitude",
      type: "string",
      error: errors.latitude,
      isRequired: false,
      patternValue: "^-?(0|[1-9][0-9]*).[0-9]+$",
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
        mutate({ ...data, dogPhotoURL: downloadURL });
      } else {
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
        <SelectInput
          control={control}
          name="dogSex"
          label="Gender"
          isRequired={true}
          error={errors.dogSex}
        />

        {inputStringArray.map((el) => {
          return (
            <SingleInput
              key={el.id}
              control={control}
              resetField={resetField}
              name={el.name}
              label={el.label}
              type={el.type}
              error={el.error}
              isRequired={el.isRequired}
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
                defaultValue={false}
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
            <Link to="/">
              <Button color="primary">View All Pending Dogs</Button>
            </Link>
          </>
        )}
      </form>
    </>
  );
}

//I cannot enter negative numbers?

import { SingleInput } from "../components/SingleInput";
import { InputFileUpload } from "../components/InputFileUpload";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postDog } from "../service/dog";
import { Button, Input } from "@nextui-org/react";
import { BooleanInput } from "../components/BooleanInput";
import { BooleanInputSwitch } from "../components/BooleanInputSwitch";
import { SelectInput } from "../components/SelectInput";
import { Alert, Box } from "@mui/material";

//Firestore
import React, { useState } from "react";
import { storage } from "../config/firebase"; // Ajusta la ruta de importación según sea necesario
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function DogForm() {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const inputStringArray = [
    {
      id: "1",
      name: "dogName",
      type: "string",
      error: errors.dogName,
      isRequired: true,
    },
    {
      id: "2",
      name: "dogAge",
      type: "number",
      error: errors.dogAge,
      isRequired: true,
    },
    {
      id: "3",
      name: "dogWeight",
      type: "number",
      error: errors.dogWeight,
      isRequired: true,
    },
    {
      id: "4",
      name: "dogBreed",
      type: "string",
      error: errors.dogBreed,
      isRequired: true,
    },
    {
      id: "5",
      name: "dogDescription",
      type: "string",
      error: errors.dogDescription,
      isRequired: false,
    },
  ];

  const booleanInputArray = [
    {
      id: "1",
      name: "dogAdopted",
    },
    {
      id: "2",
      name: "suitableForKids",
    },
    {
      id: "3",
      name: "suitableForOtherPets",
    },
    {
      id: "4",
      name: "potentiallyDangerousDog",
    },
    {
      id: "5",
      name: "isVaccinated",
    },
    {
      id: "6",
      name: "isSterilized",
    },
  ];

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storageRef = ref(storage, `images/${image.name}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setUrl(downloadURL);
        console.log("Archivo disponible en", downloadURL);
      });
    });
  };

  const { mutate, isSuccess } = useMutation({
    mutationKey: "createDog",
    mutationFn: postDog,
  });

  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <>
      <h1>Dog Form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center mt-20 gap-3"
      >
        <select {...register("dogSex", { required: true })}>
          <option value="male">male</option>
          <option value=" female "> female </option>
        </select>

        {inputStringArray.map((el) => {
          return (
            <SingleInput
              control={control}
              reset={reset}
              name={el.name}
              type={el.type}
              key={el.id}
              error={el.error}
              isRequired={el.isRequired}
            />
          );
        })}

        {booleanInputArray.map((el) => {
          return (
            <label key={el.id}>
              <input type="checkbox" {...register(el.name)} />
              {el.name}
            </label>
          );
        })}

        <div>
          <input type="file" onChange={handleChange} />
          <br />
          {url && (
            <img src={url} alt="Subida Firebase" style={{ width: "100px" }} />
          )}
        </div>

        <Button color="primary" type="submit" onClick={handleUpload}>
          Submit
        </Button>

        {isSuccess && (
          <Box className="flex flex-col justify-center items-center mt-10 gap-3">
            <Alert severity="success">Your dog was succesfully created. </Alert>
          </Box>
        )}
      </form>
    </>
  );
}

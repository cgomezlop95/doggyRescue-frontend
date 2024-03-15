import { SingleInput } from "../components/SingleInput";
import { InputFileUpload } from "../components/InputFileUpload";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@nextui-org/react";
import { SelectInput } from "../components/SelectInput";
import { Alert, Box } from "@mui/material";
import React, { useState } from "react";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BooleanGroup } from "../components/BooleanGroup";
import { CameraIcon } from "../components/CameraIcon";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../service/user";
import { useAuth } from "../hooks/useAuth";
import { queryClient } from "../main";
import { CircularIndeterminate } from "../components/CircularIndeterminate";

export function UpdateUserForm() {
  const navigate = useNavigate();
  let auth = useAuth();
  const userId = auth.currentUser.id;

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    register,
    formState: { errors },
  } = useForm();

  const userInputArray = [
    {
      id: "1",
      name: "email",
      label: "Email",
      type: "string",
      error: errors.email,
      isRequired: true,
      patternValue: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
      defaultValue: userData?.userById.email,
    },
    {
      id: "2",
      name: "firstName",
      label: "First Name",
      type: "string",
      error: errors.firstName,
      isRequired: true,
      patternValue: ".*",
      defaultValue: userData?.userById.firstName,
    },
    {
      id: "3",
      name: "lastName",
      label: "Last Name",
      type: "string",
      error: errors.lastName,
      isRequired: true,
      patternValue: ".*",
      defaultValue: userData?.userById.lastName,
    },
    {
      id: "4",
      name: "phoneNumber",
      label: "Phone Number",
      type: "string",
      error: errors.phoneNumber,
      isRequired: false,
      patternValue: ".*",
      defaultValue: userData?.userById.phoneNumber,
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
    mutationKey: ["updateUser", userId],
    mutationFn: (data) => updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/profile");
    },
  });

  const onSubmit = async (data) => {
    try {
      if (image) {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        setUrl(downloadURL);
        mutate({ ...data, userPhotoURL: downloadURL });
      } else {
        mutate(data);
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <>
      <h1>Update Profile Form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center mt-20 gap-3"
        // className="max-w-xs"
      >
        {userInputArray.map((el) => {
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
              patternValue={el.patternValue}
            />
          );
        })}

        {/* 
        <InputFileUpload onChange={handleChange} /> */}

        <input type="file" onChange={handleChange} />

        <Button color="primary" type="submit">
          Update Profile
        </Button>

        <Button color="primary" onClick={reset}>
          Clear Form
        </Button>

        {isSuccess && (
          <Box className="flex flex-col justify-center items-center mt-10 gap-3">
            <Alert severity="success">
              Your profile was succesfully updated.{" "}
            </Alert>
          </Box>
        )}
      </form>
    </>
  );
}

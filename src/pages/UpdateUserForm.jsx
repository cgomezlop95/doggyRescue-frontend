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

export function UpdateUserForm() {
  const navigate = useNavigate();

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
    },
    {
      id: "2",
      name: "password",
      label: "Password",
      type: "password",
      error: errors.password,
      isRequired: true,
      patternValue: ".*",
    },
    {
      id: "3",
      name: "firstName",
      label: "First Name",
      type: "string",
      error: errors.firstName,
      isRequired: true,
      patternValue: ".*",
    },
    {
      id: "4",
      name: "lastName",
      label: "Last Name",
      type: "string",
      error: errors.lastName,
      isRequired: true,
      patternValue: ".*",
    },
    {
      id: "5",
      name: "phoneNumber",
      label: "Phone Number",
      type: "string",
      error: errors.phoneNumber,
      isRequired: false,
      patternValue: ".*",
    },
  ];

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  return (
    <>
      <h1>Update Profile Form</h1>
    </>
  );
}

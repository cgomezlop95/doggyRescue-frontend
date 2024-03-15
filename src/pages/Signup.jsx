import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../service/auth";
import { useNavigate } from "react-router-dom";
import { SingleInput } from "../components/SingleInput";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { useState } from "react";
import { Alert } from "@mui/material";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function SignUp() {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false); //For privacy policy
  const [privacyPolicyError, setPrivacyPolicyError] = useState("");
  //The last sentence is for the error message if the user did not sign the privacy policy
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const {
    register,
    control,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signupInputArray = [
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

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const { mutate: signupMutation } = useMutation({
    mutationKey: "signup",
    mutationFn: postRegister,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const onSubmit = async (data) => {
    if (!isSelected) {
      setPrivacyPolicyError("You must agree to the privacy policy to sign up.");
      return; // Prevent the form submission
    } else if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      setUrl(downloadURL);
      ("Archivo disponible en", downloadURL);
      setPrivacyPolicyError(""); // Clear any previous error message
      signupMutation({ ...data, userPhotoURL: downloadURL }); //await here ?
    } else {
      setPrivacyPolicyError(""); // Clear any previous error message
      signupMutation(data);
    }
    // setPrivacyPolicyError(""); // Clear any previous error message
    // signupMutation(data); // Proceed with the signup mutation
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center mt-20 gap-3"
      >
        {signupInputArray.map((el) => {
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

        <input type="file" onChange={handleChange} />

        <Button
          color="primary"
          type="submit"
          disabled={signupMutation.isLoading}
        >
          Submit
        </Button>
        <div className="flex flex-col gap-2">
          <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
            By signing up, you expressly agree to our{" "}
            <a href="/privacy-policy">Privacy Policy</a>
          </Checkbox>

          {privacyPolicyError && (
            <Alert variant="filled" severity="error">
              {privacyPolicyError}
            </Alert>
          )}
        </div>
      </form>
    </div>
  );
}

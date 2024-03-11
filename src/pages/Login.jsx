import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../service/auth";
import { queryClient } from "../main";
import { SingleInput } from "../components/SingleInput";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { Alert } from "@mui/material";

export function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    control,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginInputArray = [
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
  ];

  const { mutate: loginMutate, isLoading } = useMutation({
    mutationKey: "login",
    mutationFn: postLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/profile");
    },
    onError: (error) => {
      console.error("Login error:", error);
      setErrorMessage("Invalid login credentials");
    },
  });

  const onSubmit = (data) => {
    loginMutate(data);
    setErrorMessage("");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center mt-20 gap-3"
      >
        {loginInputArray.map((el) => {
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

        <Button color="primary" type="submit" disabled={isLoading}>
          Submit
        </Button>

        {errorMessage && (
          <Alert variant="filled" severity="error">
            {errorMessage}
          </Alert>
        )}
      </form>
    </div>
  );
}

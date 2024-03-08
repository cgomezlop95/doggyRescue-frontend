import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../service/auth";
import { useNavigate } from "react-router-dom";
import { SingleInput } from "../components/SingleInput";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { useState } from "react";

export function SignUp() {
  const navigate = useNavigate(); //For redirecting upon success
  const [isSelected, setIsSelected] = useState(false); //For privacy policy

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

  const { mutate: signupMutation } = useMutation({
    mutationKey: "signup",
    mutationFn: postRegister,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const onSubmit = async (data) => {
    signupMutation(data);
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
          <p className="text-default-500">
            Selected: {isSelected ? "true" : "false"}
          </p>
        </div>
      </form>
    </div>
  );
}

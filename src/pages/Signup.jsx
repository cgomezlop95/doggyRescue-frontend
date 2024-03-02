import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../service/auth";
import { useNavigate } from "react-router-dom";
import { SingleInput } from "../components/SingleInput";
import { Button } from "@nextui-org/react";

export function SignUp() {
  const navigate = useNavigate(); //For redirecting upon success
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
    },
    {
      id: "2",
      name: "password",
      label: "Password",
      type: "password",
      error: errors.password,
      isRequired: true,
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
      </form>
    </div>
  );
}

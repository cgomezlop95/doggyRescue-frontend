import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../service/auth";
import { queryClient } from "../main";
import { SingleInput } from "../components/SingleInput";
import { Button } from "@nextui-org/react";

export function Login() {
  const navigate = useNavigate(); //For redirecting upon success
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

  const { mutate: loginMutate, isLoading } = useMutation({
    mutationKey: "login",
    mutationFn: postLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/dogs/pending");
    },
    onError: (error) => {
      console.error("Error al loguear el usuario:", error);
    },
  });

  const onSubmit = (data) => {
    loginMutate(data);
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
            />
          );
        })}

        <Button color="primary" type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
}

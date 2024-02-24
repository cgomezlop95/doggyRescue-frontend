import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../service/auth";
import { queryClient } from "../main";

export function Login() {
  const navigate = useNavigate(); //For redirecting upon success
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: loginMutate, isLoading } = useMutation({
    mutationKey: "login",
    mutationFn: postLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"], exact });
      navigate("/dogs");
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
        className="flex flex-col items-center"
      >
        <label htmlFor="email">
          Email
          <input
            type="email"
            autoComplete="username"
            {...register("email", { required: true })}
            className="border-2 border-black"
          />
          {errors.email && <span>This field is required</span>}
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            autoComplete="current-password"
            {...register("password", { required: true })}
            className="border-2 border-black"
          />
          {errors.password && <span>This field is required</span>}
        </label>
        <input
          type="submit"
          disabled={isLoading}
          className="border-2 border-black"
        />
      </form>
    </div>
  );
}

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../service/auth";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate(); //For redirecting upon success
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: signupMutation } = useMutation({
    mutationKey: "signup",
    mutationFn: postRegister,
    onSuccess: () => {
      navigate("/dogs");
    },
  });

  const onSubmit = async (data) => {
    signupMutation(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            autoComplete="username"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </label>
        <button type="submit" disabled={signupMutation.isLoading}>
          Sign up
        </button>
      </form>
    </div>
  );
}

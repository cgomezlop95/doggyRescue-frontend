import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../service/auth";
import { useNavigate } from "react-router-dom";

export function SignUpBackup() {
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
      navigate("/dog");
    },
  });

  const onSubmit = async (data) => {
    signupMutation(data);
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
            name="email"
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
            name="password"
            autoComplete="new-password"
            {...register("password", { required: true })}
            className="border-2 border-black"
          />
          {errors.password && <span>This field is required</span>}
        </label>
        <button
          type="submit"
          disabled={signupMutation.isLoading}
          className="border-2 border-black"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

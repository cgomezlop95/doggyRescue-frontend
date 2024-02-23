import { Controller } from "react-hook-form";
import { Input } from "@nextui-org/react";

export function SingleInput({ control, reset, name, type }) {
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""} //This solved my warning "A component changed from uncontrolled to controlled"
      rules={{
        required: {
          value: true,
          message: "This field is required.",
        },
      }}
      render={({ field: { onChange, value, name } }) => (
        <Input
          label={capitalizeFirstLetter(name)}
          value={value}
          onChange={onChange}
          //isInvalid={!!error}
          //color={error ? "danger" : "default"}
          //errorMessage={error && error.message}
          type={type}
          isClearable
          variant="bordered"
          placeholder={`Enter your ${name}`}
          onClear={() => reset()}
        />
      )}
    />
  );
}

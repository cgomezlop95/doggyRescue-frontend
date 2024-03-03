import { Controller } from "react-hook-form";
import { Input } from "@nextui-org/react";

export function SingleInput({
  control,
  resetField,
  name,
  type,
  error,
  isRequired,
  label,
  defaultValue,
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ? defaultValue : ""} //This solved my warning "A component changed from uncontrolled to controlled"
      //If defaultValue is null or undefined, an empty string is used as the default value.
      rules={{
        required: {
          value: true,
          message: "This field is required.",
        },
      }}
      render={({ field: { onChange, value } }) => (
        <Input
          label={label}
          value={value} //The current value of the input (controlled).
          onChange={onChange}
          isInvalid={!!error}
          color={error ? "danger" : "default"}
          errorMessage={error && error.message}
          type={type}
          isClearable
          variant="bordered"
          // placeholder={defaultValue}
          onClear={() => {
            resetField(name);
          }}
          isRequired={isRequired}
          className="max-w-xs"
        />
      )}
    />
  );
}

//I cannot clear properly the field if there is a default value for the updated form

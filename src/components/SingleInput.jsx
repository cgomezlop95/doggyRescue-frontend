import { Controller } from "react-hook-form";
import { Input} from "@nextui-org/react";

export function SingleInput({
  control,
  resetField,
  name,
  type,
  error,
  isRequired,
  label,
}) {
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
      render={({ field: { onChange, value } }) => (
        <Input
          label={label}
          value={value}
          onChange={onChange}
          isInvalid={!!error}
          color={error ? "danger" : "default"}
          errorMessage={error && error.message}
          type={type}
          isClearable
          variant="bordered"
          //placeholder={`Enter your ${name}`}
          onClear={() => resetField(name)}
          isRequired={isRequired}
          className="max-w-xs"
        />
      )}
    />
  );
}

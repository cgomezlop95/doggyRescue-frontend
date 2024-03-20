import { Textarea } from "@nextui-org/react";
import { Controller } from "react-hook-form";

export function DescriptionInput({ name, control, error, defaultValue }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Textarea
          label="Dog Description"
          value={value}
          onChange={onChange}
          isInvalid={!!error}
          color={error ? "danger" : "default"}
          errorMessage={error && error.message}
          bordered
          className="max-w-xs"
          defaultValue={defaultValue}
        />
      )}
    />
  );
}

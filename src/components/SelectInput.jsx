import { Controller } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";

const genders = [
  { label: "Male", value: "male", description: "male gender" },
  { label: "Female", value: "female", description: "female gender" },
];

export function SelectInput({ control, name, label, isRequired, error }) {
  return (
    <Controller
      name={name}
      control={control}
      // defaultValue={defaultValue}
      rules={{
        required: {
          value: isRequired,
          message: "This field is required.",
        },
      }}
      render={({ field: { onChange, value } }) => (
        <div className="flex w-full max-w-xs flex-col gap-2">
          <Select
            label={label}
            value={value}
            variant="bordered"
            // placeholder={defaultValue}
            className="max-w-xs"
            onChange={onChange}
            isInvalid={!!error}
            color={error ? "danger" : "default"}
            errorMessage={error && error.message}
          >
            {genders.map((gender) => (
              <SelectItem key={gender.value} value={gender.value}>
                {gender.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      )}
    />
  );
}

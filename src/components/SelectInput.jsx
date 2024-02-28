import { Controller } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

const genders = [
  { label: "Male", value: "male", description: "male gender" },
  { label: "Female", value: "female", description: "female gender" },
];

export function SelectInput({ control, name }) {
  const [value, setValue] = useState(new Set([]));

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
        <div className="flex w-full max-w-xs flex-col gap-2">
          <Select
            label="Dog Sex"
            variant="bordered"
            placeholder="Select the dog sex"
            selectedKeys={value}
            className="max-w-xs"
            onSelectionChange={setValue}
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

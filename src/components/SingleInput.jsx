import { Controller } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { EyeFilledIcon } from "../components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";
import { MailIcon } from "../components/MailIcon";

export function SingleInput({
  control,
  resetField,
  name,
  type,
  error,
  isRequired,
  label,
  defaultValue,
  patternValue,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ? defaultValue : ""}
      rules={{
        required: {
          value: isRequired,
          message: "This field is required.",
        },
        pattern: {
          value: new RegExp(`^${patternValue}$`),
          message: "This is not a valid input",
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
          variant="bordered"
          className="max-w-xs"
          type={name === "password" ? (isVisible ? "text" : "password") : type}
          isClearable={name !== "password" && name !== "email"}
          onClear={() => {
            if (name !== "password" && name !== "email") {
              resetField(name);
            }
          }}
          endContent={
            (name === "password" && (
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            )) ||
            (name === "email" && (
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            ))
          }
        />
      )}
    />
  );
}

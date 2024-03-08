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
  const [isVisible, setIsVisible] = useState(false); //For passwords
  const toggleVisibility = () => setIsVisible(!isVisible); //For passwords
  console.log(patternValue);
  console.log(name);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ? defaultValue : ""} //This solved my warning "A component changed from uncontrolled to controlled"
      //If defaultValue is null or undefined, an empty string is used as the default value.
      rules={{
        required: {
          value: isRequired,
          message: "This field is required.",
        },
        pattern: {
          value: new RegExp(`^${patternValue}$`),
          message: "This is not a valid input", //Customize for each?
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
          variant="bordered"
          // placeholder={defaultValue}
          // isRequired={isRequired}
          className="max-w-xs"
          type={name === "password" ? (isVisible ? "text" : "password") : type}
          isClearable={name !== "password" && name !== "email"}
          //If you pass the isClearable property to the input, it will have a clear button at the end of the input, it will be visible when the input has a value.
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

//I cannot clear properly the field if there is a default value for the updated form

//Why do not I see the end icons until I start typing?

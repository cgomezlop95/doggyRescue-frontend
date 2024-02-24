import { SingleInput } from "../components/SingleInput";
import { InputFileUpload } from "../components/InputFileUpload";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postDog } from "../service/dog";
import { Button } from "@nextui-org/react";
import { BooleanInput } from "../components/BooleanInput";
import { BooleanInputSwitch } from "../components/BooleanInputSwitch";
import { SelectInput } from "../components/SelectInput";

export function DogForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const inputStringArray = [
    {
      id: "1",
      name: "dogName",
      type: "string",
      error: errors.dogName,
      isRequired: true,
    },
    {
      id: "2",
      name: "dogAge",
      type: "number",
      error: errors.dogAge,
      isRequired: true,
    },
    {
      id: "3",
      name: "dogWeight",
      type: "number",
      error: errors.dogWeight,
      isRequired: true,
    },
    {
      id: "4",
      name: "dogBreed",
      type: "string",
      error: errors.dogBreed,
      isRequired: true,
    },
    {
      id: "5",
      name: "dogDescription",
      type: "string",
      error: errors.dogDescription,
      isRequired: false,
    },
  ];

  const booleanInputArray = [
    {
      id: "1",
      name: "dogAdopted",
    },
    {
      id: "2",
      name: "suitableForKids",
    },
    {
      id: "3",
      name: "suitableForOtherPets",
    },
    {
      id: "4",
      name: "potentiallyDangerousDog",
    },
    {
      id: "5",
      name: "isVaccinated",
    },
    {
      id: "6",
      name: "isSterilized",
    },
  ];

  const { mutate } = useMutation({
    mutationKey: "createDog",
    mutationFn: postDog,
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <>
      <h1>Dog Form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center mt-20 gap-3"
      >
        <SelectInput name="dogSex" control={control}/>

        {inputStringArray.map((el) => {
          return (
            <SingleInput
              control={control}
              reset={reset}
              name={el.name}
              type={el.type}
              key={el.id}
              error={el.error}
              isRequired={el.isRequired}
            />
          );
        })}

        {booleanInputArray.map((el) => {
          return <BooleanInput key={el.id} name={el.name} />;
        })}

        {booleanInputArray.map((el) => {
          return <BooleanInputSwitch key={el.id} name={el.name} />;
        })}

        <InputFileUpload />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

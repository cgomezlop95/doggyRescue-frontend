import { SingleInput } from "../components/SingleInput";
import { InputFileUpload } from "../components/InputFileUpload";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postDog } from "../service/dog";
import { Button } from "@nextui-org/react";

export function DogForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const inputStringArray = [
    { id: "1", name: "dogName", type: "string", error: errors.dogName },
    { id: "2", name: "dogSex", type: "string", error: errors.dogSex },
    { id: "3", name: "dogBreed", type: "string", error: errors.dogBreed },
    {
      id: "4",
      name: "dogDescription",
      type: "string",
      error: errors.dogDescription,
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
        {inputStringArray.map((el) => {
          return (
            <SingleInput
              control={control}
              reset={reset}
              name={el.name}
              type={el.type}
              key={el.id}
            />
          );
        })}
        <InputFileUpload />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

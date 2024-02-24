import { Checkbox } from "@nextui-org/react";

export function BooleanInput({ name }) {
  return (
    <Checkbox defaultSelected color="default">
      {name}
    </Checkbox>
  );
}

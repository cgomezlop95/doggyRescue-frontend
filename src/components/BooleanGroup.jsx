import { Switch } from "@nextui-org/react";
import { useState } from "react";
import { Controller } from "react-hook-form";

export function BooleanGroup({ control, name, label, defaultValue }) {
  const [isSelected, setIsSelected] = useState(defaultValue);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue} //Should be False
      render={({ field: { onChange, value } }) => (
        <Switch
          color="primary"
          onChange={onChange}
          value={value}
          isSelected={isSelected}
          onValueChange={setIsSelected}
        >
          {label}
        </Switch>
      )}
    />
  );
}

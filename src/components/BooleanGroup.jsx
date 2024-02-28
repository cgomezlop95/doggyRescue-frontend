import { Switch } from "@nextui-org/react";
import { Controller } from "react-hook-form";

export function BooleanGroup({ control, name, label }) {
  return (
    <Controller
      name={name}
      defaultValue={false}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Switch color="default" onChange={onChange} value={value}>
          {label}
        </Switch>
      )}
    />
  );
}

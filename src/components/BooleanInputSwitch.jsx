import { Switch } from "@nextui-org/react";

export function BooleanInputSwitch({ name }) {
  return <Switch defaultSelected>{name}</Switch>;
}

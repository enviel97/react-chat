import { components } from "react-select";
import { AsyncDropdownOption } from "../types/AsyncDropdown.type";

function DropdownOption<T>({ children, ...props }: AsyncDropdownOption<T>) {
  return <components.Option {...props}>{props.label}</components.Option>;
}
export default DropdownOption;

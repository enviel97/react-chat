import { BiSearch } from "react-icons/bi";
import { components } from "react-select";
import { AsyncDropdownIcon } from "../types/AsyncDropdown.type";

function DropDownIndicator(props: AsyncDropdownIcon<any>) {
  return (
    <components.DropdownIndicator {...props}>
      <BiSearch />
    </components.DropdownIndicator>
  );
}

export default DropDownIndicator;

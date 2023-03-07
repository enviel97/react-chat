import { AsyncDropdownValueContainer } from "../types/AsyncDropdown.type";
import { components } from "react-select";

function DropDownValueContainer<T>({
  children,
  ...props
}: AsyncDropdownValueContainer<T>) {
  return (
    <components.ValueContainer {...props} className='sc-Va12jl'>
      {children}
    </components.ValueContainer>
  );
}

export default DropDownValueContainer;

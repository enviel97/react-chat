interface DropdownActionOptions {
  value: UserStatus;
}

interface DropdownActionProps {
  defaultValue: UserStatus;
  onSelectedOption: (selected: UserStatus) => void;
}

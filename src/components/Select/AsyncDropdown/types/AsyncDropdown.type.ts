import { DropdownIndicatorProps, GroupBase, OptionProps } from "react-select";

export type AsyncDropdownOption<T> = OptionProps<
  Option<T>,
  true,
  GroupBase<Option<T>>
>;

export type AsyncDropdownIcon<T extends Object> = DropdownIndicatorProps<
  Option<T>
>;

import { ComponentType } from "react";
import { DropdownIndicatorProps, GroupBase, OptionProps } from "react-select";

export type AsyncDropdownOption<T> = OptionProps<
  Option<T>,
  true,
  GroupBase<Option<T>>
>;

export type AsyncDropdownIcon<T extends Object> = DropdownIndicatorProps<
  Option<T>
>;

export type CustomOptionProps<T> = ComponentType<
  OptionProps<Option<T>, true, GroupBase<Option<T>>>
>;

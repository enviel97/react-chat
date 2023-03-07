import { ComponentType } from "react";
import {
  DropdownIndicatorProps,
  GroupBase,
  OptionProps,
  ValueContainerProps,
} from "react-select";
import Select from "react-select/dist/declarations/src/Select";

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

export type AsyncDropdownValueContainer<T> = ValueContainerProps<
  Option<T>,
  true,
  GroupBase<Option<T>>
>;

export type AsyncDropdownRef<T> = Select<
  Option<T>,
  true,
  GroupBase<Option<any>>
>;

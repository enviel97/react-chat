import styled, { DefaultTheme } from "styled-components";
import Select from "react-select/async";
import { colorBrightness } from "@theme/helper/tools";
import {
  CSSObjectWithLabel,
  GroupBase,
  OptionProps,
  ControlProps,
} from "react-select";

export const AsyncSelect = styled(Select<Option<any>, true>)`
  width: 100%;
  border-radius: 20px;
`;

const AsyncDropdownValueContainer =
  (theme: DefaultTheme) =>
  (base: CSSObjectWithLabel): CSSObjectWithLabel => {
    return {
      ...base,
      flexWrap: "nowrap",
      whiteSpace: "nowrap",
      overflow: "auto",
      minHeight: "3em",
      maxHeight: "4.5em",
    };
  };

const AsyncDropdownController =
  (theme: DefaultTheme) =>
  (
    base: CSSObjectWithLabel,
    state: ControlProps<Option<User>, true, GroupBase<Option<User>>>
  ): CSSObjectWithLabel => {
    return {
      ...base,
      backgroundColor: theme.surfaceColor,
      border: "none",
      outline: "none",
      boxShadow: state.isFocused
        ? `0.5em 0.5em 1em 0 ${colorBrightness(theme.backgroundColor, -10)}`
        : "none",
    };
  };

const AsyncDropdownInput =
  (theme: DefaultTheme) =>
  (base: CSSObjectWithLabel): CSSObjectWithLabel => {
    return {
      ...base,
      color: theme.onSurfaceColor,
    };
  };

const AsyncDropdownMultiValue =
  (theme: DefaultTheme) =>
  (base: CSSObjectWithLabel): CSSObjectWithLabel => {
    return {
      ...base,
      flex: "none",
      backgroundColor: theme.secondaryColor,
      width: "fit-content",
    };
  };

const AsyncDropdownMultiLabel =
  (theme: DefaultTheme) => (base: CSSObjectWithLabel) => {
    return {
      ...base,
      color: theme.onSurfaceColor,
      fontWeight: "bold",
    };
  };

const AsyncDropdownOptions =
  (theme: DefaultTheme) =>
  (
    base: CSSObjectWithLabel,
    state: OptionProps<Option<User>, true, GroupBase<Option<User>>>
  ) => {
    return {
      ...base,
      backgroundColor: state.isFocused ? theme.secondaryColor : "inherit",
      color: theme.onBackgroundColor,
    };
  };

const AsyncDropdownMenu =
  (theme: DefaultTheme) => (base: CSSObjectWithLabel) => {
    return {
      ...base,
      backgroundColor: theme.surfaceColor,
      color: theme.onBackgroundColor,
      boxShadow: `0.5em 0.5em 1em 0 ${colorBrightness(
        theme.backgroundColor,
        -10
      )}`,
    };
  };

export const AsyncDropdownDecorate = (theme: DefaultTheme) => ({
  control: AsyncDropdownController(theme),
  input: AsyncDropdownInput(theme),
  multiValue: AsyncDropdownMultiValue(theme),
  multiValueLabel: AsyncDropdownMultiLabel(theme),
  option: AsyncDropdownOptions(theme),
  menu: AsyncDropdownMenu(theme),
  valueContainer: AsyncDropdownValueContainer(theme),
});

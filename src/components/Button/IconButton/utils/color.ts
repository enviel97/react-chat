import { shaddow } from "@theme/helper/styles";
import type { DefaultTheme } from "styled-components";

interface ButtonIconColorProps {
  theme: DefaultTheme;
  $color: Color;
}

export const colorButton = ({ $color }: ButtonIconColorProps) => {
  if ("palette" in $color) {
    return `var(--${$color.palette}-color)`;
  }
  if ("hex" in $color) {
    return $color.hex;
  }
  return $color.normal;
};

export const afterPartShaddow = (props: ButtonIconColorProps) => {
  const { theme } = props;
  return shaddow.boxShadow({
    options: "inset",
    color: theme.white,
    opacity: 0.09,
    x: 0,
    y: -1,
    blur: 0.1,
    spread: -0.9,
  });
};
export const containerShaddow = (props: ButtonIconColorProps) => {
  const { theme } = props;
  return shaddow.boxShadow({
    options: "inset",
    color: theme.backgroundColor,
    brightness: -50,
    x: 0.1,
    y: 0.1,
    blur: 0.4,
    spread: -0.1,
  });
};

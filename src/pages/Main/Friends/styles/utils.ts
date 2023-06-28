import { shaddow } from "@theme/helper/styles";
import type { DefaultTheme } from "styled-components";

export const cardShadow = ({ theme }: { theme: DefaultTheme }) => {
  const color = theme.backgroundColor;
  const dark = { brightness: -50, blur: 0.5, spread: -0.05, x: 0.25, y: 0.25 };
  const light = {
    brightness: 10,
    blur: 0.2,
    spread: -0.1,
    x: -0.25,
    y: -0.25,
  };
  return shaddow.boxShadow(
    { ...light, color: color },
    { ...light, color: color },
    { ...dark, color: color },
    { ...dark, color: color }
  );
};

export const avatarCardShadow = ({ theme }: { theme: DefaultTheme }) => {
  const color = theme.backgroundColor;
  const dark = {
    brightness: -50,
    blur: 0.5,
    spread: -0.05,
    x: 0.25,
    y: 0.25,
  };
  const light = {
    brightness: 10,
    blur: 0.2,
    spread: -0.05,
    x: -0.15,
    y: -0.15,
  };
  return shaddow.boxShadow(
    { ...light, color: color, options: "inset" },
    { ...light, color: color, options: "inset" },
    { ...dark, color: color, options: "inset" },
    { ...dark, color: color, options: "inset" }
  );
};

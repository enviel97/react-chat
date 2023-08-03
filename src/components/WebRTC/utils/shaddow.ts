import { shaddow } from "@theme/helper/styles";
import type { DefaultTheme, ThemeProps } from "styled-components";

export const IconButtonContainerShaddow = (props: ThemeProps<DefaultTheme>) => {
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

export const IconButtonAfterShaddow = (props: ThemeProps<DefaultTheme>) => {
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

export const CallNotificationContainerShadow = ({
  theme,
}: ThemeProps<DefaultTheme>) => {
  const color = { color: theme.backgroundColor, blur: 0.5, spread: -0.1 };
  return shaddow.boxShadow(
    { ...color, brightness: 5, x: -0.25, y: -0.25 },
    { ...color, brightness: -50, x: 0.25, y: 0.25 }
  );
};

export const CallAvatarContainerShadow = ({
  theme,
}: ThemeProps<DefaultTheme>) => {
  return shaddow.boxShadow({
    color: theme.backgroundColor,
    brightness: -50,
    x: 0.25,
    y: 0.25,
    blur: 1,
    spread: -0.1,
  });
};

import { DefaultTheme } from "styled-components";

/**
 * Tool
 * https://pinetools.com/lighten-color - dark light color
 * https://colorate.azurewebsites.net/Color/FFB2B2 - palette color
 */

interface Palette {
  light: DefaultTheme;
  dark: DefaultTheme;
}

declare module "styled-components" {
  interface DefaultTheme {
    themeMode: ThemeMode;
    black: string;
    white: string;
    disableColor: string;
    errorColor: string;
    successColor: string;
    warningColor: string;

    primaryColor: string;
    onPrimaryColor: string;

    secondaryColor: string;
    onSecondaryColor: string;

    backgroundColor: string;
    surfaceColor: string;
    onBackgroundColor: string;

    tertiaryColor: string;
  }
}

const _paletteColor = {
  black: "#000000",
  white: "#ffffff",
  primaryColor: "#c1a01a",
  onPrimaryColor: "#efefef",
  secondaryColor: "#832611",
  onSecondaryColor: "#efefef",
  disableColor: "#8f8f8f",
  tertiaryColor: "#b75c9e",

  errorColor: "#ff0000",
  successColor: "#B1FA8E",
  warningColor: "#FCF98B",
};

export const palette: Palette = {
  dark: {
    themeMode: "dark",
    backgroundColor: "#121212",
    surfaceColor: "#212121",
    onBackgroundColor: "#d6d6d6",
    ..._paletteColor,
  },
  light: {
    themeMode: "light",
    backgroundColor: "#eeeeee",
    surfaceColor: "#dedede",
    onBackgroundColor: "#121212",
    ..._paletteColor,
  },
};

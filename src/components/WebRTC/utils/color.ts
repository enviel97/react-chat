import type { DefaultTheme, ThemeProps } from "styled-components";
interface IconColorProps extends ThemeProps<DefaultTheme> {
  $type: ButtonType;
}
export const IconActionColor = (props: IconColorProps) => {
  const { $type, theme } = props;
  switch ($type) {
    case "Phone": {
      return "#09b617";
    }
    case "PhoneOff": {
      return theme.notificationColor;
    }
  }
};

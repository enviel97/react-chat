import { ThemeModeContext } from "@theme";
import { useContext } from "react";

const useThemeMode = () => {
  const themeModeContext = ThemeModeContext;
  const { themeMode, changeThemeMode } = useContext(themeModeContext);
  return {
    isDark: themeMode === "dark",
    event: {
      changeThemeMode,
      toggle: () => changeThemeMode(themeMode === "dark" ? "light" : "dark"),
    },
  };
};

export default useThemeMode;

import { createContext, useState } from "react";
import { ThemeProvider as StyledTheme } from "styled-components";
import GlobalStyle from "./styles/global.styles";
import { palette } from "./helper/palette";
import SwiperGlobalStyles from "./styles/swiper.styles";
import "normalize.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-lazy-load-image-component/src/effects/blur.css";

const initTheme: ThemeMode = "dark";

export const ThemeModeContext = createContext<ThemeContextProps>({
  themeMode: initTheme,
  changeThemeMode: (mode: ThemeMode) => {},
});

const ThemeProvider = ({ children }: Components) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(initTheme);

  return (
    <ThemeModeContext.Provider
      value={{
        themeMode: themeMode,
        changeThemeMode: setThemeMode,
      }}
    >
      <StyledTheme theme={palette[themeMode]}>
        <GlobalStyle />
        <SwiperGlobalStyles />
        {children}
      </StyledTheme>
    </ThemeModeContext.Provider>
  );
};

export default ThemeProvider;

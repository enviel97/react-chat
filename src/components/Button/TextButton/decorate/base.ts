import { colorBrightness, colorTheme } from "@theme/helper/tools";
import string from "@utils/string";
import styled, { css } from "styled-components";

export const Base = styled.div<{
  color?: string;
  textColor?: string;
  height?: string;
  width?: string;
  highlightColor?: string;
}>`
  ${({ width = "100%", height = "1.15em" }) => css`
    width: ${width};
    height: ${height};
  `}
  & button {
    padding: 0.2em 1em;
    height: 100%;
    width: 100%;
    border-radius: 0.3em;
    border: none;
    outline: none;
    font-size: clamp(0.8em, 0.072em + 0.8724svw, 1em);
    background-color: ${({ color, theme }) => colorTheme({ color, theme })};
    color: ${({ textColor, color, theme }) =>
      textColor ??
      colorTheme({
        color: `on${string.toCapitalize(color ?? "background")}`,
        theme,
      })};
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
    ${({ color, theme, highlightColor }) => {
      const mainColor = colorTheme({ color: highlightColor ?? color, theme });
      return css`
        border: 2px solid ${colorBrightness(mainColor, -2)};
        box-shadow: 0.3em 0.3em 0.4em ${colorBrightness(mainColor, -10)}80;
        &:hover {
          scale: 1.05;
          background-color: ${`${mainColor}80`};
          border: 2px solid ${`${mainColor}80`};
        }
        &:focus {
          border: 2px solid ${colorBrightness(mainColor, 10)};
        }

        &:active {
          scale: 0.98;
          background-color: ${`${mainColor}80`};
        }
      `;
    }}
  }
`;

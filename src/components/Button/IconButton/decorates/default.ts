import { colorBrightness, colorTheme } from "@theme/helper/tools";
import styled, { css } from "styled-components";

interface ButtonIconProps {
  textColor?: string;
  size?: string;
  color?: string;
  circle?: boolean;
  isTransparent?: boolean;
  width?: string;
}

export const ButtonIconDecorate = styled.div<ButtonIconProps>`
  position: relative;
  height: ${({ size }) => size ?? "2rem"};
  ${({ width }) => {
    if (width)
      return css`
        width: ${width};
      `;
    return css`
      aspect-ratio: 1 / 1;
    `;
  }}

  cursor: pointer;
  color: ${({ textColor, theme }) =>
    colorTheme({ color: `${textColor ?? "onPrimary"}`, theme })};
  border-radius: ${({ circle }) => (circle ? "50%" : "0")};

  & button {
    position: relative;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;

    ${({ theme, color, isTransparent, circle }) => {
      if (isTransparent)
        return css`
          background: transparent;
        `;
      const _color = colorTheme({ color, theme });
      const _disable = theme.disableColor;
      if (circle) {
        return css`
          border-radius: 50%;
          background: linear-gradient(
            -45deg,
            ${colorBrightness(_color, -5)} 75%,
            #ffffff
          );
          &:active:enabled {
            background: linear-gradient(
              135deg,
              ${colorBrightness(_color, -5)} 85%,
              #ffffff
            );
          }
          &:disabled {
            box-shadow: none;
            color: ${_disable};
            background: ${colorBrightness(_color, -50)};
            pointer-events: none;
          }
        `;
      }
      return css`
        border-radius: 20px;
        background: linear-gradient(
          0deg,
          ${_color} 68%,
          ${colorBrightness(_color, 20)} 100%
        );
        border: 2px solid ${_color};
        box-shadow: 0 0 10px ${colorBrightness(_color, -20)},
          0 0 11px ${colorBrightness(_color, -20)},
          0 0 12px ${colorBrightness(_color, -20)};

        transition: background 1s ease-in-out, border 100ms ease-in-out;
        &:disabled {
          box-shadow: none;
          color: ${_disable};
          pointer-events: none;
          border: 2px solid ${colorBrightness(_color, 20)}80;
          background: ${colorBrightness(_color, -20)};
        }
        &:active:enabled {
          background: linear-gradient(
            0deg,
            ${colorBrightness(_color, -20)} 98%,
            ${colorBrightness(_color, 20)} 100%
          );
          box-shadow: inset 0 0 10px ${colorBrightness(_color, -20)},
            inset 0 0 11px ${colorBrightness(_color, -20)},
            inset 0 0 12px ${colorBrightness(_color, 20)};
        }
      `;
    }};

    & span {
      text-transform: capitalize;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      & > svg {
        height: 1.5rem;
        aspect-ratio: 1 / 1;
      }
    }
  }
`;

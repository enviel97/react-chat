import { colorBrightness, colorTheme } from "@common/helper/tools";
import styled from "styled-components";

interface ButtonIconProps {
  textColor?: string;
  size?: string;
  color?: string;
  circle?: boolean;
}

export const ButtonIconDecorate = styled.div<ButtonIconProps>`
  position: relative;
  width: ${({ size }) => size ?? "fit-content"};

  cursor: pointer;
  aspect-ratio: 1 / 1;
  color: ${({ textColor, theme }) =>
    colorTheme({ color: `${textColor ?? "onPrimary"}`, theme })};
  border-radius: ${({ circle }) => (circle ? "50%" : "0")};

  & button {
    position: relative;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      -45deg,
      ${({ theme, color }) => colorBrightness(colorTheme({ color, theme }), -5)}
        75%,
      #ffffff
    );

    border-radius: ${({ circle }) => (circle ? "50%" : "0")};
    border: none;
    outline: none;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    & svg {
      aspect-ratio: 1 / 1;
      height: 1.5rem;
    }

    &:hover {
      & span {
        font-size: 110%;
      }
    }

    &:disabled {
      box-shadow: none;
      background-color: ${({ theme }) => theme.disableColor}20;
    }

    &:active:enabled {
      background: linear-gradient(
        135deg,
        ${({ theme, color }) =>
            colorBrightness(colorTheme({ color, theme }), -5)}
          85%,
        #ffffff
      );
      & span {
        font-size: 90%;
      }
    }
  }
`;

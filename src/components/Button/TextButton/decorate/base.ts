import { colorBrightness } from "@common/helper/tools";
import styled from "styled-components";

export const Base = styled.div<{
  color?: string;
  textColor?: string;
  height?: string;
  width?: string;
}>`
  ${({ width = "100%", height = "3.375rem" }) => ({ width, height })}
  & button {
    padding: 0.2rem 1rem;
    height: 100%;
    width: 100%;
    border-radius: 0.3em;
    border: none;
    outline: none;
    font-size: 1em;
    background-color: ${(props) => props.color ?? props.theme.secondaryColor};
    color: ${(props) => props.textColor ?? props.theme.onSecondaryColor};
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    border: 2px solid
      ${({ color, theme }) =>
        colorBrightness(color ?? theme.secondaryColor, -2)};
    box-shadow: 0.3em 0.3em 0.4em
      ${({ color, theme }) =>
        colorBrightness(color ?? theme.secondaryColor, -10)}80;

    &:hover {
      background-color: ${({ color, theme }) =>
        colorBrightness(color ?? theme.secondaryColor, 10)};
    }

    &:focus {
      border: 2px solid
        ${({ color, theme }) =>
          colorBrightness(color ?? theme.secondaryColor, 10)};
    }

    &:active {
      font-size: 98%;
      background-color: ${({ color, theme }) =>
        colorBrightness(color ?? theme.secondaryColor, -10)};
    }
  }
`;

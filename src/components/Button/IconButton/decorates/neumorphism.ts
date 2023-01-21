import {
  neumorphismBoxShadow,
  neumorphismBoxShadowInset,
} from "@common/helper/tools";
import styled from "styled-components";

export const Neumorphism = styled.div<{
  textColor?: string;
  size?: string;
  color?: string;
}>`
  width: ${({ size }) => size ?? "fit-content"};
  aspect-ratio: 1 / 1;
  color: ${({ textColor, theme }) => textColor ?? theme.onBackgroundColor};

  & button {
    position: relative;
    height: 100%;
    width: 100%;
    cursor: pointer;
    background-color: ${({ theme }) => theme.backgroundColor};
    border: 1px solid ${({ theme }) => theme.backgroundColor}50;

    outline: none;
    font-weight: bold;
    box-shadow: ${({ theme }) =>
      neumorphismBoxShadow(true, {
        background: theme.backgroundColor,
        x: 6,
      })};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;

    &:disabled {
      box-shadow: none;
      background-color: ${({ theme }) => theme.disableColor}20;
    }

    &:active:enabled {
      & span {
        font-size: 70%;
      }
      box-shadow: ${({ theme }) =>
        neumorphismBoxShadowInset(true, {
          background: theme.backgroundColor,
          x: 2,
        })};
    }
  }
`;

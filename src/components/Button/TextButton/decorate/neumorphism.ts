import {
  neumorphismBoxShadow,
  neumorphismBoxShadowInset,
} from "@common/helper/tools";
import styled from "styled-components";

export const Neumorphism = styled.div<{
  textColor?: string;
  height?: string;
  width?: string;
  color?: string;
}>`
  width: ${({ width }) => width ?? "fit-content"};
  height: ${({ height }) => height ?? "2.125rem"};

  & button {
    position: relative;
    height: 100%;
    width: 100%;
    cursor: pointer;
    padding: 0.4rem 1rem;
    border-radius: 5em;
    background-color: ${(props) => props.theme.backgroundColor};

    border: 1px solid ${(props) => props.theme.backgroundColor}50;

    display: flex;
    align-items: center;
    justify-content: center;

    outline: none;
    font-weight: bold;
    box-shadow: ${neumorphismBoxShadow(true, {
      x: 8,
    })};

    & span {
      color: ${(props) => props.textColor ?? props.theme.secondaryColor};
      -webkit-text-stroke: 1px
        ${(props) => props.textColor ?? props.theme.secondaryColor}25;
    }
    &:disabled {
      box-shadow: none;
      background-color: ${({ theme }) => theme.disableColor}20;
    }

    &:active:enabled {
      & span {
        font-size: 70%;
      }
      box-shadow: ${neumorphismBoxShadowInset(true, {
        x: 2,
      })};
    }
  }
`;

import styled, { keyframes } from "styled-components";

export const blink = keyframes`
  to { background-color: transparent; }
`;

export const typing = keyframes`
  to { left: 100%; }
`;

export const LoadingText = styled.div<{ quantity: number }>`
  position: absolute;
  & h2 {
    position: relative;
    font-size: clamp(1em, 1em + 1vh, 3.125em);
    letter-spacing: 10px;
    width: max-content;
    font-weight: bold;
    text-transform: uppercase;
    font-family: "Source Code Pro", monospace;
    color: ${({ theme }) => theme.disableColor};

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    &::after {
      width: 0.125em;
      background-color: ${({ theme }) => theme.secondaryColor};
      animation: ${typing} 2s steps(${({ quantity }) => quantity}) infinite,
        ${blink} 0.4s steps(${({ quantity }) => quantity}) infinite;
    }
    &::before {
      background-color: ${({ theme }) => theme.backgroundColor};
      animation: ${typing} 2s steps(${({ quantity }) => quantity}) infinite;
    }
  }
`;

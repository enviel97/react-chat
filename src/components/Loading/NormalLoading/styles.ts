import styled, { keyframes } from "styled-components";

const loading = keyframes`
  0%, 100% {
    stroke-dashoffset: 440;
  }
  50% {
    stroke-dashoffset: 0;
  }
  50.1% {
    stroke-dashoffset: 880;
  }
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg);
  }
`;
export const LoaderContainer = styled.div<{ size: string }>`
  position: relative;
  width: ${({ size }) => size};
  aspect-ratio: 1/1;
`;

export const OutlineCircle = styled.svg`
  position: absolute;
  left: 10%;
  top: 10%;
  padding: 0.4rem;
  /* transform: translate(-25%, -25%); */
  animation: ${rotate} 2s linear infinite;

  & circle {
    width: 100%;
    height: 100px;
    fill: none;
    stroke-width: 20;
    stroke: ${({ theme }) => theme.secondaryColor};
    transform: translate(10px, 10px);
    stroke-linecap: round;
    stroke-dasharray: 440;
    stroke-dashoffset: 440;
    animation: ${loading} 4s linear infinite;
  }
`;

import { neumorphismBoxShadowInset } from "@theme/helper/tools";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

export const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(20%, 50px, 90%);
  aspect-ratio: 1 / 1;
`;

const motivation = keyframes`
  0% {
    top: 0;
    left: 0;
  }
  12.5% {
    top: 0;
    left: 50%;
  }
  25% {
    top: 0;
    left: 50%;
  }
  37.5% {
    top: 50%;
    left: 50%;
  }
  50% {
    top: 50%;
    left: 50%;
  }
  62.5% {
    top: 50%;
    left: 0;
  }
  75% {
    top: 50%;
    left: 0;
  }
  87.5% {
    top: 0;
    left: 0;
  }
  100% {
    top: 0;
    left: 0;
  }
`;

export const Cube = styled(motion.span)<{ "data-target": number }>`
  position: absolute;
  width: 30%;
  height: 30%;
  color: ${(props) => {
    if (props["data-target"] === 0) return props.theme.secondaryColor;
    if (props["data-target"] === 1) return props.theme.tertiaryColor;
    return props.theme.primaryColor;
  }};
  background-color: currentColor;
  box-shadow: ${({ theme }) =>
    neumorphismBoxShadowInset(true, { background: theme.surfaceColor })};
  border-radius: 10px;
  padding: 1rem;
  animation: ${motivation} 2s ease infinite;
  animation-delay: ${(props) => (props["data-target"] * -2) / 3}s;
`;

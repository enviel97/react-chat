import { motion, MotionProps } from "framer-motion";
import styled from "styled-components";
import {
  afterPartShaddow,
  colorButton,
  containerShaddow,
} from "../utils/color";
interface ContainerStyleProps {
  $size: string;
  $color: Color;
}

type Animation = (disabled: boolean) => {
  container: MotionProps;
  icon: MotionProps;
};

export const IconBox = styled(motion.div)`
  position: relative;
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  color: var(--white);
  & svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const ButtonCircleContainer = styled(motion.button)<ContainerStyleProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ $size }) => $size};
  aspect-ratio: 1/1;
  border-radius: 50%;
  padding: 2.5px;
  cursor: pointer;
  color: ${colorButton};
  box-shadow: ${containerShaddow};
  background-color: currentColor;
  outline: none;
  border: 0.5px solid currentColor;

  &:disabled {
    background-color: currentColor;
    opacity: 0.25;
    border: none;
    &::before {
      opacity: 0.25;
    }
    & ${IconBox} {
      color: var(--disable-color);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 0.1em;
    width: 100%;
    height: 48%;
    transform: scaleX(0.83);
    border-radius: 50%/ 59% 59% 41% 41%;
    opacity: 0.95;
    background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.1)
    );
  }

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    height: 100%;
    width: 100%;
    border-radius: 50%;
    box-shadow: ${afterPartShaddow};
  }
`;

export const ButtonIconCircleAnimate: Animation = (disabled) => {
  if (disabled) {
    return { container: {}, icon: {} };
  }
  return {
    container: {
      variants: {
        hover: {
          filter: "brightness(120%)",
        },
        tap: {
          filter: "brightness(90%)",
          transition: { duration: 0 },
        },
      },
      transition: { bounce: 0 },
      whileHover: "hover",
      whileTap: "tap",
    },
    icon: {
      variants: {
        hover: { scale: 1.1 },
        tap: { scale: 0.98 },
      },
      transition: { duration: 0, bounce: 0 },
    },
  };
};

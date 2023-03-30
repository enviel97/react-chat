import { AnimatePresence, motion, Variants } from "framer-motion";
import { FC } from "react";
import styled, { css } from "styled-components";

interface Decorate {
  $top?: number | string;
  $left?: number | string;
  $right?: number | string;
  $bottom?: number | string;
  $height?: number | string;
  $width?: number | string;
}

interface Props extends Components {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  height?: number | string;
  width?: number | string;
}

const Container = styled(motion.div)<Decorate>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  ${({
    $right = 0,
    $bottom = 0,
    $top = "auto",
    $left = "auto",
    $height = "20svh",
    $width = "10svw",
  }) => {
    return css`
      top: ${$top};
      right: ${$right};
      bottom: ${$bottom};
      left: ${$left};
      height: ${$height};
      width: ${$width};
    `;
  }}
  overflow: hidden;
  background-color: transparent;
  padding: 0;
  margin: 0;
`;

const FadedAnimation: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
  },
};

const Faded: FC<Props> = ({
  children,
  top,
  left,
  right,
  bottom,
  height,
  width,
}) => {
  return (
    <AnimatePresence mode='wait' onExitComplete={() => null}>
      <Container
        // hidden props
        $top={top}
        $right={right}
        $bottom={bottom}
        $left={left}
        $height={height}
        $width={width}
        // norma; props
        key={"FadedContainer"}
        variants={FadedAnimation}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        {children}
      </Container>
    </AnimatePresence>
  );
};

export default Faded;

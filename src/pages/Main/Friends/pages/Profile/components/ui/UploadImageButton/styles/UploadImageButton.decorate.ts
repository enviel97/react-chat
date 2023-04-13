import { motion } from "framer-motion";
import styled, { css } from "styled-components";

interface ContainerProps {
  $separateSpace?: string;
}

export const ButtonContainer = styled(motion.div)<ContainerProps>`
  position: absolute;

  z-index: 2;
  cursor: pointer;
  opacity: 0.5;

  ${({ $separateSpace }) => {
    const space = $separateSpace ?? "2rem";
    return css`
      right: ${space};
      bottom: ${space};
    `;
  }}
`;

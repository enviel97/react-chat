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
  ${({ theme }) => {
    const color = theme.backgroundColor;
    return css`
      filter: drop-shadow(0px 0px 1px ${color})
        drop-shadow(0px 0px 2px ${color}) drop-shadow(0px 0px 3px ${color});
    `;
  }}

  ${({ $separateSpace }) => {
    const space = $separateSpace ?? "2rem";
    return css`
      right: ${space};
      bottom: ${space};
    `;
  }}
`;

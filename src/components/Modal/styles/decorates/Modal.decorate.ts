import { neumorphismBoxShadow } from "@common/helper/tools";
import { motion } from "framer-motion";
import styled from "styled-components";

export const ModalContainer = styled(motion.div)<{
  height: string;
  width: string;
}>`
  position: relative;
  width: ${({ width }) => `min(90%, ${width})`};
  height: ${({ height }) => `clamp(20%, ${height} + 1vh, 90%)`};
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.backgroundColor};
  box-shadow: ${({ theme }) => {
    return neumorphismBoxShadow(true, { background: theme.backgroundColor });
  }};
`;

export const CloseButtonContainer = styled.div`
  position: absolute;
  right: 1em;
  top: 1rem;
  z-index: 100;
`;

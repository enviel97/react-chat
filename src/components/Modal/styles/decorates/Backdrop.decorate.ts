import { zIndex } from "@core/common/zIndex.define";
import { motion } from "framer-motion";
import styled from "styled-components";

export const BackdropContainer = styled(motion.div)<BackdropDecorate>`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: ${({ overlayColor, theme }) =>
    overlayColor ?? theme.backgroundColor}aa;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${zIndex.BaseModalBackdrop};
`;

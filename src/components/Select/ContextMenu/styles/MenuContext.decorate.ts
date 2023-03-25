import { zIndex } from "@common/zIndex.define";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";
type TypeDecorate = ContextMenuContainerProps & { top: number; left: number };

export const MenuContextContainer = styled(motion.ul)<TypeDecorate>`
  position: fixed;
  background-color: ${({ theme }) => `${theme.surfaceColor}ef`};
  border-radius: 15px;
  height: ${({ height }) => height ?? "fit-content"};
  width: ${({ width }) => `min(50%, ${width ?? "10%"})`};
  z-index: ${zIndex.BaseModalBackdrop};
  padding: 0.5em 0em;
  border: 1px solid ${({ theme }) => `${theme.surfaceColor}ef`};
  box-shadow: 0.3em 0.5em 25px #000000ef;
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
`;

export const MenuContextTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25em;
  font-weight: bold;
  border-bottom: 2px solid ${({ theme }) => theme.backgroundColor};
`;

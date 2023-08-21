import { zIndex } from "@common/zIndex.define";
import { motion } from "framer-motion";
import styled from "styled-components";
type TypeDecorate = {
  $height?: string;
  $width?: string;
};

export const MenuContextContainer = styled(motion.ul)<TypeDecorate>`
  position: fixed;
  background-color: ${({ theme }) => `${theme.surfaceColor}ef`};
  border-radius: 10px;
  height: ${({ $height }) => $height ?? "fit-content"};
  width: ${({ $width }) => `min(50%, ${$width ?? "180px"})`};
  z-index: ${zIndex.BaseModalBackdrop};
  padding-bottom: 0.5rem;
  border: 1px solid ${({ theme }) => `${theme.surfaceColor}ef`};
  box-shadow: 0.3em 0.5em 25px #000000ef;
`;

export const MenuContextTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2em;
  font-weight: bold;
  border-bottom: 2px solid ${({ theme }) => theme.backgroundColor};
`;

export const MenuOpacity = styled.div`
  width: 100%;
  height: 100%;
`;

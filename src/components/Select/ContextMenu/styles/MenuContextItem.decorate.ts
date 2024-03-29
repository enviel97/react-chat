import { motion } from "framer-motion";
import styled from "styled-components";
type TypeDecorate = ContextMenuItemContainerProps;
export const MenuContextItemContainer = styled(motion.li)<TypeDecorate>`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  padding: 0.2em 0.5em;
  width: 100%;
  gap: 1em;
  font-size: 1em;
  background-color: transparent;
  cursor: pointer;

  & span {
    font-weight: bold;
  }
`;

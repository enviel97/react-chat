import { motion } from "framer-motion";
import styled from "styled-components";
type TypeDecorate = ContextMenuItemContainerProps;
export const MenuContextItemContainer = styled(motion.li)<TypeDecorate>`
  display: flex;
  flex-direction: row;
  padding: 0.5em 1em;
  width: 100%;
  gap: 1em;
  font-size: 1em;
  background-color: transparent;
  cursor: pointer;

  & span {
    font-weight: bold;
  }
`;

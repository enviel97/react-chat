import { motion } from "framer-motion";
import styled from "styled-components";

export const DropdownActionContainer = styled(motion.div)`
  position: relative;
  box-sizing: border-box;
  width: 15rem;
  font-size: 1rem;
  padding: 0.5rem 0.25rem;
  background-color: ${({ theme }) => theme.backgroundColor};
  border: 2px solid ${({ theme }) => theme.surfaceColor};
  border-radius: 1rem;
  pointer-events: fill;
  cursor: pointer;
`;

export const DropdownActionMenu = styled(motion.ul)`
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  padding: 0.5rem 0.25rem;
  border-radius: inherit;
  background-color: ${({ theme }) => theme.backgroundColor};

  border: 2px solid ${({ theme }) => theme.surfaceColor};
`;

export const DropdownActionMenuItem = styled(motion.li)`
  list-style: none;
  padding: 0.5rem 1rem;
  border-radius: inherit;
  cursor: pointer;
`;

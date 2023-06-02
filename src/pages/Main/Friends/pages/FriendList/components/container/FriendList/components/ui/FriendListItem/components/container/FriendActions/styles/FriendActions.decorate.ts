import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  position: absolute;
  top: 0.25em;
  right: 0.25em;

  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const Button = styled(motion.div)`
  border-radius: 0.5em;
  padding: 0.5em 0;
  cursor: pointer;
  background-color: ${({ theme }) => theme.backgroundColor}45;
`;

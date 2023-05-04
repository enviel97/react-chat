import { ButtonText } from "@components/Button";
import { motion } from "framer-motion";
import styled from "styled-components";

export const ConfirmUpdateBoxBackdrop = styled(motion.div)`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 14rem;

  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  z-index: 10;
  pointer-events: none;
`;

export const ConfirmUpdateBoxContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 2rem;
  height: 10rem;
  min-width: 30%;
  width: fit-content;
  padding: 1rem 2rem;
  border-radius: 1rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.backgroundColor};
  pointer-events: fill;
`;

export const ConfirmUpdateBoxContent = styled(motion.h5)`
  display: flex;
  padding: 0.75rem 0;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5ch;
  flex: 1;
  text-align: center;
  color: ${({ theme }) => theme.disableColor};
  width: 100%;
  & strong {
    color: white;
  }
`;

export const ConfirmUpdateBoxAction = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 1em;
`;

export const ConfirmUpdateBoxButton = styled(ButtonText)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: fit-content;
  min-width: 5em;

  & button {
    padding: 0.25rem 1rem;
    min-height: 2rem;
    width: 100%;
  }
`;

export const ConfirmUpdateBoxHeader = styled(motion.div)`
  display: flex;
  color: ${({ theme }) => theme.primaryColor};
  gap: 0.5ch;
  width: fit-content;
  padding-right: 0.5rem;
  border-bottom: 2px solid currentColor;
`;

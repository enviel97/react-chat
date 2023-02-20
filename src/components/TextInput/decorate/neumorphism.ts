import { neumorphismBoxShadow } from "@theme/helper/tools";
import { FloatingLabel } from "./base";
import styled from "styled-components";
import { motion } from "framer-motion";

export const Error = styled(motion.div)`
  position: relative;
  color: ${(props) => props.theme.errorColor};
  padding: 0 0.2rem;

  & .mess {
    position: absolute;
    bottom: 120%;
    overflow: hidden;
    right: 50%;
    font-size: 0.8em;
    color: ${({ theme }) => theme.white};
    background-color: red;
    padding: 0rem 0.4rem;
    border-radius: 5px 5px 0 5px;
    white-space: nowrap;
  }
`;

export const Neumorphism = styled(FloatingLabel)<{
  height: string;
  width: string;
}>`
  border: 1px solid #121212;
  box-shadow: ${neumorphismBoxShadow(true, {
    background: "#121212",
  })};
  & .base {
    border: none;

    & .textField[type="text"],
    & .textField[type="password"] {
      &:valid,
      &:focus,
      &:disabled {
        & ~ label {
          border: none;
          background-color: ${({ theme }) => theme.backgroundColor};
        }
      }
    }
  }
`;

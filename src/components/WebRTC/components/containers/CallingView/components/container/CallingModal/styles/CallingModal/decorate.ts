import { breakpoint } from "@theme/helper/breakpoint";
import { textMaxLine } from "@theme/helper/tools";
import { motion } from "framer-motion";
import styled from "styled-components";

export const CallingContainer = styled(motion.div)`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  gap: auto;
  border-radius: inherit;

  ${breakpoint.down("tablet")} {
    flex-direction: column;
  }
`;

export const CallingDisplayName = styled.span`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  text-align: left;
  width: 100%;
  font-size: 1.2rem;

  & b {
    color: var(--white);
    font-size: 125%;
    ${textMaxLine(2)}
  }
`;
export const CallingInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: var(--background-color);
  z-index: 1;
  color: var(--gray);

  /* Normal */
  height: 100%;
  width: 25rem;
  padding: 1em;
  box-shadow: -1em 0 1em rgba(0, 0, 0, 0.75);

  ${breakpoint.down("tablet")} {
    height: auto;
    min-height: 7em;
    width: 100%;
    box-shadow: 0 -1em 1em rgba(0, 0, 0, 0.75);
  }
`;

import { breakpoint } from "@theme/helper/breakpoint";
import { colorBrightness, textMaxLine } from "@theme/helper/tools";
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

export const CallingInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background-color: var(--background-color);
  gap: 0.5em;
  z-index: 1;

  & h6 {
    font-weight: bold;
    color: ${({ theme }) => colorBrightness(theme.gray, -20)};
    text-align: right;
    ${textMaxLine(2)}
  }
  & > span {
    font-weight: bold;
    font-size: 1.5em;
    text-align: right;
  }
  /* Normal */
  height: 100%;
  width: auto;
  padding: 1em;
  box-shadow: -1em 0 1em rgba(0, 0, 0, 0.75);

  ${breakpoint.down("tablet")} {
    height: auto;
    min-height: 10rem;
    width: 100%;
    box-shadow: 0 -1em 1em rgba(0, 0, 0, 0.75);
    & h4,
    & span {
      text-align: left;
    }
  }
`;

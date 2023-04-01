import { breakpoint } from "@theme/helper/breakpoint";
import { colorBrightness } from "@theme/helper/tools";
import { motion } from "framer-motion";
import styled from "styled-components";

export const SideBarActionContainer = styled(motion.ul)`
  display: flex;
  gap: 0.5em;
  padding: 0.5em;
  list-style-type: none;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 100%;
  height: clamp(6rem, 0.125rem + 1svh, 7%);
  box-shadow: 0 1em 1.2em -0.5em ${({ theme }) => colorBrightness(theme.backgroundColor, 5)};
  z-index: 1;
`;

export const SidebarActionItemContainer = styled(motion.li)`
  position: relative;
  margin: 0 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  height: 100%;
  width: 10%;
  ${breakpoint.down("tablet")} {
    width: 100%;
  }
`;

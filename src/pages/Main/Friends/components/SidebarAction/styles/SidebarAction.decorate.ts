import { breakpoint } from "@theme/helper/breakpoint";
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
  height: 7%;
`;

export const SidebarActionItemContainer = styled(motion.li)`
  position: relative;
  margin: 0 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  height: 100%;
  width: 10%;

  ${breakpoint.down("tablet")} {
    width: 100%;
    height: 100%;
  }
`;

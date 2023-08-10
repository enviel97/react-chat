import { zIndex } from "@common/zIndex.define";
import { CallNotificationContainerShadow } from "@components/WebRTC/utils/shaddow";
import { breakpoint } from "@theme/helper/breakpoint";
import { motion } from "framer-motion";
import styled from "styled-components";

export const CallNotificationContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 1em;
  pointer-events: auto;
  z-index: ${zIndex.onTop - 100};

  /** Big screens */
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);

  ${breakpoint.down("tablet")} {
    bottom: 0;
    top: auto;
    left: 1em;
    transform: none;
  }
`;

export const CallNotificationItem = styled(motion.div)`
  display: block;
  box-sizing: border-box;
  height: 4em;
  width: fit-content;
  gap: 1em;
  background-color: var(--background-color);
  border: 1px solid var(--background-color);
  box-shadow: ${CallNotificationContainerShadow};
  border-radius: 1rem;
`;

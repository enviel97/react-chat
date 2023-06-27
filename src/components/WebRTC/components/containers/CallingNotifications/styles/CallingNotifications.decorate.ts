import { zIndex } from "@common/zIndex.define";
import { CallNotificationContainerShadow } from "@components/WebRTC/utils/shaddow";
import { motion } from "framer-motion";
import styled from "styled-components";

export const CallNotificationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1em;
  pointer-events: auto;
  z-index: ${zIndex.onTop - 100};
`;

export const CallNotificationItem = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 4em;
  width: min(70svw, 500px);
  background-color: var(--background-color);
  border: 1px solid var(--background-color);
  box-shadow: ${CallNotificationContainerShadow};
  padding: 0.5em 1em;
  border-radius: 1rem;
`;

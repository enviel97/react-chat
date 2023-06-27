import { zIndex } from "@common/zIndex.define";
import { CallNotificationContainerShadow } from "@components/WebRTC/utils/shaddow";
import { motion } from "framer-motion";
import styled from "styled-components";

export const CallingViewOverplay = styled(motion.div)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => `${theme.backgroundColor}cc`};
  pointer-events: auto;
  z-index: ${zIndex.onTop};
`;

export const CallingViewContainer = styled(motion.div)`
  position: relative;
  height: clamp(80svh, 720px + 1svh, 90svh);
  width: clamp(70svw, 1260px + 1svh, 90svw);
  background-color: var(--background-color);
  display: block;
  box-sizing: border-box;
  padding: 1em 1em;
  box-shadow: ${CallNotificationContainerShadow};
  border: none;
  overflow: hidden;
`;

export const CallingContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  gap: 1em;
  padding: 1em;
`;

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
  pointer-events: fill;
  user-select: none;
  z-index: ${zIndex.onTop};
`;

export const CallingViewContainer = styled(motion.div)`
  position: relative;
  height: clamp(80svh, 720px + 1svw, 95svh);
  width: clamp(70svw, 1260px + 1svw, 95svw);
  aspect-ratio: 400 / 240;
  background-color: var(--background-color);
  display: block;
  box-sizing: border-box;
  border: none;
  overflow: hidden;
  pointer-events: auto;
  border-radius: 20px;
  box-shadow: ${CallNotificationContainerShadow};
`;

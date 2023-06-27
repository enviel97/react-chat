import {
  IconButtonAfterShaddow,
  IconButtonContainerShaddow,
} from "@components/WebRTC/utils/shaddow";
import { motion } from "framer-motion";
import styled from "styled-components";

export const IconButtonContainer = styled(motion.div)<IconButtonDecorate>`
  position: relative;
  height: 80%;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $type }) => {
    switch ($type) {
      case "Answer":
        return "#09b617";
      case "Stop":
        return `${theme.notificationColor}`;
      default:
        return `${theme.surfaceColor}`;
    }
  }};
  box-shadow: ${IconButtonContainerShaddow};
  border-radius: 50%;
  cursor: pointer;
  background-color: currentColor;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 0.2em;
    width: 100%;
    height: 50%;
    transform: scaleX(0.83);
    border-radius: 50%/ 59% 59% 41% 41%;
    background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.1)
    );
  }

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    height: 100%;
    width: 100%;
    border-radius: 50%;
    box-shadow: ${IconButtonAfterShaddow};
  }
`;

export const IconRingWave = styled(motion.div)`
  position: absolute;
  opacity: 0.5;
  border: solid currentColor;
  border-radius: 50%;
  height: 100%;
  width: 100%;
  z-index: -100;
`;

export const IconBox = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

import { motion, MotionProps } from "framer-motion";
import styled from "styled-components";

export const SvgIconContainer = styled.div`
  position: relative;
  height: 2.5em;
  width: 2.5em;
`;

export const NotificationContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0.5em;
`;

export const IconContainer = styled(motion.div)`
  background-color: ${({ theme }) => `${theme.backgroundColor}40`};
  border-radius: 50%;
`;

export const Animation: MotionProps = {
  variants: {
    visible: (i) => ({ opacity: 1, scale: 1, transition: { delay: 0.5 * i } }),
    hidden: { opacity: 0, scale: 0 },
  },
  transition: { duration: 0.5 },
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
};

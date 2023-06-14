import { motion, MotionProps } from "framer-motion";
import styled from "styled-components";

const Tooltip = styled(motion.div)`
  padding: 0.5rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => `${theme.backgroundColor}aa`};
  border-radius: inherit;
  pointer-events: none;
`;
const Container = styled.span`
  gap: 0.5ch;

  display: block;
  max-width: 100%;
  width: fit-content;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  & > span {
    font-weight: 300;
    font-size: 0.7em;
  }

  & > strong {
    margin-left: 0.5ch;
    font-weight: bold;
    font-size: 0.8em;
  }
`;

const Group = styled.div`
  display: flex;
  gap: 0.5ch;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-weight: 300;
`;

const Animation = Object.freeze<MotionProps>({
  variants: {
    visible: { scale: 1, opacity: 1 },
    hidden: { scale: 0, opacity: 0 },
  },
  transition: {
    duration: 0.25,
  },
  style: { originY: "bottom" },
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
});

// eslint-disable-next-line
export default {
  Tooltip,
  Container,
  Group,
  Animation,
};

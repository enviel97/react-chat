import { motion, MotionProps } from "framer-motion";
import styled from "styled-components";

export const UploadImageProfile = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  & > span {
    font-size: 1.2rem;
    & > strong {
      margin-right: 1ch;
    }
  }
  & > span:nth-of-type(1) {
  }
`;

export const UploadImageProfileMotions: MotionProps = {
  variants: {
    expanded: {
      y: 0,
      height: "auto",
      opacity: 1,
    },
    collapse: {
      y: "50%",
      height: 0,
      opacity: 0,
    },
  },
  transition: { duration: 0.2, ease: "easeOut" },
  initial: "collapse",
  animate: "expanded",
  exit: "collapse",
};

import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const ArrowPath = styled(motion.path).attrs({
  d: `
    M518.3 459a8 8 0 0 0-12.6 0l-112 141.7a7.98 7.98 0 0 0 
    6.3 12.9h73.9V856c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 
    8-8V613.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 459z
  `,
})``;

const Arrow = () => {
  return (
    <AnimatePresence>
      <ArrowPath
        style={{
          originY: 0,
        }}
        variants={{
          fadeIn: {
            y: "-50%",
            scale: [0, 1, 0],
          },
          fadeOut: {
            y: "0",
            scale: [1, 0, 1],
          },
        }}
        animate='fadeIn'
        initial='fadeOut'
        transition={{
          duration: 1,
          damping: 50,
          stiffness: 400,
          repeat: Infinity,
          repeatDelay: 1,
          repeatType: "loop",
        }}
      />
    </AnimatePresence>
  );
};

export default Arrow;

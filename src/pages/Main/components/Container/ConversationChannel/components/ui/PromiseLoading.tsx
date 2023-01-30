import { AnimatePresence } from "framer-motion";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

interface PromiseLoadingProps {
  promise: () => Promise<void>;
}

const IconCheck = styled(motion.svg)`
  fill: transparent;
  transition: 0.4s;
`;

const PromiseLoadingContainer = styled(motion.div)`
  position: absolute;
  height: 1em;
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 0.5em;
  border: 0.2em solid currentColor;
  border-radius: 50%;
  color: ${({ theme }) => theme.disableColor};

  right: -1em;
  bottom: -0.5em;
`;

const containerVariants = {
  initial: {
    backgroundColor: "transparent",
    borderColor: "currentColor",
  },
  loading: {
    rotate: 1080,
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderLeftColor: "currentColor",
    transition: {
      repeat: Infinity,
      duration: 2,
    },
  },
  success: {
    backgroundColor: "currentColor",
  },
};

const iconVariants = {
  loading: {
    fill: "transparent",
  },
  success: {
    fill: "#121212",
  },
};

const PromiseLoading: FC<PromiseLoadingProps> = () => {
  const [isLoading, _] = useState<boolean>();

  return (
    <AnimatePresence>
      <PromiseLoadingContainer
        variants={containerVariants}
        animate={
          isLoading === undefined
            ? "initial"
            : isLoading
            ? "loading"
            : "success"
        }
      >
        <IconCheck
          variants={iconVariants}
          transition={{ duration: 0.2 }}
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path d='M0 11c2.761.575 6.312 1.688 9 3.438 3.157-4.23 8.828-8.187 15-11.438-5.861 5.775-10.711 12.328-14 18.917-2.651-3.766-5.547-7.271-10-10.917z' />
        </IconCheck>
      </PromiseLoadingContainer>
    </AnimatePresence>
  );
};

export default PromiseLoading;

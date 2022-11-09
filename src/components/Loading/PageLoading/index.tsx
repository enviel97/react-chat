import { AnimatePresence, motion } from "framer-motion";
import { Loader, LoaderContainer, rotate } from "./styles";

const PageLoading = () => {
  return (
    <LoaderContainer>
      <Loader>
        <AnimatePresence mode='wait'>
          <motion.i
            variants={rotate}
            initial='initial'
            exit='initial'
            animate='animate'
            transition={{
              repeatType: "loop",
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
          />
        </AnimatePresence>
      </Loader>
    </LoaderContainer>
  );
};

export default PageLoading;

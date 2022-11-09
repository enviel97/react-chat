import { AnimatePresence, motion } from "framer-motion";
import { Neumorphism, Error } from "../decorate/neumorphism";
import BaseTextField from "./base";
import { TbInfoCircle } from "react-icons/tb";
import { memo } from "react";
import NormalLoading from "@components/Loading/NormalLoading";

const variants = {
  in: {
    width: "fit-content",
    opacity: [0, 0.6, 0.8, 1],
    transition: {
      duration: 2,
    },
  },
  out: {
    width: "0",
    opacity: [1, 0.4, 0.2, 0],
    transition: {
      duration: 2,
    },
  },
};

interface TextFieldNeumorphismProps extends TextFieldProps {
  showLoading?: boolean;
}

const TextFieldNeumorphism = (props: TextFieldNeumorphismProps) => {
  const {
    height = "fit-content",
    width = "100%",
    className,
    label,
    errorMess,
    showLoading,
    ...prop
  } = props;
  const identity = label ?? props.register?.name ?? "Label";
  return (
    <Neumorphism className={className} height={height} width={width}>
      <AnimatePresence mode='wait'>
        {showLoading && (
          <motion.div
            key={"motivation"}
            variants={variants}
            initial='outTop'
            animate='in'
            exit='outTop'
          >
            <NormalLoading />
          </motion.div>
        )}
      </AnimatePresence>
      <BaseTextField className='base' label={label} {...prop} />

      <AnimatePresence>
        {errorMess && (
          <Error
            role='alert'
            variants={{
              in: { x: 0, y: 0, opacity: 1 },
              out: { x: 0, y: 0, opacity: 0 },
            }}
            initial='out'
            animate='in'
            exit='out'
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
          >
            <TbInfoCircle key={`${identity}-ico`} strokeWidth={"2px"} />
            <small key={`${identity}-notice`} className='mess'>
              {errorMess}
            </small>
          </Error>
        )}
      </AnimatePresence>
    </Neumorphism>
  );
};

export default memo(TextFieldNeumorphism);

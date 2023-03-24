import { Variants } from "framer-motion";

const normalColor = "#8f8f8f";
const backgroundColor = "#121212";
const errorColor = "#f40000";
const successColor = "#41e269";

const containerVariants: Variants = {
  initial: {
    borderColor: backgroundColor,
    backgroundColor: backgroundColor,
  },
  loading: {
    rotate: 1080,
    borderLeftColor: normalColor,
    transition: {
      repeat: Infinity,
      duration: 2,
    },
  },
  error: {
    borderColor: errorColor,
    backgroundColor: errorColor,
    borderLeftColor: errorColor,
  },
  success: {
    borderColor: successColor,
    backgroundColor: successColor,
    borderLeftColor: successColor,
  },
};
export default containerVariants;

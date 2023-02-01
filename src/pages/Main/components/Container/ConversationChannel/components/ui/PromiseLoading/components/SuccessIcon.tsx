import { motion } from "framer-motion";
import iconVariants from "../variants/icon.variant";

const SuccessIcon = () => {
  return (
    <motion.svg
      variants={iconVariants}
      transition={{ duration: 0.2 }}
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      version='1.1'
      id='Calque_1'
      x='0px'
      y='0px'
      viewBox='0 0 45 45'
      enableBackground='new 0 0 45 45'
      xmlSpace='preserve'
    >
      <path d='M1.36,17.427c0,0,7.311-0.122,10.844,8.163c0,0,15.474-22.175,31.435-18.885c0,0-17.789,7.067-32.045,31.922L1.36,17.427z' />
    </motion.svg>
  );
};
export default SuccessIcon;

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Icon from "./Icon";

const IconSwap = () => {
  const [active, setActive] = useState<boolean>(false);
  return <AnimatePresence></AnimatePresence>;
};

export default IconSwap;

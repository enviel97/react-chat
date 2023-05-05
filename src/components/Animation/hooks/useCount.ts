import {
  animate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

interface UseCountProps {
  quantity?: number;
  duration?: number;
}
const useCount = ({ quantity, duration = 0.8 }: UseCountProps) => {
  const count = useMotionValue(0);
  const xSmooth = useSpring(count, { damping: 50, stiffness: 400 });
  const rounded = useTransform(xSmooth, (cv) => Math.min(Math.round(cv), 100));

  useEffect(() => {
    if (!quantity) return;
    const controller = animate(xSmooth, quantity, { duration });
    return controller.stop;
  }, [quantity, xSmooth]);

  return {
    count: rounded,
  };
};

export default useCount;

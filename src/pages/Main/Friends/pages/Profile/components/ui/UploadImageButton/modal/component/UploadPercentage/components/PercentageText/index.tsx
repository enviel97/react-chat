import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { FC, useEffect } from "react";
import { UploadProgressBarText } from "../../styles/UploadPercentage.decorate";
interface PercentageProps {
  percentage?: number;
  state?: ProgressState;
}

const Percentage: FC<PercentageProps> = ({ percentage, state }) => {
  const count = useMotionValue(0);
  const xSmooth = useSpring(count, { damping: 50, stiffness: 400 });
  const rounded = useTransform(xSmooth, (cv) => Math.min(Math.round(cv), 100));

  useEffect(() => {
    if (!percentage) return;
    const controller = animate(xSmooth, percentage, { duration: 0.8 });
    return controller.stop;
  }, [percentage, xSmooth, state]);

  return (
    <UploadProgressBarText>
      <AnimatePresence>
        {!percentage && <span>CONNECTED</span>}
        {percentage && state !== "error" && (
          <span>
            <motion.span>{rounded}</motion.span>
            <span>%</span>
          </span>
        )}
        {state === "error" && <span>ERROR</span>}
      </AnimatePresence>
    </UploadProgressBarText>
  );
};

export default Percentage;

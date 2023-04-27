import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { FC, useEffect } from "react";
import { ImpulseSpinner } from "react-spinners-kit";
import { UploadProgressBarText } from "../../styles/UploadPercentage.decorate";
interface PercentageProps {
  percentage?: number;
}

const Percentage: FC<PercentageProps> = ({ percentage }) => {
  const count = useMotionValue(0);
  const xSmooth = useSpring(count, { damping: 50, stiffness: 400 });
  const rounded = useTransform(xSmooth, (cv) => Math.min(Math.round(cv), 100));

  useEffect(() => {
    if (!percentage) return;
    const controller = animate(xSmooth, percentage, { duration: 0.8 });
    return controller.stop;
  }, [percentage, xSmooth]);

  return (
    <UploadProgressBarText>
      {!percentage && (
        <span>
          CONNECTED
          <ImpulseSpinner size={30} frontColor='currentColor' />
        </span>
      )}
      {percentage && (
        <>
          <motion.p>{rounded}</motion.p>
          <p>%</p>
        </>
      )}
    </UploadProgressBarText>
  );
};

export default Percentage;

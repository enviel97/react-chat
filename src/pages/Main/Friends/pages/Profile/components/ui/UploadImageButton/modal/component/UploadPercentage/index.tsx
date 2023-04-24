import {
  animate,
  AnimatePresence,
  useAnimation,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FC, memo, useEffect, useState } from "react";

import { useTheme } from "styled-components";
import Icon from "./components/Icons/Icon";
import Percentage from "./components/PercentageText";
import {
  AnimationColor,
  DisplayContainerAnimate,
} from "./styles/UploadPercentage.animate";
import {
  UploadPercentageContainer,
  UploadProgressBarCircle,
  UploadProgressBarContainer,
} from "./styles/UploadPercentage.decorate";

const duration = 0.5;
const UploadPercentage: FC<UploadPercentageProps> = ({ percentage, type }) => {
  const theme = useTheme();
  const count = useMotionValue(0);
  const xSmooth = useSpring(count, { damping: 50, stiffness: 400 });
  const [colorAnimate, setColorAnimation] = useState<ProgressState>("pending");
  const processAnimation = useAnimation();

  useEffect(() => {
    if (!percentage) return;
    const controller = animate(xSmooth, percentage, {
      duration: 0.8,
      onUpdate: (cv) => {
        if (type === "error") {
          setColorAnimation("error");
          return;
        }
        if (cv >= 100) {
          setColorAnimation("success");
          return;
        }
        setColorAnimation("pending");
        return;
      },
    });
    return controller.stop;
  }, [percentage, type, xSmooth]);

  useEffect(() => {
    if (!percentage) return;
    switch (type) {
      case "error": {
        processAnimation.stop();
        return;
      }
      case "pending": {
        processAnimation.start("proccess");
        return;
      }
      case "success": {
        return;
      }
    }

    return processAnimation.stop;
  }, [percentage, processAnimation, type]);

  const getBackgroundConic = (percentage: number) => {
    return `conic-gradient(
      currentColor ${percentage * 3.6}deg,
      ${theme.backgroundColor} 0deg
    )`;
  };

  return (
    <AnimatePresence mode='wait'>
      {percentage && (
        <UploadPercentageContainer {...DisplayContainerAnimate}>
          <UploadProgressBarContainer
            {...AnimationColor}
            animate={colorAnimate}
          >
            <UploadProgressBarCircle
              variants={{
                initial: { background: getBackgroundConic(0) },
                proccess: { background: getBackgroundConic(percentage) },
              }}
              style={{
                background: getBackgroundConic(0),
                filter: `
                  drop-shadow(0 0 1px ${theme.surfaceColor}) 
                  drop-shadow(0 0 2px ${theme.surfaceColor})
                  drop-shadow(0 0 3px ${theme.surfaceColor}) 
                  drop-shadow(0 0 4px ${theme.surfaceColor})
                  drop-shadow(0 0 5px ${theme.surfaceColor})
                `,
              }}
              initial={"initial"}
              animate={processAnimation}
              transition={{ duration }}
            >
              <Icon type={colorAnimate} />
            </UploadProgressBarCircle>
            <Percentage percentage={percentage} />
          </UploadProgressBarContainer>
        </UploadPercentageContainer>
      )}
    </AnimatePresence>
  );
};

export default memo(UploadPercentage);

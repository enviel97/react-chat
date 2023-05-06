import {
  animate,
  AnimationPlaybackControls,
  useAnimation,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FC, memo, useEffect, useRef, useState } from "react";
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
  const percentCount = useRef<AnimationPlaybackControls>();

  useEffect(() => {
    if (!percentage) return;
    if (type === "error") {
      setColorAnimation("error");
      percentCount.current?.stop();
      processAnimation.stop();
      return;
    }
    percentCount.current = animate(xSmooth, percentage, {
      duration: 0.8,
      onPlay: () => {
        processAnimation.start("proccess");
      },
      onUpdate: (cv) => {
        if (cv >= 100) {
          setColorAnimation("success");
          return;
        }
        setColorAnimation("pending");
        return;
      },
    });

    return () => {
      percentCount.current?.stop();
      processAnimation.stop();
    };
  }, [percentage, type, xSmooth, processAnimation]);

  const getBackgroundConic = (percentage: number) => {
    return `conic-gradient(
      currentColor ${percentage * 3.6}deg,
      ${theme.backgroundColor} 0deg
    )`;
  };

  return (
    <UploadPercentageContainer
      {...DisplayContainerAnimate}
      style={{ backdropFilter: "blur(10px)" }}
    >
      <UploadProgressBarContainer {...AnimationColor} animate={colorAnimate}>
        <UploadProgressBarCircle
          variants={{
            initial: { background: getBackgroundConic(0) },
            proccess: { background: getBackgroundConic(percentage ?? 0) },
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
          animate={processAnimation}
          transition={{ duration }}
        >
          <Icon type={colorAnimate} />
        </UploadProgressBarCircle>
        <Percentage percentage={percentage} state={type} />
      </UploadProgressBarContainer>
    </UploadPercentageContainer>
  );
};

export default memo(UploadPercentage);

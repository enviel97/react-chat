import { animate, AnimatePresence } from "framer-motion";
import { FC, memo, useEffect, useRef, useState } from "react";
import {
  MdCheckCircleOutline,
  MdCloudUpload,
  MdErrorOutline,
} from "react-icons/md";
import { useTheme } from "styled-components";
import {
  UploadPercentageContainer,
  UploadProgressBarCircle,
  UploadProgressBarContainer,
  UploadProgressBarText,
} from "./styles/UploadPercentage.decorate";
interface Props {
  percentage?: number;
  isError?: boolean;
}

type ProgressState = "error" | "success" | "normal";
interface IconProps {
  type: ProgressState;
}

const Icon: FC<IconProps> = memo(({ type }) => {
  switch (type) {
    case "error": {
      return <MdErrorOutline />;
    }
    case "normal": {
      return <MdCloudUpload />;
    }
    case "success": {
      return <MdCheckCircleOutline />;
    }
  }
});

const UploadPercentage: FC<Props> = ({ percentage, isError }) => {
  const theme = useTheme();
  const progressTextRef = useRef<HTMLDivElement>(null);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [colorAnimate, setColorAnimation] = useState<ProgressState>("normal");
  const duration = 1.5;

  useEffect(() => {
    if (isError) {
      setColorAnimation("error");
      return;
    }
    if (+progressValue >= 85) {
      setColorAnimation("success");
      return;
    }
    setColorAnimation("normal");
  }, [progressValue, isError]);

  useEffect(() => {
    const progressText = progressTextRef.current?.textContent;
    if (!progressText) return;

    animate(parseInt(progressText), percentage, {
      duration: duration * 0.8,
      onUpdate: (cv) => {
        if (!cv) return;
        const percent = cv.toFixed(0);
        progressTextRef.current!.textContent = percent;
        setProgressValue(+percent);
      },
    });
  }, [percentage, progressTextRef]);

  return (
    <AnimatePresence>
      {!!percentage && (
        <UploadPercentageContainer
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          animate='visible'
          initial='hidden'
          exit='hidden'
        >
          <UploadProgressBarContainer
            variants={{
              success: { color: theme.successColor },
              error: { color: theme.errorColor },
              normal: { color: theme.primaryColor },
            }}
            animate={colorAnimate}
          >
            <UploadProgressBarCircle
              variants={{
                initial: {
                  background: `conic-gradient(
                    currentColor 0deg,
                    ${theme.disableColor} 0deg
                  )`,
                },
                animation: {
                  background: `conic-gradient(
                    currentColor ${percentage * 3.6}deg,
                    ${theme.disableColor} 0deg
                  )`,
                },
              }}
              initial='initial'
              animate='animation'
              exit='initial'
              transition={{ duration: duration }}
            >
              <span>
                <Icon type={colorAnimate} />
              </span>
            </UploadProgressBarCircle>
            <UploadProgressBarText>
              <p ref={progressTextRef}>0</p>
              <p>%</p>
            </UploadProgressBarText>
          </UploadProgressBarContainer>
        </UploadPercentageContainer>
      )}
    </AnimatePresence>
  );
};

export default memo(UploadPercentage);

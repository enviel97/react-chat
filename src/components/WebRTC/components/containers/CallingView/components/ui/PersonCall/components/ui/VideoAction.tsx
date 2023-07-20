import { motion } from "framer-motion";
import { FC, memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IconSwap } from "@components/Icon";
import { IconsSwapController } from "@components/Icon/components/IconSwap";

const Button = styled(motion.div)`
  position: relative;
  display: block;
  padding: 0.2em;
  aspect-ratio: 1/1;
  box-sizing: border-box;
  color: var(--disable-color);
  border-radius: 0.5em;
  height: 100%;
  cursor: pointer;
  border-top: 0.5px solid ${({ theme }) => `${theme.backgroundColor}`};
  border-left: 0.5px solid ${({ theme }) => `${theme.backgroundColor}`};
`;

const IconBox = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: inherit;
  color: inherit;
`;

const VideoAction: FC<VideoActionProps> = ({
  type,
  on = false,
  onClick,
  disabled = false,
}) => {
  const [isDisable, setDisable] = useState(disabled);

  const iconSwapController = useRef<IconsSwapController>(null);

  useEffect(() => {
    iconSwapController.current?.setSwap(on);
  }, [on]);

  useEffect(() => {
    setDisable(disabled);
  }, [disabled]);

  const handleClick = () => {
    if (disabled) return;
    onClick && onClick();
    iconSwapController.current?.swap();
  };

  return (
    <Button
      onClick={handleClick}
      whileHover={isDisable ? undefined : { color: "var(--white)" }}
    >
      <IconBox
        whileHover={isDisable ? undefined : { scale: 1.05 }}
        whileTap={isDisable ? undefined : { scale: 1, opacity: 0.8 }}
        transition={{ duration: 0.2 }}
        style={{ transformOrigin: "center" }}
      >
        <IconSwap
          ref={iconSwapController}
          name={type}
          size='75%'
          color={isDisable || !on ? "inherit" : "var(--white)"}
        />
      </IconBox>
    </Button>
  );
};

export default memo(VideoAction);

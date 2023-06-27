import { motion } from "framer-motion";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { IconContext } from "react-icons/lib";
import {
  BiMicrophone,
  BiMicrophoneOff,
  BiCamera,
  BiCameraOff,
  BiExpand,
  BiCollapse,
} from "react-icons/bi";
import styled from "styled-components";

const IconMap = new Map<VideoIconType, VideoActionMap>([
  [
    "Audio",
    { on: <BiMicrophone color='var(--white)' />, off: <BiMicrophoneOff /> },
  ],
  ["Camera", { on: <BiCamera color='var(--white)' />, off: <BiCameraOff /> }],
  ["Screen", { on: <BiExpand color='var(--white)' />, off: <BiCollapse /> }],
]);

const Button = styled(motion.div)`
  display: block;
  padding: 0.2em;
  height: 32px;
  width: 32px;
  aspect-ratio: 1/1;
  box-sizing: border-box;
  color: var(--disable-color);
  border-radius: 0.5em;
  cursor: pointer;
  border-top: 0.5px solid ${({ theme }) => `${theme.backgroundColor}`};
  border-left: 0.5px solid ${({ theme }) => `${theme.backgroundColor}`};
`;

const IconBox = styled(motion.div)`
  display: flex;
  height: 100%;
  border-radius: inherit;
  color: inherit;
  align-items: center;
  justify-content: center;
`;

const VideoAction: FC<VideoActionProps> = ({
  type,
  on = false,
  onClick,
  disabled = false,
}) => {
  const [isOn, setOn] = useState<boolean>(on);
  const Icon = useMemo(() => {
    return IconMap.get(type);
  }, [type]);

  useEffect(() => {
    setOn(on);
  }, [on]);

  if (!Icon) return <></>;
  return (
    <Button
      onClick={onClick}
      whileHover={disabled ? undefined : { color: "var(--white)" }}
    >
      <IconBox
        whileHover={disabled ? undefined : { scale: 1.05 }}
        whileTap={disabled ? undefined : { scale: 0.95, opacity: 0.8 }}
      >
        <IconContext.Provider value={{ size: "100%" }}>
          {isOn && !disabled && Icon.on}
          {(!isOn || disabled) && Icon.off}
        </IconContext.Provider>
      </IconBox>
    </Button>
  );
};

export default memo(VideoAction);

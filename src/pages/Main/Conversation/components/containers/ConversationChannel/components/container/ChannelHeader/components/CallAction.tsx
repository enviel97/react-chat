import useCallController from "@components/WebRTC/hooks/useCallController";
import { motion } from "framer-motion";
import { FC, memo, useEffect, useState } from "react";
import { BsPersonVideo, BsTelephoneForwardFill } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import styled, { useTheme } from "styled-components";
import { ButtonActionShadow as Shadow } from "../utils/shadow";

interface PhoneCallProps {
  friendId?: string;
  type: CallType;
}

const IconBox = styled(motion.div)`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Container = styled(motion.div)`
  cursor: pointer;
  height: 2.5em;
  width: 2.5em;
  background-color: var(--background-color);
`;

const CallAction: FC<PhoneCallProps> = ({ friendId, type }) => {
  const theme = useTheme();
  const { trigger: call, disabled } = useCallController();
  const [hint, setHint] = useState<string>();

  useEffect(() => {
    if (disabled) return setHint("User is calling");
    const hint = type === "PhoneCall" ? "Audio call" : "Video Call";
    setHint(hint);
  }, [type, disabled]);

  const handleOnClick = async () => {
    if (!friendId) return;
    call(friendId, { type });
  };

  return (
    <Container
      whileTap={{ boxShadow: Shadow(theme.backgroundColor, "inset") }}
      style={{ boxShadow: Shadow(theme.backgroundColor) }}
      role={type}
      transition={{ duration: 0 }}
      onClick={handleOnClick}
    >
      <IconBox
        variants={{
          hover: { scale: 1.05, color: "var(--white)", opacity: 0.2 },
          tap: {
            scale: 0.95,
            opacity: 0.5,
            transition: { duration: 0 },
          },
        }}
        whileHover={disabled ? undefined : "hover"}
        whileTap={disabled ? undefined : "hover"}
      >
        {type === "PhoneCall" && <BsTelephoneForwardFill size={"1.2em"} />}
        {type === "VideoCall" && <BsPersonVideo size={"1.5em"} />}
      </IconBox>
      <Tooltip
        anchorSelect={`${Container}[role=${type}]`}
        content={hint}
        place={"bottom"}
      />
    </Container>
  );
};

export default memo(CallAction);

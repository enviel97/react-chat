import useAppDispatch from "@hooks/useAppDispatch";
import { callingApi } from "@store/repo/call";
import { motion } from "framer-motion";
import { FC, memo } from "react";
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
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    if (!friendId) return;
    dispatch(
      callingApi({
        receiver: friendId,
        camera: true,
        microphone: false,
      })
    );
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
          hover: { scale: 1.05 },
          tap: { scale: 0.95, transition: { duration: 0 } },
        }}
        whileHover='hover'
        whileTap='tap'
      >
        {type === "PhoneCall" && <BsTelephoneForwardFill size={"1.2em"} />}
        {type === "VideoCall" && <BsPersonVideo size={"1.5em"} />}
      </IconBox>
      <Tooltip
        anchorSelect={`${Container}[role=${type}]`}
        content={type === "PhoneCall" ? "Audio call" : "Video Call"}
        place={"bottom"}
      />
    </Container>
  );
};

export default memo(CallAction);

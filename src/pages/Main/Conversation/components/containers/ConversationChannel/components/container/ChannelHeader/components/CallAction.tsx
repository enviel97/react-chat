import { IconBase } from "@components/Icon";
import useCall from "@components/WebRTC/hooks/useCall";
import { motion } from "framer-motion";
import { FC, memo, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

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

const variants = {
  hover: { scale: 1.05, color: "var(--white)", opacity: 1 },
  tap: {
    scale: 0.95,
    opacity: 0.5,
    transition: { duration: 0 },
  },
};

const CallAction: FC<PhoneCallProps> = ({ friendId, type }) => {
  const { trigger: call, disabled } = useCall(friendId);
  const [hint, setHint] = useState<string>();

  useEffect(() => {
    if (disabled) return setHint("User is calling");
    const hint = type === "PhoneCall" ? "Audio call" : "Video Call";
    setHint(hint);
  }, [type, disabled]);

  const handleOnClick = async () => {
    if (!friendId) return;
    await call();
  };

  return (
    <Container role={type} transition={{ duration: 0 }} onClick={handleOnClick}>
      <IconBox
        variants={disabled ? undefined : variants}
        whileHover={"hover"}
        whileTap={"tap"}
        style={{ opacity: 0.75 }}
      >
        <IconBase
          name={type === "PhoneCall" ? "Phone" : "Stream"}
          size='1.25em'
        />
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

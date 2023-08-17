import { breakpoint } from "@theme/helper/breakpoint";
import { AnimatePresence, motion } from "framer-motion";
import { FC, memo } from "react";
import styled from "styled-components";
import useTimer from "../../hooks/useTimer";

interface TimerProps {
  status: CallStatus;
}

const TimerContainer = styled.div`
  display: block;
  box-sizing: border-box;
  font-weight: bold;
  text-align: center;
  font-size: 1.75em;
  padding: 0.5em 0;
  letter-spacing: calc(1.75em * 0.12);
  width: 100%;
  ${breakpoint.down("tablet")} {
    text-align: left;
  }
`;
const TimerMask = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
`;

const TimerContent = styled.span`
  position: relative;
  padding: 0.25em 0.5em;
  border-radius: 1rem;
  border: 2px solid var(--surface-color);
  background-color: var(--black);
  overflow: hidden;
  & > span {
    color: var(--white);
    font-size: inherit;
    &::after {
      content: ":";
    }
  }
  & > small {
    font-size: 90%;
  }
`;

const variants = {
  freeze: {
    backgroundColor: "var(--surface-color)",
    scale: 1,
  },
  active: {
    scaleY: 0,
    originY: "top",
  },
};

const Timer: FC<TimerProps> = ({ status }) => {
  const { hour, minute, second } = useTimer(status === "answer");

  return (
    <TimerContainer>
      <TimerContent>
        <AnimatePresence mode='wait'>
          {["connection", "error"].includes(status) && (
            <TimerMask variants={variants} initial='freeze' exit='active' />
          )}
        </AnimatePresence>
        <>
          {hour && <span>{`0${minute}`.slice(-2)}</span>}
          <span>{`0${minute}`.slice(-2)}</span>
          <small>{`0${second}`.slice(-2)}</small>
        </>
      </TimerContent>
    </TimerContainer>
  );
};

export default memo(Timer);

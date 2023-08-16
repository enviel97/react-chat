import { breakpoint } from "@theme/helper/breakpoint";
import { FC, memo } from "react";
import styled from "styled-components";
import useTimer from "../../hooks/useTimer";

const TimerContainer = styled.span`
  font-weight: bold;
  text-align: center;
  font-size: 1.75em;
  letter-spacing: calc(1.75em * 0.12);
  width: 100%;
  ${breakpoint.down("tablet")} {
    text-align: left;
  }
  & > span {
    color: var(--white);
    font-size: inherit;
    &::after {
      content: ":";
    }
  }
  & > small {
    font-size: 75%;
  }
`;

interface TimerProps {
  status: CallStatus;
}
const Timer: FC<TimerProps> = ({ status }) => {
  const { hour, minute, second } = useTimer(status === "answer");

  if (status === "answer") {
    return (
      <TimerContainer>
        {hour && <span>{`0${minute}`.slice(-2)}</span>}
        <span>{`0${minute}`.slice(-2)}</span>
        <small>{`0${second}`.slice(-2)}</small>
      </TimerContainer>
    );
  }
  return null;
};

export default memo(Timer);

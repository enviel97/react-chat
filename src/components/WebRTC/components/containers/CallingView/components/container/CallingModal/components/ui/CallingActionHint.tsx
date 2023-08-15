import { FC, Fragment } from "react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

const ActionCallHint = styled(Tooltip)`
  user-select: none;
  background-color: #000000;
  padding: 0.25em 1em;
  filter: drop-shadow(0.2em 0.2em 0.2em var(--surface-color))
    drop-shadow(-0.2em -0.2em 0.2em var(--surface-color));
`;

interface CallingActionHintProps extends Components {
  id: string;
}

const CallingActionHint: FC<CallingActionHintProps> = ({ children, id }) => {
  return (
    <Fragment>
      {children}
      <ActionCallHint id={id} place={"left"} />
    </Fragment>
  );
};

export default CallingActionHint;

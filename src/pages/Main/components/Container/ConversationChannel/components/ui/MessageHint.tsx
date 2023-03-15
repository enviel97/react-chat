import moment from "moment";
import { FC, memo } from "react";
import styled from "styled-components";
import { MessageItemTimer } from "../../styles/Message.decorate";

const HintEdit = styled.span`
  margin-top: 0.2em;
  font-size: 0.8em;
  font-style: italic;
  color: ${({ theme }) => theme.disableColor};
  & b {
    color: #fff;
  }
`;

interface MessageHintProps {
  hint?: MessageAction;
  showHintOnActionEdited?: boolean;
  timer?: moment.MomentInput;
}

const MessageHint: FC<MessageHintProps> = ({
  hint = "New",
  showHintOnActionEdited = false,
  timer,
}) => {
  let Notice = <></>;
  if (hint === "Edited") {
    Notice = <HintEdit>Edited</HintEdit>;
  }
  return (
    <>
      {Notice}
      {showHintOnActionEdited && (
        <HintEdit>
          Press <b>Enter</b> to update &minus; <b>Esc</b> to cancel
        </HintEdit>
      )}
      {timer && <MessageItemTimer>{moment(timer).calendar()}</MessageItemTimer>}
    </>
  );
};

export default memo(MessageHint);

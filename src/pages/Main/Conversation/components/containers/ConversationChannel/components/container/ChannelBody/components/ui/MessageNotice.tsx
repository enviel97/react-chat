import { FC, memo } from "react";
import styled from "styled-components";

interface MessageNoticeProps {
  message: Message;
}

const MessageNoticeContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 0.2em 0;
  & span {
    font-weight: bold;
    font-size: 0.8em;
    font-style: italic;
    color: ${({ theme }) => theme.disableColor};
  }
`;

const MessageNotice: FC<MessageNoticeProps> = ({ message }) => {
  return (
    <MessageNoticeContainer>
      <span>{message.content}</span>
    </MessageNoticeContainer>
  );
};

export default memo(MessageNotice);

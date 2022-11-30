import { pxToEm } from "@common/helper/tools";
import useAuthenticate from "@hooks/useAuthenticate";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import string from "@utils/string";
import { Placeholder } from "@utils/styles";
import moment from "moment";
import { FC, useMemo } from "react";
import styled from "styled-components";

interface MessageItemProps {
  message: Message;
  preChatter?: User;
  lastChatter: boolean;
}

const MessageItemContainer = styled.div`
  max-width: 50%;
  height: fit-content;
  display: flex;
  gap: 0.5em;
  align-items: flex-end;

  & .timer {
    font-weight: normal;
    font-size: 0.9em;
    font-style: italic;
    color: ${({ theme }) => theme.disableColor};
  }
`;

const MessageContent = styled.span<{ fromYou: boolean }>`
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: ${({ fromYou, theme }) =>
    fromYou ? theme.primaryColor : theme.surfaceColor};
`;

const MessageItem: FC<MessageItemProps> = ({
  message,
  preChatter,
  lastChatter,
}) => {
  const { user } = useAuthenticate();
  const formYou = useMemo(
    () => string.getId(message) === string.getId(user!),
    [message, user]
  );
  const getAvatar =
    !preChatter || string.getId(preChatter) !== string.getId(message.author);

  return (
    <MessageItemContainer>
      {getAvatar && <CircleAvatar />}
      {!getAvatar && <Placeholder height={pxToEm(36)} width={pxToEm(36)} />}
      <MessageContent fromYou={formYou}>{message.content}</MessageContent>
      {lastChatter && (
        <span className='timer'>
          {moment(message.createdAt).fromNow(false)}
        </span>
      )}
    </MessageItemContainer>
  );
};

export default MessageItem;

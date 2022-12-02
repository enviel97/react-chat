import { breakpoint } from "@common/helper/breakpoint";
import { pxToEm } from "@common/helper/tools";
import useAuthenticate from "@hooks/useAuthenticate";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import string from "@utils/string";
import { Placeholder } from "@utils/styles";
import moment from "moment";
import { FC, memo, useMemo } from "react";
import styled from "styled-components";

interface MessageStyledProps {
  fromYou: boolean;
}

interface MessageItemProps {
  message: Message;
  preChatter?: User;
  lastChatter: boolean;
}

const MessageItemContainer = styled.div<MessageStyledProps>`
  height: fit-content;
  display: flex;
  margin: 0.5em 0;
  gap: 0.5em;
  align-items: center;
  flex-direction: ${({ fromYou }) => (!fromYou ? "row-reverse" : "row")};

  & .timer {
    font-weight: normal;
    font-size: 0.9em;
    font-style: italic;
    color: ${({ theme }) => theme.disableColor};
  }
`;

const MessageContent = styled.span<MessageStyledProps>`
  width: fit-content;

  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: ${({ fromYou, theme }) =>
    !fromYou ? theme.surfaceColor : theme.secondaryColor};

  max-width: 50%;
  ${breakpoint.down("tablet")} {
    max-width: 80%;
  }
`;

const MessageItem: FC<MessageItemProps> = ({
  message,
  preChatter,
  lastChatter,
}) => {
  const { user } = useAuthenticate();
  const fromYou = useMemo(
    () => string.getId(message.author) === string.getId(user!),
    [message.author, user]
  );
  const getAvatar =
    !preChatter || string.getId(preChatter) !== string.getId(message.author);

  return (
    <MessageItemContainer fromYou={fromYou}>
      {getAvatar && <CircleAvatar />}
      {!getAvatar && <Placeholder height={pxToEm(36)} width={pxToEm(36)} />}
      <MessageContent fromYou={fromYou}>{message.content}</MessageContent>
      {lastChatter && (
        <span className='timer'>
          {moment(message.createdAt).fromNow(false)}
        </span>
      )}
    </MessageItemContainer>
  );
};

export default memo(MessageItem);

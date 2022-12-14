import { pxToEm } from "@common/helper/tools";
import useAuthenticate from "@hooks/useAuthenticate";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import string from "@utils/string";
import { Placeholder } from "@utils/styles";
import moment from "moment";
import { FC, memo, useMemo } from "react";
import {
  MessageContent,
  MessageItemContainer,
} from "../../styles/Message.decorate";

interface MessageItemProps {
  message: Message;
  preChatter?: User;
  lastChatter: boolean;
}

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

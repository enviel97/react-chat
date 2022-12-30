import { pxToEm } from "@common/helper/tools";
import useAuthenticate from "@hooks/useAuthenticate";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import string from "@utils/string";
import { Box, Placeholder } from "@utils/styles";
import moment from "moment";
import { FC, memo, useMemo } from "react";
import {
  MessageContent,
  MessageItemTimer,
} from "../../styles/Message.decorate";
import MessageAvatar from "./MessageAvatar";

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
    <Box
      display='flex'
      gap='1em'
      alignItems='flex-start'
      margin='0.25em 0'
      flexDirection={fromYou ? "row-reverse" : "row"}
    >
      <MessageAvatar isShow={!getAvatar} size={36} />
      <Box
        display='flex'
        width='100%'
        alignItems={fromYou ? "flex-end" : "flex-start"}
        flexDirection='column'
      >
        <MessageContent fromYou={fromYou}>{message.content}</MessageContent>
        <Box display='flex'>
          <MessageItemTimer isLastMessage={lastChatter}>
            {moment(message.createdAt).calendar()}
          </MessageItemTimer>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(MessageItem);

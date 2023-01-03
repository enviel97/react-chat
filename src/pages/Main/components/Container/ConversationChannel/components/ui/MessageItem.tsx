import useAuthenticate from "@hooks/useAuthenticate";
import string from "@utils/string";
import { Box } from "@utils/styles";
import moment from "moment";
import { FC, memo, useMemo, useState } from "react";
import {
  MessageAction,
  MessageContent,
  MessageContentContainer,
  MessageItemTimer,
} from "../../styles/Message.decorate";
import MessageAvatar from "./MessageAvatar";
import useBreakpoint from "@hooks/useBreakpoint";
import MessageEditMenuAction from "../container/MessageEditMenuAction";

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
  const breakpoint = useBreakpoint();
  const [isHover, setIsHover] = useState(false);
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
      // check
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <MessageAvatar isShow={!getAvatar} size={36} />
      <Box
        display='flex'
        width='fit-content'
        maxWidth={breakpoint.down("tablet") ? "80%" : "60%"}
        justifyContent='flex-start'
        alignItems={fromYou ? "flex-end" : "flex-start"}
        flexDirection='column'
      >
        <MessageContentContainer fromYou={fromYou}>
          <MessageContent fromYou={fromYou}>{message.content}</MessageContent>
          {fromYou && isHover && (
            <MessageAction fromYou={fromYou}>
              <MessageEditMenuAction message={message} />
            </MessageAction>
          )}
        </MessageContentContainer>

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

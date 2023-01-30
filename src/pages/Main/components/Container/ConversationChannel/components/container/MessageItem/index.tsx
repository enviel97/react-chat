import useAuthenticate from "@hooks/useAuthenticate";
import string from "@utils/string";
import { Box } from "@utils/styles";
import moment from "moment";
import { FC, memo, useMemo, useState } from "react";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchDeleteMessages, fetchEditMessages } from "@store/repo/message";
import MessageAvatar from "../../ui/MessageAvatar";
import MessageContent from "../../ui/MessageContent";
import MessageEditMenuAction from "../MessageEditMenuAction";
import {
  HintEdit,
  MessageAction,
  MessageContentContainer,
  MessageItemContainer,
  MessageItemTimer,
} from "./styles";

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
  const dispatch = useAppDispatch();
  const [isHover, setIsHover] = useState(false);
  const [isEditable, setEditable] = useState(false);

  const fromYou = useMemo(
    () => string.getId(message.author) === string.getId(user!),
    [message.author, user]
  );

  const getAvatar =
    !preChatter || string.getId(preChatter) !== string.getId(message.author);

  const isEdited = message.createdAt !== message.updatedAt;

  const handleDeleteMessage = () =>
    dispatch(
      fetchDeleteMessages({
        messageId: string.getId(message),
        conversationId: message.conversationId,
      })
    );

  const handleEditMessage = (newMessage?: string) => {
    if (newMessage) {
      dispatch(
        fetchEditMessages({
          messageId: string.getId(message),
          conversationId: message.conversationId,
          content: newMessage,
        })
      );
    }
    setEditable(false);
  };

  return (
    <MessageItemContainer
      // check
      fromYou={fromYou}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <MessageAvatar isShow={!getAvatar} size={36} />
      <Box
        display='flex'
        width='fit-content'
        justifyContent='flex-start'
        alignItems={fromYou ? "flex-end" : "flex-start"}
        flexDirection='column'
      >
        <MessageContentContainer fromYou={fromYou}>
          <MessageContent
            key={message.content}
            isEditable={isEditable}
            message={message.content}
            onConfirmEdit={handleEditMessage}
            fromYou={fromYou}
          />
          {fromYou && isHover && (
            <MessageAction>
              <MessageEditMenuAction
                onDeleteMessage={handleDeleteMessage}
                onEditMessage={() => setEditable(true)}
              />
            </MessageAction>
          )}
        </MessageContentContainer>
        {isEdited && <HintEdit>Edited</HintEdit>}
        {isEditable && (
          <HintEdit>
            Press <b>Enter</b> to update &minus; <b>Esc</b> to cancel
          </HintEdit>
        )}
        {lastChatter && (
          <MessageItemTimer>
            {moment(message.createdAt).calendar()}
          </MessageItemTimer>
        )}
      </Box>
    </MessageItemContainer>
  );
};

export default memo(MessageItem);

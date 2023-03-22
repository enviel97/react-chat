import useAuthenticate from "@hooks/useAuthenticate";
import string from "@utils/string";
import { Box } from "@utils/styles";
import { FC, memo, useCallback, useMemo, useState } from "react";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchDeleteMessages, fetchEditMessages } from "@store/repo/message";
import MessageAvatar from "../ui/MessageAvatar";
import {
  MessageContentContainer,
  MessageItemContainer,
} from "../../styles/Message.decorate";
import MessageContent from "../ui/MessageContent";
import MessageHint from "../ui/MessageHint";
import MessageEditMenuAction from "./MessageEditMenuAction";
import PromiseLoading from "../ui/PromiseLoading";
import { PromiseToast } from "@components/Toast/promise";
import messageUtils from "@store/repo/message/utils/utils";

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
  const allowModified = useMemo(
    () => message.action !== "Removed" && message.action !== "Notice",
    [message]
  );

  const fromYou = useMemo(
    () => string.getId(message.author) === string.getId(user!),
    [message, user]
  );

  const getAvatar = useMemo(() => {
    console.log({
      message,
      preChatter,
      messageAuthor: message.author,
      is: messageUtils.isTemp(message),
    });
    if (messageUtils.isTemp(message)) {
      return false;
    }
    if (!preChatter) return true;

    return string.getId(preChatter) !== string.getId(message.author);
  }, [message, preChatter]);

  const handleDeleteMessage = () => {
    PromiseToast({
      action: async () =>
        await dispatch(
          fetchDeleteMessages({
            messageId: string.getId(message),
            conversationId: message.conversationId,
          })
        ).unwrap(),
    });
  };

  const handleEditMessage = useCallback(
    (newMessage?: string) => {
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
    },
    [message, dispatch]
  );

  return (
    <MessageItemContainer
      fromYou={fromYou}
      onMouseEnter={() => allowModified && setIsHover(true)}
      onMouseLeave={() => allowModified && setIsHover(false)}
    >
      <MessageAvatar isShow={!getAvatar} size={36} />
      <Box
        display='flex'
        width='fit-content'
        justifyContent='flex-start'
        alignItems={fromYou ? "flex-end" : "flex-start"}
        flexDirection='column'
      >
        <MessageContentContainer fromYou={fromYou} action={message.action}>
          <MessageContent
            key={message.content}
            isEditable={isEditable}
            message={message.content}
            onConfirmEdit={handleEditMessage}
            fromYou={fromYou}
          />
          <MessageEditMenuAction
            onDeleteMessage={handleDeleteMessage}
            onEditMessage={() => setEditable(true)}
            isShow={fromYou && isHover}
          />
          <PromiseLoading messageId={`${string.getId(message)}`} />
        </MessageContentContainer>
        <MessageHint
          hint={message.action}
          showHintOnActionEdited={isEditable}
          timer={lastChatter ? message.createdAt : undefined}
        />
      </Box>
    </MessageItemContainer>
  );
};

export default memo(MessageItem);

import useAuthenticate from "@hooks/useAuthenticate";
import string from "@utils/string";
import { FC, memo, useCallback, useMemo, useState } from "react";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchDeleteMessages, fetchEditMessages } from "@store/repo/message";
import {
  MessageTextContainer,
  MessageItemBody,
  MessageItemContainer,
  MessageContentContainer,
} from "./styles/Message.decorate";
import { PromiseToast } from "@components/Toast/promise";
import messageUtils from "@store/repo/message/utils/utils";
import MessageAvatar from "./components/MessageAvatar";
import MessageContent from "./components/MessageContent";
import MessageEditMenuAction from "./components/MessageEditMenuAction";
import PromiseLoading from "./components/PromiseLoading";
import MessageHint from "./components/MessageHint";
import MessageAttachments from "./components/MessageAttachments";

interface MessageItemProps {
  message: Message;
  preChatter?: string;
  lastChatter: boolean;
}

const MessageItem: FC<MessageItemProps> = ({
  message,
  preChatter,
  lastChatter,
}) => {
  const { isUser } = useAuthenticate();
  const dispatch = useAppDispatch();
  const [isHover, setIsHover] = useState(false);
  const [isEditable, setEditable] = useState(false);

  const fromYou = useMemo(() => {
    if (messageUtils.isTemp(message)) return true;
    return isUser(message.author);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.id, message._id, isUser, message.author.id, message.author._id]);

  const getAvatar = useMemo(() => {
    if (messageUtils.isTemp(message)) {
      return false;
    }
    if (!preChatter) return true;

    return string.getId(preChatter) !== string.getId(message.author);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    message.author.id,
    message.author._id,
    message.id,
    message._id,
    preChatter,
  ]);

  const handleDeleteMessage = useCallback(() => {
    PromiseToast({
      action: async () =>
        await dispatch(
          fetchDeleteMessages({
            messageId: string.getId(message),
            conversationId: message.conversationId,
          })
        ).unwrap(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, message.id, message._id, message.conversationId]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, message.id, message._id, message.conversationId]
  );

  return (
    <MessageItemContainer
      $fromYou={fromYou}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
    >
      <MessageAvatar isShow={getAvatar} src={message.author.profile?.avatar} />
      <MessageItemBody $fromYou={fromYou}>
        <MessageContentContainer $fromYou={fromYou}>
          {message.attachments && (
            <MessageAttachments attachments={message.attachments} />
          )}
          <MessageTextContainer $action={message.action}>
            {message.content && (
              <MessageContent
                isEditable={isEditable}
                message={message.content}
                onConfirmEdit={handleEditMessage}
                fromYou={fromYou}
              />
            )}
            <PromiseLoading messageId={`${string.getId(message)}`} />
          </MessageTextContainer>
          {fromYou && isHover && (
            <MessageEditMenuAction
              onDeleteMessage={handleDeleteMessage}
              onEditMessage={() => setEditable(true)}
            />
          )}
        </MessageContentContainer>
        <MessageHint
          hint={message.action}
          showHintOnActionEdited={isEditable}
          timer={lastChatter ? message.createdAt : undefined}
        />
      </MessageItemBody>
    </MessageItemContainer>
  );
};

export default memo(MessageItem);

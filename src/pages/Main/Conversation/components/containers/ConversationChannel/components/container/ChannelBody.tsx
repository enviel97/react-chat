import useSocket from "@hooks/useSocket";
import string from "@utils/string";
import { memo, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import {
  addMessages,
  editMessage,
  removeMessage,
  selectAllMessage,
} from "@store/slices/messages";
import { isLoading } from "@utils/validate";
import MessageContainerLoading from "../ui/MessageContainerLoading";
import { useParams } from "react-router-dom";
import { updateLastMessage } from "@store/slices/conversations";
import ChannelEmpty from "./ChannelEmpty";
import MessageItem from "./MessageItem";
import { ChannelMessageContainer } from "../../styles/Channel.decorate";
import MessageNotice from "../ui/MessageNotice";
import { selectConversationType } from "@store/slices/ui";

interface MessageRemovePayload {
  lastMessage: Message;
  conversationId: string;
  messageId: string;
}

interface MessageEditedPayload {
  lastMessage: Message;
  conversationId: string;
  messageId: string;
  content: string;
}

const ChannelBody = () => {
  const { id = "" } = useParams();
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectAllMessage);
  const status = useAppSelector((state) => state.message.process);
  const type = useAppSelector(selectConversationType);
  const socket = useSocket();
  const ref = useRef<HTMLDivElement>(null);

  const onMessageCreated = useCallback(
    (msg: Message) => {
      if (msg.conversationId === id) {
        dispatch(addMessages(msg));
      }
      dispatch(
        updateLastMessage({
          conversationId: msg.conversationId,
          message: msg,
          type: type,
        })
      );
    },
    [dispatch, id, type]
  );

  const onMessageRemove = useCallback(
    (payload: MessageRemovePayload) => {
      const { lastMessage, conversationId, messageId } = payload;
      if (conversationId === id) {
        dispatch(removeMessage(messageId));
      }
      dispatch(
        updateLastMessage({
          conversationId: conversationId,
          message: lastMessage,
          type: type,
        })
      );
    },
    [id, dispatch, type]
  );

  const onMessageEdited = useCallback(
    (payload: MessageEditedPayload) => {
      const { conversationId, messageId, content, lastMessage } = payload;
      if (conversationId === id) {
        dispatch(editMessage({ messageId, content }));
      }
      dispatch(
        updateLastMessage({
          conversationId: conversationId,
          message: lastMessage,
          type: type,
        })
      );
    },
    [dispatch, id, type]
  );

  useEffect(() => {
    socket.on(Event.EVENT_MESSAGE_CREATED, onMessageCreated);
    socket.on(Event.EVENT_MESSAGE_REMOVE, onMessageRemove);
    socket.on(Event.EVENT_MESSAGE_EDITED, onMessageEdited);
    return () => {
      socket.off(Event.EVENT_MESSAGE_EDITED);
      socket.off(Event.EVENT_MESSAGE_REMOVE);
      socket.off(Event.EVENT_MESSAGE_CREATED);
    };
  }, [socket, onMessageCreated, onMessageRemove, onMessageEdited]);

  useLayoutEffect(() => {
    // Scroll to new messenger
    const container = ref.current;
    container?.scrollTo({
      top: container?.scrollHeight ?? window.innerHeight,
      left: 0,
      behavior: "auto",
    });
  }, [messages, ref]);

  if (isLoading(status)) {
    return <MessageContainerLoading />;
  }

  return (
    <ChannelMessageContainer ref={ref}>
      {messages.length === 0 && <ChannelEmpty id={id} />}
      {messages.length !== 0 &&
        messages.map((mess, index, arr) => {
          const key = `${string.getId(mess)}$${index}`;
          if (mess.action === "Notice") {
            return <MessageNotice key={key} message={mess} />;
          }
          const presentChatter =
            index === 0 || arr[index - 1]?.action === "Notice"
              ? undefined
              : arr[index - 1].author;
          const lastChatter = index === arr.length - 1;
          return (
            <MessageItem
              key={key}
              message={mess}
              preChatter={presentChatter}
              lastChatter={lastChatter}
            />
          );
        })}
    </ChannelMessageContainer>
  );
};

export default memo(ChannelBody);

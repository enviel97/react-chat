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
        })
      );
    },
    [dispatch, id]
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
        })
      );
    },
    [id, dispatch]
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
        })
      );
    },
    [dispatch, id]
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
          const presentChatter =
            index === 0 ? undefined : arr[index - 1].author;
          const lastChatter = index === arr.length - 1;
          if (mess.action === "Notice") {
            return (
              <MessageNotice
                key={`${string.getId(mess)}$${index}`}
                message={mess}
              />
            );
          }

          return (
            <MessageItem
              key={`${string.getId(mess)}$${index}`}
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

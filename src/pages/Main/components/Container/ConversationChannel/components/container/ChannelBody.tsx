import useSocket from "@hooks/useSocket";
import string from "@utils/string";
import { memo, useEffect, useLayoutEffect } from "react";
import { Event } from "@core/common/socket.define";
import MessageItem from "../ui/MessageItem";
import useAppDispatch from "@hooks/useAppDispatch";
import { MessageContainer } from "../../styles/Message.decorate";
import useAppSelector from "@hooks/useAppSelector";
import {
  addMessages,
  editMessage,
  removeMessage,
  selectAllMessage,
} from "@store/slices/messageSlice";
import { isLoading } from "@utils/validate";
import MessageContainerLoading from "../ui/MessageContainerLoading";
import { useParams } from "react-router-dom";
import { updateLastMessage } from "@store/slices/conversationSlice";
import ChannelEmpty from "./ChannelEmpty";

const ChannelBody = () => {
  const { id = "" } = useParams();
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectAllMessage);
  const status = useAppSelector((state) => state.message.process);
  const socket = useSocket();

  useEffect(() => {
    socket.on(Event.EVENT_MESSAGE_CREATED, (msg: Message) => {
      if (msg.conversationId === id) {
        dispatch(addMessages(msg));
      }
      dispatch(
        updateLastMessage({
          conversationId: msg.conversationId,
          message: msg,
        })
      );
    });

    socket.on(
      Event.EVENT_MESSAGE_REMOVE,
      ({ lastMessage, conversationId, messageId }) => {
        if (conversationId === id) {
          console.log(messageId);
          dispatch(removeMessage(messageId));
        }
        dispatch(
          updateLastMessage({
            conversationId: conversationId,
            message: lastMessage,
          })
        );
      }
    );
    socket.on(
      Event.EVENT_MESSAGE_EDITED,
      ({ lastMessage, conversationId, messageId, content }) => {
        if (conversationId === id) {
          console.log({ content });
          dispatch(editMessage({ messageId, content }));
        }
        dispatch(
          updateLastMessage({
            conversationId: conversationId,
            message: lastMessage,
          })
        );
      }
    );
    return () => {
      socket.off(Event.EVENT_MESSAGE_EDITED);
      socket.off(Event.EVENT_MESSAGE_REMOVE);
      socket.off(Event.EVENT_MESSAGE_CREATED);
    };
  }, [dispatch, socket, id]);

  useLayoutEffect(() => {
    // Scroll to new messenger
    const container = document.querySelector(`${MessageContainer}`);
    container?.scrollTo({
      top: container?.scrollHeight ?? window.innerHeight,
      left: 0,
      behavior: "auto",
    });
  }, [messages]);

  if (isLoading(status)) {
    return <MessageContainerLoading />;
  }

  return (
    <MessageContainer>
      {messages.length === 0 && <ChannelEmpty id={id} />}
      {messages.length !== 0 &&
        messages.map((mess, index, arr) => {
          const presentChatter =
            index === 0 ? undefined : arr[index - 1].author;
          const lastChatter = index === arr.length - 1;
          return (
            <MessageItem
              key={`${string.getId(mess)}$${index}`}
              message={mess}
              preChatter={presentChatter}
              lastChatter={lastChatter}
            />
          );
        })}
    </MessageContainer>
  );
};

export default memo(ChannelBody);

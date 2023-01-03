import { Event } from "@core/common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { fetchAddMessages, fetchMessages } from "@store/repo/message";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChannelBody from "./components/container/ChannelBody";
import ChannelHeader from "./components/container/ChannelHeader";
import ChannelSendForm from "./components/container/ChannelSendForm";
import {
  ChannelBodyContainer,
  ChannelContainer,
} from "./styles/Channel.decorate";

const ConversationChannel = () => {
  const { id = "" } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const socket = useSocket();

  useEffect(() => {
    dispatch(fetchMessages(id));
  }, [id, dispatch]);

  useEffect(() => {
    socket.emit(Event.EVENT_CONNECT_ROOM_CONVERSATION, { conversationId: id });
  }, [id, socket]);

  const _chatting = async (message: string) => {
    dispatch(
      fetchAddMessages({
        conversationId: id,
        message,
      })
    );
  };

  const _sendTypingNotification = () => {
    socket.emit(Event.EVENT_USER_TYPING, {
      conversationId: id,
    });
  };

  return (
    <ChannelContainer>
      <ChannelHeader conversationId={id} />
      <ChannelBodyContainer>
        <ChannelBody />
        <ChannelSendForm
          onConfirm={_chatting}
          onChanged={_sendTypingNotification}
        />
      </ChannelBodyContainer>
    </ChannelContainer>
  );
};

export default ConversationChannel;

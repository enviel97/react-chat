import { Event } from "@core/common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useAuthenticate from "@hooks/useAuthenticate";
import useSocket from "@hooks/useSocket";
import { fetchAddMessages, fetchMessages } from "@store/repo/message";
import string from "@utils/string";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChannelChattingNotification from "./components/container/ChanelChattingNotification";
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
  const { user } = useAuthenticate();

  useEffect(() => {
    dispatch(fetchMessages(id));
  }, [id, dispatch]);

  const _chatting = async (message: string) => {
    dispatch(
      fetchAddMessages({
        conversationId: id,
        message,
      })
    );
  };

  const _sendTypingNotification = () => {
    socket.emit(Event.EMIT_USER_TYPING, {
      conversationId: id,
      userId: string.getId(user),
    });
  };

  return (
    <ChannelContainer>
      <ChannelHeader conversationId={id} />
      <ChannelBodyContainer>
        <ChannelBody />
        <ChannelChattingNotification />
        <ChannelSendForm
          onConfirm={_chatting}
          onChanged={_sendTypingNotification}
        />
      </ChannelBodyContainer>
    </ChannelContainer>
  );
};

export default ConversationChannel;

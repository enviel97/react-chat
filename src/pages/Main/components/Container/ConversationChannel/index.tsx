import { Event } from "@core/common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import { fetchMessages } from "@store/repo/message";
import { isError } from "@utils/validate";
import { useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigator = useNavigate();
  const process = useAppSelector((state) => state.message.process);
  const socket = useSocket();

  useEffect(() => {
    dispatch(fetchMessages(id));
  }, [id, dispatch]);

  useEffect(() => {
    socket.on(Event.EVENT_CONNECTED_ROOM, (payload: any) => {
      console.log({ payload });
    });
    socket.on(Event.EVENT_LEAVED_ROOM, (payload: any) => {
      console.log({ payload });
    });
    return () => {
      socket.off(Event.EVENT_CONNECTED_ROOM);
      socket.off(Event.EVENT_LEAVED_ROOM);
    };
  }, [id, socket]);

  useLayoutEffect(() => {
    /**
     * Connect to conversation before render UI
     */
    socket.emit(Event.EVENT_CONNECT_ROOM_CONVERSATION, {
      conversationId: id,
    });
    return () => {
      socket.emit(Event.EVENT_LEAVE_ROOM_CONVERSATION, { conversationId: id });
    };
  }, [id, socket]);

  if (isError(process)) navigator("/conversation");

  return (
    <ChannelContainer>
      <ChannelHeader conversationId={id} />
      <ChannelBodyContainer>
        <ChannelBody />
        <ChannelSendForm conversationId={id} />
      </ChannelBodyContainer>
    </ChannelContainer>
  );
};

export default ConversationChannel;

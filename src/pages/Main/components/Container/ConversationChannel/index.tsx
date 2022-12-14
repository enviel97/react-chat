import useAppDispatch from "@hooks/useAppDispatch";
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

  return (
    <ChannelContainer>
      <ChannelHeader conversationId={id} />
      <ChannelBodyContainer>
        <ChannelBody />
        <ChannelSendForm onConfirm={_chatting} />
      </ChannelBodyContainer>
    </ChannelContainer>
  );
};

export default ConversationChannel;

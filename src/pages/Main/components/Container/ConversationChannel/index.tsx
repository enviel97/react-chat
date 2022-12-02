import useAuthenticate from "@hooks/useAuthenticate";
import { getConversation } from "@pages/Main/repo/conversation";
import string from "@utils/string";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChannelBody from "./components/container/ChannelBody";
import ChannelHeader from "./components/container/ChannelHeader";
import ChannelLoading from "./components/container/ChannelLoading";
import {
  ChannelBodyContainer,
  ChannelContainer,
} from "./styles/Channel.decorate";

const ConversationChannel = () => {
  const params = useParams();
  const { isUser } = useAuthenticate();

  const [conversation, setConversation] = useState<ConversationDetail>();

  useEffect(() => {
    if (params.id) {
      getConversation(params.id).then((res) => {
        if (res) {
          setConversation(res);
        }
      });
    }
  }, [params.id]);

  if (!conversation) {
    return <ChannelLoading />;
  }

  return (
    <ChannelContainer>
      <ChannelHeader
        channelName={
          isUser(conversation.participant)
            ? string.getFullName(conversation.author)
            : string.getFullName(conversation.participant)
        }
      />
      <ChannelBodyContainer>
        <ChannelBody
          messages={conversation.messages}
          conversationId={string.getId(conversation)}
        />
      </ChannelBodyContainer>
    </ChannelContainer>
  );
};

export default ConversationChannel;

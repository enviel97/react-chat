import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import string from "@utils/string";
import { FC } from "react";
import { useAsyncValue } from "react-router-dom";
import { ChannelHeaderContainer } from "../../styles/Channel.decorate";

interface ChannelHeaderProps {}

const ChannelHeader: FC<ChannelHeaderProps> = () => {
  const conversation = useAsyncValue() as Conversation;

  return (
    <ChannelHeaderContainer>
      <CircleAvatar />
      <h4 className='channelName'>
        {string.getFullName(conversation.participant)}
      </h4>
    </ChannelHeaderContainer>
  );
};

export default ChannelHeader;

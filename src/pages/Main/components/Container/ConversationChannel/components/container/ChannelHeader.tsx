import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import { FC } from "react";
import { ChannelHeaderContainer } from "../../styles/Channel.decorate";

interface ChannelHeaderProps {
  channelName: string;
}

const ChannelHeader: FC<ChannelHeaderProps> = ({ channelName }) => {
  return (
    <ChannelHeaderContainer>
      <CircleAvatar />
      <h4 className='channelName'>{channelName}</h4>
    </ChannelHeaderContainer>
  );
};

export default ChannelHeader;

import { useLoaderData } from "react-router-dom";
import ChannelHeader from "./components/ChannelHeader";
import { ChannelContainer } from "./styles/Channel.decorate";

const ConversationChannel = () => {
  const data: any = useLoaderData();
  return (
    <ChannelContainer>
      <ChannelHeader channelName='Channel name' channelAvatar='' />
      Channel {data.id}
    </ChannelContainer>
  );
};

export default ConversationChannel;

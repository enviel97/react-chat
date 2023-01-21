import SkeletonContainer from "@components/Skeleton";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import HeaderConversation from "@pages/Main/components/UI/HeaderConversation";
import { FC } from "react";
import { ChannelHeaderContainer } from "../../styles/Channel.decorate";

interface ChannelHeaderProps {
  conversationId: string;
}

const ChannelHeader: FC<ChannelHeaderProps> = ({ conversationId }) => {
  return (
    <SkeletonContainer>
      <ChannelHeaderContainer>
        <CircleAvatar isLoading={!conversationId} />
        <HeaderConversation
          className='channelName'
          conversationId={conversationId}
        />
      </ChannelHeaderContainer>
    </SkeletonContainer>
  );
};

export default ChannelHeader;

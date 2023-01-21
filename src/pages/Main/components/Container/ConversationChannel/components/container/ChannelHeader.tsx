import SkeletonContainer from "@components/Skeleton";
import useAppSelector from "@hooks/useAppSelector";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import HeaderConversation from "@pages/Main/components/UI/HeaderConversation";
import { selectDirectConversationById } from "@store/slices/conversationSlice";
import { selectGroupConversationById } from "@store/slices/groupConversationSlice";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { ChannelHeaderContainer } from "../../styles/Channel.decorate";

interface ChannelHeaderProps {
  conversationId: string;
}

const ChannelHeader: FC<ChannelHeaderProps> = ({ conversationId }) => {
  const { type = "direct" } = useParams();

  const channel = useAppSelector((state) => {
    if (type === "direct") {
      return selectDirectConversationById(state, conversationId);
    } else {
      return selectGroupConversationById(state, conversationId);
    }
  });
  return (
    <SkeletonContainer>
      <ChannelHeaderContainer>
        <CircleAvatar isLoading={!conversationId} />
        <HeaderConversation className='channelName' channel={channel} />
      </ChannelHeaderContainer>
    </SkeletonContainer>
  );
};

export default ChannelHeader;

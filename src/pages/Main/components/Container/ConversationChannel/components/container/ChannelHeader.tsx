import SkeletonContainer from "@components/Skeleton";
import useAppSelector from "@hooks/useAppSelector";
import useAuthenticate from "@hooks/useAuthenticate";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import { selectConversationById } from "@store/slices/conversationSlice";
import string from "@utils/string";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { ChannelHeaderContainer } from "../../styles/Channel.decorate";

interface ChannelHeaderProps {
  conversationId: string;
}

const ChannelHeader: FC<ChannelHeaderProps> = ({ conversationId }) => {
  const { isUser } = useAuthenticate();
  const channel = useAppSelector((state) =>
    selectConversationById(state, conversationId)
  );

  return (
    <SkeletonContainer>
      <ChannelHeaderContainer>
        <CircleAvatar isLoading={!channel} />
        <h4 className='channelName'>
          {!channel && <Skeleton width={250} />}

          {channel &&
            string.getFullName(
              isUser(channel.participant)
                ? channel.author
                : channel!.participant
            )}
        </h4>
      </ChannelHeaderContainer>
    </SkeletonContainer>
  );
};

export default ChannelHeader;

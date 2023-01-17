import SkeletonContainer from "@components/Skeleton";
import useAppSelector from "@hooks/useAppSelector";
import useAuthenticate from "@hooks/useAuthenticate";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import { selectConversationById } from "@store/slices/conversationSlice";
import string from "@utils/string";
import { FC, useMemo } from "react";
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

  const conversationName = useMemo(() => {
    if (!channel) return "";
    const members = channel.participant.members;
    if (members.length > 1) {
      return [...members, channel.author].map((mem) => mem.lastName).join(",");
    }
    return isUser(members[0])
      ? string.getFullName(channel.author)
      : string.getFullName(members[0]);
  }, [channel]);

  return (
    <SkeletonContainer>
      <ChannelHeaderContainer>
        <CircleAvatar isLoading={!channel} />
        <h4 className='channelName'>
          {!channel && <Skeleton width={250} />}
          {channel && conversationName}
        </h4>
      </ChannelHeaderContainer>
    </SkeletonContainer>
  );
};

export default ChannelHeader;

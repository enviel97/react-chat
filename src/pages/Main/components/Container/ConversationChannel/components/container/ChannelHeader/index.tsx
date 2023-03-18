import SkeletonContainer from "@components/Skeleton";
import useAppSelector from "@hooks/useAppSelector";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import HeaderConversation from "@pages/Main/components/UI/HeaderConversation";
import { selectConversationById } from "@store/slices/conversations";
import { FC, useMemo } from "react";
import { ChannelHeaderContainer } from "../../../styles/Channel.decorate";
import AddUserToGroup from "./components/AddUserToGroup";
import LeaveGroup from "./components/LeaveGroup";

interface ChannelHeaderProps {
  conversationId: string;
}

const ChannelHeader: FC<ChannelHeaderProps> = ({ conversationId }) => {
  const channel = useAppSelector((state) =>
    selectConversationById(state, conversationId)
  );
  const members = useMemo(() => channel?.participant.members ?? [], [channel]);

  return (
    <SkeletonContainer>
      <ChannelHeaderContainer>
        <CircleAvatar isLoading={!conversationId} />
        <HeaderConversation channel={channel} />
        <AddUserToGroup
          role={channel?.participant.roles}
          conversationId={conversationId}
          members={members}
          type={channel?.type ?? "direct"}
        />
        <LeaveGroup conversationId={conversationId} />
      </ChannelHeaderContainer>
    </SkeletonContainer>
  );
};

export default ChannelHeader;

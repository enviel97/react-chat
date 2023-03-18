import SkeletonContainer from "@components/Skeleton";
import useAppSelector from "@hooks/useAppSelector";
import useAuthenticate from "@hooks/useAuthenticate";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import HeaderConversation from "@pages/Main/components/UI/HeaderConversation";
import { selectConversationById } from "@store/slices/conversations";
import string from "@utils/string";
import { FC, useMemo } from "react";
import { ChannelHeaderContainer } from "../../../styles/Channel.decorate";
import ConversationHeaderAction from "../../ui/ConversationHeaderAction.tsx";

interface ChannelHeaderProps {
  conversationId: string;
}

const ChannelHeader: FC<ChannelHeaderProps> = ({ conversationId }) => {
  const conversation = useAppSelector((state) =>
    selectConversationById(state, conversationId)
  );
  const members = useMemo(
    () => conversation?.participant.members ?? [],
    [conversation]
  );

  const roles = useMemo(() => {
    return conversation?.participant.roles ?? {};
  }, [conversation]);

  return (
    <SkeletonContainer>
      <ChannelHeaderContainer>
        <CircleAvatar isLoading={!conversationId} />
        <HeaderConversation conversationId={conversationId} />
        <ConversationHeaderAction
          roles={roles}
          members={members}
          type={conversation?.type ?? "direct"}
          conversationId={conversationId}
        />
      </ChannelHeaderContainer>
    </SkeletonContainer>
  );
};

export default ChannelHeader;

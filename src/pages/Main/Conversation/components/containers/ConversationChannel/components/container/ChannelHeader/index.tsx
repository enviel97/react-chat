import useAppSelector from "@hooks/useAppSelector";
import ConversationAvatar from "@pages/Main/Conversation/components/ui/ConversationAvatar";
import HeaderConversation from "@pages/Main/Conversation/components/ui/HeaderConversation";
import { selectConversationById } from "@store/slices/conversations";
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
    <ChannelHeaderContainer>
      <ConversationAvatar conversationId={conversationId} />
      <HeaderConversation conversationId={conversationId} />
      <ConversationHeaderAction
        roles={roles}
        members={members}
        type={conversation?.type ?? "direct"}
        conversationId={conversationId}
      />
    </ChannelHeaderContainer>
  );
};

export default ChannelHeader;

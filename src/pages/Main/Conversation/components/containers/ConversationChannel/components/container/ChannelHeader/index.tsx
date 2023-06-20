import useAppSelector from "@hooks/useAppSelector";
import ConversationAvatar from "@pages/Main/Conversation/components/ui/ConversationAvatar";
import HeaderConversation from "@pages/Main/Conversation/components/ui/HeaderConversation";
import { selectConversationById } from "@store/slices/conversations";
import { FC, memo, useMemo } from "react";
import { ChannelHeaderContainer } from "../../../styles/Channel.decorate";
import ConversationDirectHeaderAction from "../../ui/ConversationDirectHeaderAction";
import ConversationGroupHeaderAction from "../../ui/ConversationGroupHeaderAction";

interface ChannelHeaderProps {
  conversationId: string;
}

const ChannelHeader: FC<ChannelHeaderProps> = ({ conversationId }) => {
  const conversation = useAppSelector((state) =>
    selectConversationById(state, conversationId)
  );
  const members = useMemo(
    () => conversation?.participant?.members ?? [],
    [conversation?.participant?.members]
  );

  const roles = useMemo(() => {
    return conversation?.participant?.roles ?? {};
  }, [conversation?.participant?.roles]);

  if (!conversation) return <></>;
  return (
    <ChannelHeaderContainer>
      <ConversationAvatar conversationId={conversationId} />
      <HeaderConversation conversationId={conversationId} />
      {conversation.type === "group" && (
        <ConversationGroupHeaderAction
          roles={roles}
          members={members}
          type={conversation?.type ?? "direct"}
          conversationId={conversationId}
        />
      )}
      {conversation.type === "direct" && (
        <ConversationDirectHeaderAction members={members} />
      )}
    </ChannelHeaderContainer>
  );
};

export default memo(ChannelHeader);

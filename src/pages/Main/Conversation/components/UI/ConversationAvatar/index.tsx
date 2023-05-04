import useAppSelector from "@hooks/useAppSelector";
import { FC, useEffect, useState } from "react";
import { selectConversationById } from "@store/slices/conversations";
import useAuthenticate from "@hooks/useAuthenticate";
import DirectAvatar from "./components/DirectAvatar";
import GroupAvatar from "./components/GroupAvatar";

interface ConversationAvatarProps {
  conversationId: string;
}
type Srcset = string | undefined;

const ConversationAvatar: FC<ConversationAvatarProps> = ({
  conversationId,
}) => {
  const conversation = useAppSelector((state) =>
    selectConversationById(state, conversationId)
  );
  const { isUser } = useAuthenticate();
  const [listSrc, setListSrc] = useState<Map<string, Srcset>>(new Map());

  useEffect(() => {
    if (!conversation) return;
    const participants = conversation.participant.members;

    setListSrc((prev) =>
      participants.reduce((participantAvatar, currentParticipant) => {
        if (conversation.type === "direct" && isUser(currentParticipant)) {
          return participantAvatar;
        }
        participantAvatar.set(
          currentParticipant.getId(),
          currentParticipant.profile?.avatar
        );
        return participantAvatar;
      }, prev)
    );
  }, [conversation, isUser]);

  if (!conversation) return <></>;

  if (listSrc.size > 1) {
    return <GroupAvatar avatarIds={[...listSrc.values()]} />;
  }

  return <DirectAvatar avatarId={[...listSrc.values()].at(0)} />;
};

export default ConversationAvatar;

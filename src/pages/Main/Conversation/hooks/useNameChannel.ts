import useAppSelector from "@hooks/useAppSelector";
import useAuthenticate from "@hooks/useAuthenticate";
import { selectConversationById } from "@store/slices/conversations";
import string from "@utils/string";
import { useMemo } from "react";

const useNameChannel = (conversationId: string) => {
  const { isUser } = useAuthenticate();
  const conversation = useAppSelector((state: any) =>
    selectConversationById(state, conversationId)
  );

  const conversationName = useMemo(() => {
    if (!conversation) return "";
    if (!conversation.name) {
      const members = conversation.participant.members;
      const userIndex = members.findIndex(isUser);
      if (userIndex < 0) return "";
      return string.getFullName(members[userIndex ^ 1]);
    }
    return conversation.name;
  }, [conversation, isUser]);

  return conversationName;
};

export default useNameChannel;

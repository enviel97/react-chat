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
    const members = conversation.participant.members;
    if (conversation.type === "group") {
      return "Group of " + members.map((mem: User) => mem.lastName).join(", ");
    }
    return isUser(members[0])
      ? string.getFullName(members[1])
      : string.getFullName(members[0]);
  }, [conversation, isUser]);

  return conversationName;
};

export default useNameChannel;

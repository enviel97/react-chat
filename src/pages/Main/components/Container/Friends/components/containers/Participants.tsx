import useAppSelector from "@hooks/useAppSelector";
import { selectConversationById } from "@store/slices/conversations";
import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import ListFriend from "../ui/ListFriend";
import string from "@utils/string";
import useAuthenticate from "@hooks/useAuthenticate";

const Participants = () => {
  const { id = "" } = useParams();
  const { user } = useAuthenticate();
  const conversation = useAppSelector((state) =>
    selectConversationById(state, id)
  );

  const members = useMemo(() => {
    const members = Array.from(conversation?.participant.members ?? []);
    return members.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }, [conversation]);
  const roles = useMemo(() => {
    return conversation?.participant.roles;
  }, [conversation]);

  const canBanned = useMemo(() => {
    if (!conversation || !roles) return false;
    return (
      roles[string.getId(user)] === "Admin" && conversation.type === "group"
    );
  }, [roles, conversation, user]);

  return (
    <ListFriend
      groupTitle='Participants'
      data={members}
      role={roles}
      canBanned={canBanned}
    />
  );
};

export default memo(Participants);

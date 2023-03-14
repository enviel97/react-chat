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

  return (
    <ListFriend
      groupTitle='Participants'
      data={members}
      role={roles}
      canBanned={roles && roles[string.getId(user)] === "Admin"}
    />
  );
};

export default memo(Participants);

import useAppSelector from "@hooks/useAppSelector";
import { selectConversationById } from "@store/slices/conversations";
import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import ListFriend from "../ui/ListFriend";

const Participants = () => {
  const { id = "" } = useParams();
  const conversation = useAppSelector((state) =>
    selectConversationById(state, id)
  );

  const members = useMemo(() => {
    const members = conversation?.participant.members ?? [];
    return members;
  }, [id, conversation]);
  return <ListFriend groupTitle='Participants' data={members} />;
};

export default memo(Participants);

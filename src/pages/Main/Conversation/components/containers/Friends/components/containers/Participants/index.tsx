import useAppSelector from "@hooks/useAppSelector";
import { selectConversationById } from "@store/slices/conversations";
import { lazy, memo, Suspense, useMemo } from "react";
import { useParams } from "react-router-dom";
import string from "@utils/string";
import useAuthenticate from "@hooks/useAuthenticate";
import {
  ParticipantListContainer,
  ParticipantListHeaderTitle,
} from "./styles/ParticipantList.decorate";
import Divider from "@components/Divider";
import ParticipantItemLoading from "./components/ParticipantItem/components/containers/ParticipantItemLoading";
const ParticipantItem = lazy(() => import("./components/ParticipantItem"));

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
    <ParticipantListContainer>
      <ParticipantListHeaderTitle>
        <span>Participant</span>
        <span>{`(${members.length})`}</span>
      </ParticipantListHeaderTitle>
      <Divider />
      {members.map((user) => {
        const _role = (roles && roles[string.getId(user)]) ?? "Member";
        return (
          <Suspense
            key={string.getId(user)}
            fallback={<ParticipantItemLoading />}
          >
            <ParticipantItem user={user} role={_role} canBanned={canBanned} />
          </Suspense>
        );
      })}
    </ParticipantListContainer>
  );
};

export default memo(Participants);

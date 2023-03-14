import useAppSelector from "@hooks/useAppSelector";
import { selectConversationById } from "@store/slices/conversations";
import { memo, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import ListFriend from "../ui/ListFriend";
import { RxCircleBackslash } from "react-icons/rx";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchDeleteMember } from "@store/repo/conversation";
import string from "@utils/string";
import { PromiseToast } from "@components/Toast/promise";

const Participants = () => {
  const { id = "" } = useParams();
  const dispatch = useAppDispatch();
  const conversation = useAppSelector((state) =>
    selectConversationById(state, id)
  );

  const members = useMemo(() => {
    const members = Array.from(conversation?.participant.members ?? []);
    return members.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }, [id, conversation]);

  const onAction = useCallback(
    (item: User) => {
      PromiseToast({
        action: () =>
          dispatch(
            fetchDeleteMember({
              idParticipant: string.getId(item),
              conversationId: string.getId(conversation),
            })
          ).unwrap(),
      });
    },
    [dispatch, conversation]
  );

  return (
    <ListFriend
      groupTitle='Participants'
      data={members}
      role={conversation?.participant.roles}
      options={[
        {
          icon: <RxCircleBackslash />,
          label: "Delete",
          onClick: onAction,
        },
      ]}
    />
  );
};

export default memo(Participants);

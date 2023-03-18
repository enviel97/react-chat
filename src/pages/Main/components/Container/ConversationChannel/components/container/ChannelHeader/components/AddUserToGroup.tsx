import { ButtonIconNeumorphism } from "@components/Button";
import { useModals } from "@components/Modal/hooks/useModals";
import { PromiseToast } from "@components/Toast/promise";
import useAppDispatch from "@hooks/useAppDispatch";
import useAuthenticate from "@hooks/useAuthenticate";
import { fetchAddMembers } from "@store/repo/conversation";
import string from "@utils/string";
import { FC, useCallback, useMemo } from "react";
import { TiUserAdd } from "react-icons/ti";
import ModalAddUser from "../../../ui/ModalAddUser";

interface AddUserToGroupProps {
  conversationId: string;
  type: ConversationType;
  role?: ParticipantRole;
  members: User[];
}

const idModal = "ChannelHeaderId";

const modalOptions: ModalOptions = {
  modalId: idModal,
  isDialog: false,
  height: "fit-content",
};

const AddUserToGroup: FC<AddUserToGroupProps> = ({
  conversationId,
  role,
  members,
  type,
}) => {
  const dispatch = useAppDispatch();
  const modal = useModals();
  const { user } = useAuthenticate();

  const canInvite = useMemo(() => {
    const _role = role && role[string.getId(user)];
    return _role === "Admin" && type === "group";
  }, [role, user, type]);

  const onConfirmAddUser = useCallback(
    (ids: string[]) => {
      PromiseToast({
        action: async () =>
          await dispatch(
            fetchAddMembers({
              conversationId: conversationId,
              idParticipant: ids,
            })
          ),
        onSuccess: () => modal.close(idModal),
      });
    },
    [conversationId, dispatch, modal]
  );

  const onAddUserHandler = useCallback(() => {
    modal.show(
      <ModalAddUser
        onSelectedUsers={onConfirmAddUser}
        participantIds={members.map((m) => string.getId(m))}
      />,
      modalOptions
    );
  }, [members, onConfirmAddUser, modal]);

  if (!canInvite) return <></>;

  return (
    <ButtonIconNeumorphism
      size='2.5em'
      icon={<TiUserAdd size={"2.5em"} />}
      onClick={onAddUserHandler}
    />
  );
};

export default AddUserToGroup;

import { useModals } from "@components/Modal/hooks/useModals";
import { PromiseToast } from "@components/Toast/promise";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchAddMembers } from "@store/repo/conversation";
import { useCallback } from "react";
import ModalAddUser from "../components/containers/ConversationChannel/components/ui/ModalAddUser";

const idModal = "ChannelHeaderId";

const modalOptions: ModalOptions = {
  modalId: idModal,
  isDialog: false,
  height: "fit-content",
};

const useAddMember = (conversationId: string, members: User[]) => {
  const dispatch = useAppDispatch();
  const modal = useModals();
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
        participantIds={members.map((m) => m.getId())}
      />,
      modalOptions
    );
  }, [members, onConfirmAddUser, modal]);

  return onAddUserHandler;
};

export default useAddMember;

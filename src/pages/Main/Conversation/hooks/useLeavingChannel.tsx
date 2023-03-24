import ModalConfirm from "@components/Modal/components/ModalConfirm";
import { useModals } from "@components/Modal/hooks/useModals";
import { PromiseToast } from "@components/Toast/promise";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchLeaveConversation } from "@store/repo/conversation";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const idModal = "ChannelHeaderId";

const modalOptions: ModalOptions = {
  modalId: idModal,
  isDialog: false,
  height: "200px",
  width: "fit-content",
};

const useLeavingChannel = () => {
  const modal = useModals();
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const onConfirm = useCallback(
    (conversationId: string) => {
      PromiseToast({
        action: async () =>
          await dispatch(fetchLeaveConversation(conversationId)).unwrap(),
        onSuccess: () => {
          modal.close(idModal);
          navigator("/", { replace: true });
        },
      });
    },
    [dispatch, modal, navigator]
  );

  const onLeaveChatHandler = useCallback(
    (conversationId: string) => {
      modal.show(
        <ModalConfirm
          modalKey={idModal}
          content={<span>You want to leave this group</span>}
          onConfirm={() => onConfirm(conversationId)}
          positionAction={"center"}
        />,
        modalOptions
      );
    },
    [modal, onConfirm]
  );

  return onLeaveChatHandler;
};

export default useLeavingChannel;

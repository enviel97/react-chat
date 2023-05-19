import ModalConfirm from "@components/Modal/components/ModalConfirm";
import { useModals } from "@components/Modal/hooks/useModals";
import useAppDispatch from "@hooks/useAppDispatch";
import { removeConversation } from "@store/slices/conversations";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const NOTICE_YOU_BANNED = "noticeYouBanned";

const modalConfirmBannedOptions = {
  height: "fit-content",
  width: "fit-content",
  isDialog: true,
  showCloseButton: false,
  modalId: NOTICE_YOU_BANNED,
};

const useListenBannedUser = (id: string) => {
  const dispatch = useAppDispatch();
  const controller = useModals();
  const navigator = useNavigate();

  const onConfirmModal = useCallback(() => {
    navigator("/conversation");
    controller.close(NOTICE_YOU_BANNED);
  }, [controller, navigator]);

  const handleOnUserBanned = useCallback(
    (payload: BannedMemberPayload) => {
      if (id !== payload.conversationId) return;
      dispatch(removeConversation(payload));
      controller.show(
        <ModalConfirm
          content={"You has been banned"}
          modalKey={NOTICE_YOU_BANNED}
          onConfirm={onConfirmModal}
          justConfirm
        />,
        modalConfirmBannedOptions
      );
    },
    [dispatch, controller, id, onConfirmModal]
  );

  return handleOnUserBanned;
};

export default useListenBannedUser;

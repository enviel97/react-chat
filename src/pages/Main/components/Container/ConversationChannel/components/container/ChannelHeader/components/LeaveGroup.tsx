import { ButtonIconNeumorphism } from "@components/Button";
import ModalConfirm from "@components/Modal/components/ModalConfirm";
import { useModals } from "@components/Modal/hooks/useModals";
import { PromiseToast } from "@components/Toast/promise";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchLeaveConversation } from "@store/repo/conversation";
import { FC, useCallback } from "react";
import { TiEject } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

interface LeaveGroupProps {
  conversationId: string;
}

const idModal = "ChannelHeaderId";

const modalOptions: ModalOptions = {
  modalId: idModal,
  isDialog: false,
  height: "200px",
  width: "fit-content",
};

const LeaveGroup: FC<LeaveGroupProps> = ({ conversationId }) => {
  const dispatch = useAppDispatch();
  const modal = useModals();
  const navigator = useNavigate();

  const onConfirm = useCallback(() => {
    PromiseToast({
      action: async () =>
        await dispatch(fetchLeaveConversation(conversationId)).unwrap(),
      onSuccess: () => {
        modal.close(idModal);
        navigator("/", { replace: true });
      },
    });
  }, [conversationId, dispatch, modal, navigator]);

  const onLeaveChatHandler = useCallback(() => {
    modal.show(
      <ModalConfirm
        modalKey={idModal}
        content={<span>You want to leave this group</span>}
        onConfirm={onConfirm}
        positionAction={"center"}
      />,
      modalOptions
    );
  }, [modal, onConfirm]);

  return (
    <ButtonIconNeumorphism
      size='2.5em'
      icon={<TiEject size={"2.5em"} />}
      onClick={onLeaveChatHandler}
      hint='Leaving Group'
    />
  );
};

export default LeaveGroup;

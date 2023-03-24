import ModalConfirm from "@components/Modal/components/ModalConfirm";
import { useModals } from "@components/Modal/hooks/useModals";
import { ActionMenu } from "@components/Select";
import { FC, useCallback } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import styled from "styled-components";
import { DeleteContent } from "../ui/Modal.content";
interface MessageEditMenuActionProps {
  onDeleteMessage: () => void;
  onEditMessage: () => void;
  isShow?: boolean;
}

const MODAL_DELETE_ID = "modal_delete_id";

const MessageActionContainer = styled.div`
  position: absolute;
  right: auto;
  left: -2rem;
`;

const ModalDeleteOption = {
  isDialog: true,
  modalId: MODAL_DELETE_ID,
  height: "fit-content",
  width: "fit-content",
};

const MessageEditMenuAction: FC<MessageEditMenuActionProps> = ({
  onDeleteMessage,
  onEditMessage,
  isShow,
}) => {
  const modal = useModals();

  const handleDeleteMessage = useCallback(async () => {
    modal.show(
      <ModalConfirm
        modalKey={MODAL_DELETE_ID}
        content={<DeleteContent />}
        onConfirm={onDeleteMessage}
      />,
      ModalDeleteOption
    );
  }, [onDeleteMessage, modal]);

  if (!isShow) {
    return <></>;
  }
  return (
    <MessageActionContainer>
      <ActionMenu
        options={[
          {
            icon: <MdDeleteForever />,
            label: "Delete message",
            onClick: handleDeleteMessage,
          },
          {
            icon: <MdEdit />,
            label: "Edit message",
            onClick: onEditMessage,
          },
        ]}
        isVerticalIcon
      />
    </MessageActionContainer>
  );
};

export default MessageEditMenuAction;

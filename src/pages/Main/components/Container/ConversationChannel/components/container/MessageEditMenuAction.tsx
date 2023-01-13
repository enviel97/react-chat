import ModalConfirm from "@components/Modal/components/ModalConfirm";
import useId from "@components/Modal/hooks/useId";
import { useModals } from "@components/Modal/hooks/useModals";
import { ActionMenu } from "@components/Select";
import { FC } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { DeleteContent } from "../ui/Modal.content";
interface MessageEditMenuActionProps {
  onDeleteMessage: () => void;
  onEditMessage: () => void;
}

const MessageEditMenuAction: FC<MessageEditMenuActionProps> = ({
  onDeleteMessage,
  onEditMessage,
}) => {
  const modal = useModals();
  const getModalId = useId();

  const handleDeleteMessage = async () => {
    const modalId = getModalId();
    modal.show(
      <ModalConfirm
        modalKey={modalId}
        content={<DeleteContent />}
        onConfirm={onDeleteMessage}
      />,
      {
        isDialog: true,
        modalId: modalId,
        height: "fit-content",
        width: "fit-content",
      }
    );
  };
  return (
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
  );
};

export default MessageEditMenuAction;

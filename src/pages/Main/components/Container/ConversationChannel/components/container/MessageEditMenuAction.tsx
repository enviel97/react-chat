import ModalConfirm from "@components/Modal/components/ModalConfirm";
import useId from "@components/Modal/hooks/useId";
import { useModals } from "@components/Modal/hooks/useModals";
import { ActionMenu } from "@components/Select";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchDeleteMessages } from "@store/repo/message";
import string from "@utils/string";
import { FC } from "react";
import { MdDeleteForever } from "react-icons/md";
interface MessageEditMenuActionProps {
  message: Message;
}

const Content = () => {
  return (
    <>
      This message will be deleted from the chat, you can't return it will
      accept the deletion
      <br />
      <b style={{ color: "red" }}>Are you sure about this</b>
    </>
  );
};

const MessageEditMenuAction: FC<MessageEditMenuActionProps> = ({ message }) => {
  const modal = useModals();
  const dispatch = useAppDispatch();
  const getModalId = useId();

  const handleDeleteMessage = async () => {
    const modalId = getModalId();
    modal.show(
      <ModalConfirm
        modalKey={modalId}
        content={<Content />}
        onConfirm={() => {
          dispatch(
            fetchDeleteMessages({
              messageId: string.getId(message),
              conversationId: message.conversationId,
            })
          );
        }}
      />,
      {
        isDialog: true,
        key: modalId,
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
      ]}
      isVerticalIcon
    />
  );
};

export default MessageEditMenuAction;

import ModalConfirm from "@components/Modal/components/ModalConfirm";
import { useModals } from "@components/Modal/hooks/useModals";
import { useCallback, useRef, useState } from "react";
import { toast, ToastItem } from "react-toastify";
import { EditContent } from "../modals/Modal.content";

const modalKey = "editConfirmKey";
const toastWarningKey = "editConfirmKeyToast";
const modalOption = {
  modalId: modalKey,
  height: "fit-content",
  width: "fit-content",
};

interface Props {
  initialMessage: string;
  setCaretCursor: (node: HTMLDivElement, content: string) => void;
  onConfirmEdit: (newMessage?: string) => void;
}

const useEditedConfirmModal = ({
  initialMessage,
  setCaretCursor,
  onConfirmEdit,
}: Props) => {
  const modal = useModals();
  const target = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState(initialMessage);

  const reFocusMess = () => {
    if (!target.current) return;
    const text = target.current.textContent ?? initialMessage;
    setCaretCursor(target.current, content);
    setContent(text);
  };

  const isInvalidNewMessage = (newMessage: string) => {
    if (newMessage) return false;
    if (toast.isActive(toastWarningKey)) return true;
    toast.warn("Edit message don't allow empty", {
      toastId: toastWarningKey,
    });
    toast.onChange((toastItem: ToastItem) => {
      if (toastItem.status === "added") {
        reFocusMess();
        setContent(initialMessage);
      }
    });
    return true;
  };

  const onBack = useCallback(() => {
    if (target.current) {
      target.current.textContent = initialMessage;
    }
    onConfirmEdit();
    setContent(initialMessage);
  }, [target, initialMessage, onConfirmEdit]);

  const onConfirm = useCallback(
    (newMessage: string) => {
      onConfirmEdit(newMessage);
      setContent(newMessage);
    },
    [onConfirmEdit]
  );

  const onSubmit = (newMessage: string) => {
    if (isInvalidNewMessage(newMessage)) return;
    modal.show(
      <ModalConfirm
        modalKey={modalKey}
        content={<EditContent messageDirty={newMessage} />}
        onConfirm={() => onConfirm(newMessage)}
        onBack={onBack}
      />,
      { ...modalOption, handleClose: reFocusMess }
    );
  };
  return { target, content, onSubmit };
};
export default useEditedConfirmModal;

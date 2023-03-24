import ModalConfirm from "@components/Modal/components/ModalConfirm";
import { useModals } from "@components/Modal/hooks/useModals";
import {
  FC,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  FocusEvent,
  memo,
  useCallback,
} from "react";
import { toast, ToastItem } from "react-toastify";
import { EditContent } from "../Modal.content";
import { MessageContentContainer } from "./styles/MessageContent.decorate";

interface MessageContentProps {
  isEditable: boolean;
  message: string;
  fromYou: boolean;
  onConfirmEdit: (value?: string) => void;
}

const modalKey = "editConfirmKey";
const toastWarningKey = "editConfirmKeyToast";
const modalOption = {
  modalId: modalKey,
  height: "fit-content",
  width: "fit-content",
};

const MessageContent: FC<MessageContentProps> = ({
  isEditable,
  message,
  onConfirmEdit,
  fromYou,
}) => {
  const [content, setContent] = useState(message);
  const messageRef = useRef<HTMLDivElement | null>(null);
  const modal = useModals();

  const setCaretCursor = (node: any, content: string) => {
    const sel = window.getSelection();
    if (sel && content.length > 0) {
      const range = document.createRange();
      range.setStart(node.childNodes[0], content.length);
      range.collapse(true);

      sel.removeAllRanges();
      sel.addRange(range);
    }
    node.focus();
  };

  useEffect(() => {
    const messageContent = messageRef.current;
    if (!isEditable || !messageContent || !messageContent.isContentEditable) {
      return;
    }
    setCaretCursor(messageContent, content);
  }, [isEditable, content]);

  const reFocusMess = () => {
    if (messageRef.current) {
      const text = messageRef.current.textContent ?? message;
      setCaretCursor(messageRef.current, content);
      setContent(text);
    }
  };

  const onBack = useCallback(() => {
    if (messageRef.current) {
      messageRef.current.textContent = message;
    }
    onConfirmEdit();
    setContent(message);
  }, [messageRef, message, onConfirmEdit]);

  const onConfirm = useCallback(
    (newMessage: string) => {
      onConfirmEdit(newMessage);
      setContent(newMessage);
    },
    [onConfirmEdit]
  );

  const isInvalidNewMessage = (newMessage: string) => {
    if (newMessage) return false;
    if (toast.isActive(toastWarningKey)) return true;
    toast.warn("Edit message don't allow empty", {
      toastId: toastWarningKey,
    });
    toast.onChange((toastItem: ToastItem) => {
      if (toastItem.status === "added") {
        reFocusMess();
        setContent(message);
      }
    });
    return true;
  };

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

  const onBlurred = (event: FocusEvent) => {
    if (!isEditable) return;
    const text = event.target.innerHTML ?? message;
    if (message !== text) {
      onSubmit(text);
    } else {
      onConfirmEdit();
      event.target.innerHTML = message;
    }
  };

  const handleBlurred = (event: any) => {
    event.preventDefault();
    messageRef.current?.blur();
    onBlurred(event as any);
  };

  const onKeyPressDetection = (event: KeyboardEvent) => {
    if (!isEditable) return;
    const key = event.key;
    switch (key) {
      case "Enter":
        if (!event.shiftKey) handleBlurred(event);
        break;
      case "Escape":
        handleBlurred(event);
        break;
    }
  };

  return (
    <>
      <MessageContentContainer
        fromYou={fromYou}
        ref={messageRef}
        contentEditable={isEditable}
        suppressContentEditableWarning={true}
        onBlur={onBlurred}
        onKeyDown={onKeyPressDetection}
        role='textbox'
      >
        {content}
      </MessageContentContainer>
    </>
  );
};

export default memo(MessageContent);

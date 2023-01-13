import ModalConfirm from "@components/Modal/components/ModalConfirm";
import { useModals } from "@components/Modal/hooks/useModals";
import {
  FC,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  FocusEvent,
} from "react";
import { MessageBodyContainer } from "../../styles/Message.decorate";
import { EditContent } from "./Modal.content";
interface MessageContentProps {
  isEditable: boolean;
  message: string;
  setEditable: (value: boolean) => void;
}
const MessageContent: FC<MessageContentProps> = ({
  isEditable,
  message,
  setEditable,
}) => {
  const [content, setContent] = useState(message);
  const messageRef = useRef<HTMLDivElement | null>(null);

  const modal = useModals();

  const setCaretCursor = (node: any, content: string) => {
    const sel = window.getSelection();
    if (sel) {
      const range = document.createRange();
      range.setStart(node.childNodes[0], content.length);
      range.collapse(true);

      sel.removeAllRanges();
      sel.addRange(range);
      node.focus();
    }
  };

  useEffect(() => {
    const messageContent = messageRef.current;
    if (!isEditable || !messageContent || !messageContent.isContentEditable) {
      return;
    }
    setCaretCursor(messageContent, content);
  }, [isEditable, content]);

  const onSubmit = (newMessage: string) => {
    const modalKey = "editConfirmKey";
    modal.show(
      <ModalConfirm
        modalKey={modalKey}
        content={<EditContent messageDirty={newMessage} />}
        onConfirm={() => {
          setContent(newMessage);
          setEditable(false);
        }}
        onBack={() => {
          if (messageRef.current) {
            messageRef.current.textContent = message;
          }
          setContent(message);
          setEditable(false);
        }}
      />,
      {
        modalId: modalKey,
        height: "fit-content",
        width: "fit-content",
        handleClose: () => {
          if (messageRef.current) {
            const text = messageRef.current.textContent ?? message;
            setContent(text);
            setCaretCursor(messageRef.current, content);
          }
        },
      }
    );
  };

  const onBlurred = (event: FocusEvent) => {
    if (!isEditable) return;
    const text = event.target.innerHTML ?? message;
    if (message !== text) {
      onSubmit(text);
    } else {
      setEditable(false);
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
    <MessageBodyContainer
      ref={messageRef}
      contentEditable={isEditable}
      suppressContentEditableWarning={true}
      onBlur={onBlurred}
      onKeyDown={onKeyPressDetection}
      role='textbox'
    >
      {content}
    </MessageBodyContainer>
  );
};

export default MessageContent;

import { FC, useEffect, useRef, KeyboardEvent, FocusEvent, memo } from "react";
import useEditedConfirmModal from "./hooks/useEditedConfirmModal";
import { MessageContentContainer } from "./styles/MessageContent.decorate";

interface MessageContentProps {
  isEditable: boolean;
  message: string;
  fromYou: boolean;
  onConfirmEdit: (value?: string) => void;
}

const MessageContent: FC<MessageContentProps> = ({
  isEditable,
  message,
  onConfirmEdit,
  fromYou,
}) => {
  const messageRef = useRef<HTMLDivElement | null>(null);
  const setCaretCursor = (node: HTMLDivElement, content: string) => {
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

  const { target, content, onSubmit } = useEditedConfirmModal({
    initialMessage: message,
    setCaretCursor,
    onConfirmEdit,
  });

  useEffect(() => {
    const messageContent = messageRef.current;
    if (!isEditable || !messageContent) {
      return;
    }
    setCaretCursor(messageContent, content);
  }, [isEditable, content]);

  /**
   * Handle Submit edited
   */

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

  const onKeyPressDetection = (event: KeyboardEvent) => {
    if (!isEditable) return;
    const key = event.key;
    if ((key === "Enter" && !event.shiftKey) || key === "Escape") {
      event.preventDefault();
      messageRef.current?.blur();
    }
  };

  return (
    <MessageContentContainer
      ref={(instants) => {
        messageRef.current = instants;
        target.current = instants;
      }}
      contentEditable={isEditable}
      suppressContentEditableWarning={true}
      onBlur={onBlurred}
      onKeyDown={onKeyPressDetection}
      role='textbox'
      // Styled action
      $fromYou={fromYou}
    >
      {content}
    </MessageContentContainer>
  );
};

export default memo(MessageContent);

import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MESSAGE_FORM_SENDING } from "../../common/form";
import useSendNotificationTyping from "../../hooks/useSendNotificationTyping";
import { ChannelSendingInput } from "../../styles/ChannelSendForm.decorate";
const maxLines = 4;

interface MessageInputProps {
  conversationId: string;
}

const MessageInput: FC<MessageInputProps> = ({ conversationId }) => {
  const [lines, setLines] = useState(1);
  const handleOnChange = useSendNotificationTyping(conversationId);

  const {
    register,
    getValues,
    formState: { isSubmitting },
  } = useFormContext<ChannelSendFormValue>();

  const handleNewLines = useCallback(() => {
    const value = getValues("message");
    setLines((_) => Math.min(value.split("\n").length, maxLines));
  }, [getValues]);

  const handleEnter = useCallback(
    (event: KeyboardEvent) => {
      if (event.shiftKey) handleNewLines();
      else {
        event.preventDefault();
        const forms = document.forms.namedItem(MESSAGE_FORM_SENDING);
        forms?.requestSubmit();
      }
    },
    [handleNewLines]
  );

  const keyListenersMap = useMemo(() => {
    return new Map([
      ["Enter", handleEnter],
      ["Backspace", handleNewLines],
      ["Delete", handleNewLines],
    ]);
  }, [handleEnter, handleNewLines]);

  useEffect(() => {
    const input = document.getElementById("message");
    if (!input) return;
    //
    const keyListener = (event: KeyboardEvent) => {
      const listener = keyListenersMap.get(event.key);
      listener && listener(event);
    };
    input.addEventListener("keydown", keyListener);
    return () => {
      input.removeEventListener("keydown", keyListener);
    };
  }, [keyListenersMap]);

  return (
    <ChannelSendingInput
      id='message'
      label='Enter message'
      type='rich'
      fontSize='1.2rem'
      maxLines={lines}
      register={register("message", {
        disabled: isSubmitting,
        onChange: handleOnChange,
      })}
    />
  );
};

export default memo(MessageInput);

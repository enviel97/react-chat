import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface SendingValue {
  message: string;
}

interface Props {
  conversationId: string;
  onSubmit: (value: string) => void;
  onChange: (value?: string) => void;
}

const maxLines = 4;
const MESSAGE = "message";

const useFormSendMessageController = ({
  conversationId: id,
  onSubmit,
  onChange,
}: Props) => {
  const {
    register,
    setFocus,
    resetField,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = useForm<SendingValue>({
    defaultValues: { message: "" },
  });
  const [lines, setLines] = useState(1);

  const resetValue = useCallback(() => {
    setFocus(MESSAGE);
    resetField(MESSAGE);
    setLines(1);
  }, [resetField, setFocus]);

  useEffect(resetValue, [id, resetValue]);

  const _handleSubmit = useCallback(() => {
    const value = getValues(MESSAGE);
    if (!value) return;
    onSubmit(value);
    resetValue();
  }, [getValues, resetValue, onSubmit]);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        _handleSubmit();
      } else if (event.key === "Enter" || event.key === "Backspace") {
        const value = getValues(MESSAGE);
        setLines((_) => Math.min(value.split("\n").length, maxLines));
      }
    },
    [_handleSubmit, getValues]
  );

  useEffect(() => {
    const input = document.getElementById(MESSAGE);
    if (!input) return;
    input.addEventListener("keydown", handleKeydown);
    return () => {
      input.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  return {
    lines,
    setValue,
    isSubmitting,
    getValues,
    handleSubmit: _handleSubmit,
    register: register(MESSAGE, {
      disabled: isSubmitting,
      onChange: onChange,
    }),
  };
};

export default useFormSendMessageController;

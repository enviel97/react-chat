import { useCallback, useEffect, useRef } from "react";

const useCaretPosition = (inputId: string) => {
  const caretPosition = useRef<number>();

  const hookCaretPosition = useCallback((event: any) => {
    const target = event.target;
    if (
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLInputElement
    ) {
      caretPosition.current = target.selectionStart!;
    }
  }, []);

  useEffect(() => {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener("click", hookCaretPosition);
    input.addEventListener("keydown", hookCaretPosition);
    return () => {
      input.removeEventListener("click", hookCaretPosition);
      input.removeEventListener("keydown", hookCaretPosition);
    };
  }, [hookCaretPosition, inputId]);

  return caretPosition;
};

export default useCaretPosition;

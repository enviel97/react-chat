import { useCallback, useEffect, useRef, useState } from "react";

const useCLoseOnClickOutside = (
  /**
   * Active press press esc to close dropdown
   */
  pressEscapeToClose?: boolean
) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<any>();

  const handleClosing = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleOpening = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onPressEscape = useCallback(
    (event: KeyboardEvent) => {
      if (pressEscapeToClose && event.key === "Escape") {
        setIsOpen(false);
      }
    },
    [pressEscapeToClose]
  );

  const onClickEvent = useCallback(
    (event: MouseEvent | TouchEvent) => {
      console.log({ current: ref.current, event: event.target });
      if (
        !ref.current ||
        !event.target ||
        !ref.current.contains(event.target)
      ) {
        event.stopPropagation();
        setIsOpen(false);
      }
    },
    [ref]
  );

  useEffect(() => {
    document.addEventListener("click", onClickEvent);
    document.addEventListener("touchstart", onClickEvent);
    document.addEventListener("keydown", onPressEscape);

    return () => {
      document.removeEventListener("click", onClickEvent);
      document.removeEventListener("touchstart", onClickEvent);
      document.removeEventListener("keydown", onPressEscape);
    };
  }, [onPressEscape, onClickEvent]);

  return {
    targetRef: ref,
    isOpen,
    close: handleClosing,
    open: handleOpening,
    toggle: handleToggle,
  };
};

export default useCLoseOnClickOutside;

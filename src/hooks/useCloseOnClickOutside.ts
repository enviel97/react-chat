import { useCallback, useLayoutEffect, useRef, useState } from "react";

const useCLoseOnClickOutside = (pressEscapeToClose?: boolean) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<any>();

  const handleClosing = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const onPressEscape = useCallback((event: KeyboardEvent) => {
    if (pressEscapeToClose && event.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  const onClickEvent = useCallback(
    (event: MouseEvent) => {
      if (!ref.current || !event.target) return;
      if (!ref.current.contains(event.target)) {
        event.preventDefault();
        setIsOpen(false);
      }
    },
    [ref]
  );

  useLayoutEffect(() => {
    document.addEventListener("click", onClickEvent);
    document.addEventListener("keydown", onPressEscape);

    return () => {
      document.removeEventListener("click", onClickEvent);
      document.removeEventListener("keydown", onPressEscape);
    };
  }, [onPressEscape, onClickEvent]);

  return {
    targetRef: ref,
    isOpen,
    close: handleClosing,
    toggle: handleToggle,
  };
};

export default useCLoseOnClickOutside;

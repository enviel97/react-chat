import { useLayoutEffect, useRef, useState } from "react";

const useCLoseOnClickOutside = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<any>();

  const handleClosing = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useLayoutEffect(() => {
    const onClickEvent = (event: any) => {
      if (!ref.current || !event.target) return;
      if (!ref.current.contains(event.target)) {
        event.preventDefault();
        setIsOpen(false);
      }
    };
    window.addEventListener("click", onClickEvent);

    return () => {
      window.removeEventListener("click", onClickEvent);
    };
  }, []);

  return {
    targetRef: ref,
    isOpen,
    close: handleClosing,
    toggle: handleToggle,
  };
};

export default useCLoseOnClickOutside;

import { useEffect, useRef } from "react";

const useRemoveRange = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const item = ref.current;
    if (!item) return;
    const unSelected = (event: MouseEvent) => {
      const sel = document.getSelection();
      const clickElement = event.target as any;
      if (
        sel &&
        item.contains(clickElement) &&
        clickElement.role !== "textbox" &&
        sel.type === "Range"
      ) {
        event.stopPropagation();
        sel.removeAllRanges();
      }
    };
    document.addEventListener("click", unSelected);
    return () => document.removeEventListener("click", unSelected);
  }, [ref]);

  return { target: ref };
};

export default useRemoveRange;

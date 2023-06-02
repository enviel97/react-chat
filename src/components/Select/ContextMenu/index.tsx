import useCLoseOnClickOutside from "@hooks/useCloseOnClickOutside";
import { AnimatePresence } from "framer-motion";
import { createContext, FC, memo, useEffect, useMemo, useRef } from "react";
import { useCallback, useState } from "react";
import ContextMenu from "./components/ContextMenu";
import {
  MenuContextContainer,
  MenuOpacity,
} from "./styles/MenuContext.decorate";
import { MenuContextAnimation } from "./styles/variants";

export const MenuContext = createContext<MenuContext>({
  selectedValue: {},
  onContextMenu(event) {
    event.preventDefault();
    throw new Error("Method not implement");
  },
  close() {
    throw new Error("Method not implement");
  },
});

const ContextMenuProvider: FC<ContextMenuProviderProps> = ({
  children,
  menuItem,
  menuTitle,
  height,
  width,
  disable,
}) => {
  const targetValue = useRef<any>();
  const [clickPointer, setClickPointer] = useState({
    x: 0,
    y: 0,
  });
  const { targetRef, isOpen, open, close } = useCLoseOnClickOutside();
  const preventContextMenu = (event: ContextMenuEvent) => {
    event.preventDefault();
    setClickPointer({
      x: event.pageX,
      y: event.pageY,
    });
  };
  const onContextMenu = useCallback(
    (value: any) => {
      open();
      targetValue.current = value;
    },
    [open]
  );

  const motionProps = useMemo(() => {
    const { x, y } = clickPointer;
    return MenuContextAnimation({ top: y, left: x });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickPointer.x, clickPointer.y]);

  useEffect(() => {
    return close;
  }, [close]);

  return (
    <MenuContext.Provider
      value={{
        selectedValue: targetValue.current,
        onContextMenu,
        close,
      }}
    >
      <MenuOpacity onContextMenu={preventContextMenu}>
        {children}
        <AnimatePresence
          initial={false}
          mode='wait'
          onExitComplete={() => null}
        >
          {isOpen && !disable && (
            <MenuContextContainer
              ref={targetRef}
              $height={height}
              $width={width}
              {...motionProps}
            >
              <ContextMenu menuTitle={menuTitle} items={menuItem} />
            </MenuContextContainer>
          )}
        </AnimatePresence>
      </MenuOpacity>
    </MenuContext.Provider>
  );
};

export default memo(ContextMenuProvider);

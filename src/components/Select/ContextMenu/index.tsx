import useCLoseOnClickOutside from "@hooks/useCloseOnClickOutside";
import { AnimatePresence } from "framer-motion";
import React, {
  createContext,
  forwardRef,
  memo,
  useImperativeHandle,
} from "react";
import { useCallback, useState } from "react";
import ContextMenu from "./components/ContextMenu";
import { MenuContextContainer } from "./styles/MenuContext.decorate";
import { MenuContextAnimation } from "./styles/variants";

interface ContextMenuProviderProps extends Components {
  height?: string;
  width?: string;
  menuItem: ContextMenuOption[];
  menuTitle?: string;
}

type ContextMenuEvent = React.MouseEvent<HTMLElement, MouseEvent>;

export const MenuContext = createContext<any>({});

const ContextMenuProvider = forwardRef<
  ContextMenuRef,
  ContextMenuProviderProps
>(({ children, menuItem, menuTitle, height, width }, ref) => {
  const [selectedValue, setSelectedValue] = useState();
  const [clickPointer, setClickPointer] = useState({
    x: 0,
    y: 0,
  });
  const { targetRef, isOpen, open } = useCLoseOnClickOutside();

  const onContextMenu = useCallback(
    (e: ContextMenuEvent, value: any) => {
      e.preventDefault();
      open();
      setClickPointer({
        x: e.pageX,
        y: e.pageY,
      });
      setSelectedValue(value);
    },
    [open]
  );

  useImperativeHandle(
    ref,
    () => ({
      onContextMenu,
    }),
    [onContextMenu]
  );

  return (
    <MenuContext.Provider value={selectedValue}>
      {children}
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {isOpen && (
          <MenuContextContainer
            ref={targetRef}
            $height={height}
            $width={width}
            $top={clickPointer.y}
            $left={clickPointer.x}
            variants={MenuContextAnimation}
            initial='exit'
            animate='enter'
            exit='exit'
          >
            <ContextMenu menuTitle={menuTitle} items={menuItem} />
          </MenuContextContainer>
        )}
      </AnimatePresence>
    </MenuContext.Provider>
  );
});

export default memo(ContextMenuProvider);

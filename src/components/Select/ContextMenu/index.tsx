import { AnimatePresence } from "framer-motion";
import React, {
  createContext,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
} from "react";
import { useCallback, useState } from "react";
import ContextMenu from "./components/ContextMenu";
import { MenuContextTrigger } from "./styles/MenuContext.decorate";

interface ContextMenuProviderProps
  extends Components,
    ContextMenuContainerProps {
  menuItem: ContextMenuOption[];
  menuTitle?: string;
}

type ContextMenuEvent = React.MouseEvent<HTMLElement, MouseEvent>;

export const MenuContext = createContext<any>({});

const ContextMenuProvider = forwardRef<
  ContextMenuRef,
  ContextMenuProviderProps
>(({ children, menuItem, menuTitle, ...props }, ref) => {
  const [isShow, setShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [clickPointer, setClickPointer] = useState({
    x: 0,
    y: 0,
  });

  const onContextMenu = useCallback((e: ContextMenuEvent, value: any) => {
    e.preventDefault();
    setShow(true);
    setClickPointer({
      x: e.pageX,
      y: e.pageY,
    });
    setSelectedValue(value);
  }, []);

  const onHandleClick = useCallback(() => {
    isShow && setShow(false);
  }, [isShow]);

  useEffect(() => {
    window.addEventListener("click", onHandleClick);
    return () => window.removeEventListener("click", onHandleClick);
  }, [onHandleClick]);

  useImperativeHandle(
    ref,
    () => ({
      onContextMenu,
    }),
    [onContextMenu]
  );

  return (
    <MenuContext.Provider value={selectedValue}>
      <MenuContextTrigger key='Provider'>
        {children}
        <AnimatePresence
          initial={false}
          mode='wait'
          onExitComplete={() => null}
        >
          {isShow && (
            <ContextMenu
              {...props}
              menuTitle={menuTitle}
              items={menuItem}
              top={clickPointer.y}
              left={clickPointer.x}
            />
          )}
        </AnimatePresence>
      </MenuContextTrigger>
    </MenuContext.Provider>
  );
});

export default memo(ContextMenuProvider);

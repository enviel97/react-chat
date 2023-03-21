import { FC } from "react";
import ContextMenuItems from "./ContextMenuItem";
import {
  MenuContextContainer,
  MenuContextTitle,
} from "../styles/MenuContext.decorate";
import { MenuContextAnimation } from "../styles/variants";

const ContextMenu: FC<ContextMenuProps> = ({
  menuTitle,
  items,
  ...containerDecorate
}) => {
  return (
    <MenuContextContainer
      {...containerDecorate}
      variants={MenuContextAnimation}
      initial='exit'
      animate='enter'
      exit='exit'
    >
      {menuTitle && (
        <MenuContextTitle>
          <span>{menuTitle}</span>
        </MenuContextTitle>
      )}
      {items.map((item, index) => (
        <ContextMenuItems
          key={`${item.label ?? "label"}${index}`}
          item={item}
          hoverColor={item.hoverColor}
          hoverBackgroundColor={item.hoverBackgroundColor}
        />
      ))}
    </MenuContextContainer>
  );
};

export default ContextMenu;

import { FC, memo } from "react";
import ContextMenuItems from "./ContextMenuItem";
import { MenuContextTitle } from "../styles/MenuContext.decorate";

const ContextMenu: FC<ContextMenuProps> = ({ menuTitle, items }) => {
  return (
    <>
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
    </>
  );
};

export default memo(ContextMenu);

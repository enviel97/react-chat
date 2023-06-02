import { colorBrightness } from "@theme/helper/tools";
import { FC, memo } from "react";
import { useTheme } from "styled-components";
import useContextMenu from "../hooks/useContextMenu";
import { MenuContextItemContainer } from "../styles/MenuContextItem.decorate";

const ContextMenuItems: FC<ContextMenuItemProps> = ({
  item: { icon, label = "Label", onClick },
  hoverColor,
  hoverBackgroundColor,
  ...containerDecorate
}) => {
  const { selectedValue, close } = useContextMenu();
  const theme = useTheme();
  return (
    <MenuContextItemContainer
      {...containerDecorate}
      onClick={() => {
        onClick && onClick(selectedValue);
        close();
      }}
      whileHover={{
        scale: 1.05,
        backgroundColor:
          hoverBackgroundColor ?? colorBrightness(theme.surfaceColor, 10),
        color: hoverColor,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{ bounce: 0 }}
    >
      <i>{icon}</i>
      <span>{label}</span>
    </MenuContextItemContainer>
  );
};

export default memo(ContextMenuItems);

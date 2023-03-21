import { colorBrightness } from "@theme/helper/tools";
import { FC, useContext } from "react";
import { useTheme } from "styled-components";
import { MenuContext } from "..";
import { MenuContextItemContainer } from "../styles/MenuContextItem.decorate";

const ContextMenuItems: FC<ContextMenuItemProps> = ({
  item: { icon, label = "Label", onClick },
  hoverColor,
  hoverBackgroundColor,
  ...containerDecorate
}) => {
  const selectedValue = useContext(MenuContext);
  const theme = useTheme();
  return (
    <MenuContextItemContainer
      {...containerDecorate}
      onClick={() => {
        onClick && onClick(selectedValue);
      }}
      whileHover={{
        fontSize: "16px",
        backgroundColor:
          hoverBackgroundColor ?? colorBrightness(theme.surfaceColor, 10),
        color: hoverColor,
      }}
    >
      <i>{icon}</i>
      <span>{label}</span>
    </MenuContextItemContainer>
  );
};

export default ContextMenuItems;

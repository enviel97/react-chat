interface ContextMenuContainerProps {
  width?: string;
  height?: string;
}

interface ContextMenuItemContainerProps {
  hoverColor?: string;
  hoverBackgroundColor?: string;
}

interface ContextMenuOption extends ContextMenuItemContainerProps {
  icon: any;
  label: string;
  onClick?: (value: any) => Promise<void> | void;
}

interface ContextMenuRef {
  onContextMenu: <T>(
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: T
  ) => void;
}

interface ContextMenuProps extends ContextMenuContainerProps {
  top: number;
  left: number;
  menuTitle?: string;
  items: ContextMenuOption[];
}

interface ContextMenuItemProps extends ContextMenuItemContainerProps {
  item: ContextMenuOption;
}
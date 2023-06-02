type ContextMenuEvent = React.MouseEvent<HTMLElement, MouseEvent>;

interface ContextMenuProviderProps extends Components {
  height?: string;
  width?: string;
  menuItem: ContextMenuOption[];
  menuTitle?: string;
  disable?: boolean;
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

interface ContextMenuProps extends ContextMenuContainerProps {
  width?: string;
  height?: string;
  menuTitle?: string;
  items: ContextMenuOption[];
}

interface ContextMenuItemProps extends ContextMenuItemContainerProps {
  item: ContextMenuOption;
}

interface MenuContext {
  selectedValue: any;
  onContextMenu(targetValue: any): void;
  close(): void;
}

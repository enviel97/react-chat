interface Options {
  icon: any;
  label?: string;
  onClick?: () => Promise<void> | void;
}

interface ActionMenuProps {
  isVerticalIcon: boolean;
  options: Options[];
  size?: string;
}

interface MenuToggleProps {
  size: string;
}

import useBreakpoint from "@hooks/useBreakpoint";
import { AnimatePresence } from "framer-motion";
import { FC, memo, ReactNode, useMemo } from "react";
import { IconContext } from "react-icons";
import {
  iconVariants,
  NavLinkIcon,
  NavLinkItem,
  NavLinkLabel,
  SelectBorder,
} from "../../styles/NavLinkAction.decorate";

export interface NavLinkAnimationController {
  isActive?: boolean;
  isSelected?: boolean;
}

interface NavLinkActionProps extends NavLinkAnimationController, Components {
  to: string;
  label: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
}

const NavLinkAction: FC<NavLinkActionProps> = ({
  to,
  icon,
  label,
  isActive,
  isSelected,
  children,
}) => {
  const layoutIdShared = useMemo(() => SelectBorder, []);
  const breakpoint = useBreakpoint();
  const status = useMemo(
    () => (isSelected ? "active" : "un-active"),
    [isSelected]
  );

  return (
    <AnimatePresence mode='wait' initial={false}>
      <NavLinkItem id={to} to={to} $status={status}>
        {isActive && <SelectBorder layoutId={layoutIdShared} />}
        <IconContext.Provider value={{ color: "currentColor", size: "100%" }}>
          <NavLinkIcon
            variants={iconVariants}
            animate={isSelected ? "select" : "unselect"}
            transition={{
              duration: 0.3,
              bounce: 0,
            }}
          >
            {icon}
            {children}
          </NavLinkIcon>
        </IconContext.Provider>
        {breakpoint.up("mobile") && <NavLinkLabel>{label}</NavLinkLabel>}
      </NavLinkItem>
    </AnimatePresence>
  );
};

export default memo(NavLinkAction);

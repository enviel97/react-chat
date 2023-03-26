import useAppDispatch from "@hooks/useAppDispatch";
import useBreakpoint from "@hooks/useBreakpoint";
import { AnimatePresence } from "framer-motion";
import { FC, memo, ReactNode, useMemo } from "react";
import { IconContext } from "react-icons";
import {
  iconVariants,
  KTooltip,
  NavLinkIcon,
  NavLinkItem,
  NavLinkLabel,
  SelectBorder,
} from "../../styles/NavLinkAction.decorate";

export interface NavLinkAnimationController {
  isActive?: boolean;
  isSelected?: boolean;
}

interface NavLinkActionProps extends NavLinkAnimationController {
  to: string;
  label: string;
  icon: ReactNode;
  quantity?: number;
  activeIcon?: ReactNode;
}

const NavLinkAction: FC<NavLinkActionProps> = ({
  to,
  icon,
  label,
  quantity,
  isActive,
  isSelected,
}) => {
  const layoutIdShared = useMemo(() => SelectBorder, []);
  const breakpoint = useBreakpoint();
  const status = useMemo(
    () => (isSelected ? "active" : "un-active"),
    [isSelected]
  );

  return (
    <AnimatePresence mode='wait' initial={false}>
      <NavLinkItem to={to} status={status}>
        {isActive && <SelectBorder layoutId={layoutIdShared} />}
        <IconContext.Provider value={{ color: "currentColor", size: "100%" }}>
          <NavLinkIcon
            status={status}
            id={to}
            variants={iconVariants}
            animate={isSelected ? "select" : "unselect"}
            transition={{
              duration: 0.3,
              bounce: 0,
            }}
          >
            {icon}
          </NavLinkIcon>
          {breakpoint.down("mobile") ? (
            <KTooltip
              key={"rightTooltip"}
              isOpen={Number.isSafeInteger(quantity)}
              anchorId={to}
              content={`${quantity}`}
              place={"right"}
            />
          ) : (
            <KTooltip
              key={"leftTooltip"}
              isOpen={Number.isSafeInteger(quantity)}
              id='NewFriendTooltip'
              anchorId={to}
              content={`${quantity}`}
              place={"left"}
            />
          )}
        </IconContext.Provider>
        {breakpoint.up("mobile") && <NavLinkLabel>{label}</NavLinkLabel>}
      </NavLinkItem>
    </AnimatePresence>
  );
};

export default memo(NavLinkAction);

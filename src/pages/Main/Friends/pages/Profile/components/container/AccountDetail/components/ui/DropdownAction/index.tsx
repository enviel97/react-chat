import useCLoseOnClickOutside from "@hooks/useCloseOnClickOutside";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { FC, memo, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import {
  MenuAnimation,
  MenuItemAnimation,
} from "./animation/dropdown.animation";
import { dropdownActionOptions } from "./common/options.static";
import DropdownActionItem from "./components/DropdownActionItem";
import DropdownActionValue from "./components/DropdownActionValueContainer";
import {
  DropdownActionContainer,
  DropdownActionMenu,
  DropdownActionMenuItem,
} from "./styles/DropdownAction.decorate";

const DropdownAction: FC<DropdownActionProps> = ({
  defaultValue,
  onSelectedOption,
}) => {
  const [selectedOption, setSelectedOption] =
    useState<UserStatus>(defaultValue);
  const { targetRef, isOpen, toggle, close } = useCLoseOnClickOutside(true);
  const theme = useTheme();

  const reduceMotion = useReducedMotion();
  const { menuAnimation, menuItemAnimation } = useMemo(() => {
    return {
      menuAnimation: MenuAnimation.get(!!reduceMotion),
      menuItemAnimation: MenuItemAnimation.get(!!reduceMotion),
    };
  }, [reduceMotion]);

  const data = useMemo(() => {
    return dropdownActionOptions.filter(
      (option) => option.value !== selectedOption
    );
  }, [selectedOption]);

  return (
    <AnimatePresence mode='wait'>
      <DropdownActionContainer
        ref={targetRef}
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <DropdownActionValue value={selectedOption} onClickToggle={toggle} />

        <DropdownActionMenu
          initial={"closed"}
          animate={isOpen ? "open" : "closed"}
          variants={menuAnimation?.variants}
        >
          {isOpen &&
            data.map((option, index) => (
              <DropdownActionMenuItem
                layout
                key={`${option.value}$${index}`}
                variants={menuItemAnimation?.variants}
                transition={menuItemAnimation?.transition}
                whileHover={{ backgroundColor: theme.surfaceColor }}
              >
                <DropdownActionItem
                  value={option.value}
                  onClick={function (value: UserStatus): void {
                    setSelectedOption(value);
                    onSelectedOption(value);
                    close();
                  }}
                />
              </DropdownActionMenuItem>
            ))}
        </DropdownActionMenu>
      </DropdownActionContainer>
    </AnimatePresence>
  );
};

export default memo(DropdownAction);

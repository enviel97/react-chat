import { FC } from "react";
import { FiMoreHorizontal, FiMoreVertical } from "react-icons/fi";
import {
  MenuContainer,
  MenuItemContainer,
  MenuToggle,
} from "../decorates/ActionMenu.decorate";
import { pxToEm } from "@common/helper/tools";
import string from "@utils/string";
import { ButtonIcon } from "@components/Button";
import useCLoseOnClickOutside from "@hooks/useCloseOnClickOutside";

const ActionMenu: FC<ActionMenuProps> = ({
  options,
  isVerticalIcon,
  size = pxToEm(36),
}) => {
  const { targetRef, isOpen, toggle, close } = useCLoseOnClickOutside();

  return (
    <MenuContainer ref={targetRef}>
      <MenuToggle
        onClick={toggle}
        className={string.classList(isOpen ? "active" : "")}
        size={size}
      >
        {!isVerticalIcon && <FiMoreHorizontal />}
        {isVerticalIcon && <FiMoreVertical />}
      </MenuToggle>
      <MenuItemContainer size={size}>
        {options.map(({ icon, onClick, label }, index) => {
          const handlerOnItemClick = async () => {
            if (!onClick) return;
            try {
              await onClick();
              close();
            } catch (error) {
              console.error(error);
            }
          };

          return (
            <ButtonIcon
              key={`${label}_${index}`}
              size={pxToEm(30)}
              icon={icon}
              onClick={handlerOnItemClick}
              color='surface'
              hint={label}
              circle
            />
          );
        })}
      </MenuItemContainer>
    </MenuContainer>
  );
};

export default ActionMenu;

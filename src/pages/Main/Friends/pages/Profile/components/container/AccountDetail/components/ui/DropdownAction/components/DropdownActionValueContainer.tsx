import { FC, memo } from "react";
import { TbChevronDown } from "react-icons/tb";
import { MenuIcon } from "../animation/dropdown.animation";
import {
  DropdownActionValueContainer,
  IconBox,
  ItemBox,
} from "../styles/DropdownActionValue.decorate";
import DropdownActionItem from "./DropdownActionItem";

const DropdownActionValue: FC<DropdownActionValueProps> = ({
  value,
  onClickToggle,
}) => {
  return (
    <DropdownActionValueContainer onClick={onClickToggle}>
      <ItemBox>
        <DropdownActionItem value={value} />
      </ItemBox>
      <IconBox variants={MenuIcon.variants} transition={MenuIcon.transition}>
        <TbChevronDown />
      </IconBox>
    </DropdownActionValueContainer>
  );
};

export default memo(DropdownActionValue);

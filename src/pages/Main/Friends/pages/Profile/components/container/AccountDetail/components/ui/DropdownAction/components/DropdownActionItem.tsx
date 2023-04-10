import { FC, memo } from "react";
import { DropdownActionItemContainer } from "../styles/DropdownActionItem.decorate";

const DropdownActionItem: FC<DropdownActionItemProps> = ({
  value,
  onClick,
}) => {
  return (
    <DropdownActionItemContainer
      $value={value}
      onClick={() => {
        if (onClick) onClick(value);
      }}
    >
      {value}
    </DropdownActionItemContainer>
  );
};

export default memo(DropdownActionItem);

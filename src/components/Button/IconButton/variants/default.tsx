import { FC } from "react";
import { ButtonIconDecorate } from "../decorates/default";
import Button from "./base";

interface IButtonIconProps extends ButtonIconProps, ButtonDecorate {
  hint?: string;
  isTransparent?: boolean;
}

const ButtonIcon: FC<IButtonIconProps> = ({
  icon,
  disabled,
  onClick,
  type = "button",
  itemType,
  hint,
  ...ref
}) => {
  return (
    <ButtonIconDecorate {...ref}>
      <Button
        itemType={itemType}
        type={type}
        onClick={onClick}
        disabled={disabled}
        hint={hint}
        icon={<span>{icon}</span>}
      />
    </ButtonIconDecorate>
  );
};

export default ButtonIcon;

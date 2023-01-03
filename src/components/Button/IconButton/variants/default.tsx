import { FC, useId } from "react";
import { ButtonIconDecorate } from "../decorates/default";
import { Tooltip } from "react-tooltip";
import Button from "./base";

interface IButtonIconProps extends ButtonIconProps, ButtonDecorate {
  hint?: string;
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
  const id = useId();
  return (
    <ButtonIconDecorate id={id} {...ref}>
      <Button
        itemType={itemType}
        type={type}
        onClick={onClick}
        disabled={disabled}
        icon={<span>{icon}</span>}
      />
      {hint && (
        <Tooltip anchorId={id} content={hint} place='top' delayShow={100} />
      )}
    </ButtonIconDecorate>
  );
};

export default ButtonIcon;

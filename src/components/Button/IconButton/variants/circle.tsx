import { FC, memo, useMemo } from "react";
import { IconContext } from "react-icons/lib";
import LocalIcon from "../common/IconMapping";
import {
  ButtonCircleContainer,
  ButtonIconCircleAnimate,
  IconBox,
} from "../decorates/circle";

const ButtonCircle: FC<ButtonCircleProps> = ({
  icon,
  size = "2.25rem",
  color = { palette: "background" },
  disabled = false,
}) => {
  const Icon = useMemo(() => LocalIcon.get(icon), [icon]);
  const Animation = useMemo(
    () => ButtonIconCircleAnimate(disabled),
    [disabled]
  );

  if (!Icon) throw new Error(`Icon [${icon}] not found`);

  return (
    <ButtonCircleContainer
      $size={size}
      disabled={disabled}
      {...Animation.container}
      $color={color}
    >
      <IconBox {...Animation.icon}>
        <IconContext.Provider value={{ size: "70%" }}>
          {Icon}
        </IconContext.Provider>
      </IconBox>
    </ButtonCircleContainer>
  );
};

export default memo(ButtonCircle);

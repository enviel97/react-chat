import IconBase from "@components/Icon";
import { FC, memo, useMemo } from "react";
import { IconContext } from "react-icons/lib";
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
  onClick,
}) => {
  const Animation = useMemo(
    () => ButtonIconCircleAnimate(disabled),
    [disabled]
  );
  return (
    <ButtonCircleContainer
      $size={size}
      disabled={disabled}
      {...Animation.container}
      $color={color}
      onClick={onClick}
    >
      <IconBox {...Animation.icon}>
        <IconContext.Provider value={{ size: "70%" }}>
          <IconBase name={icon} />
        </IconContext.Provider>
      </IconBox>
    </ButtonCircleContainer>
  );
};

export default memo(ButtonCircle);

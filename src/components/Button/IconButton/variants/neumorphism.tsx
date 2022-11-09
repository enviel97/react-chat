import { Neumorphism } from "../decorates/neumorphism";
import Button from "./base";

const ButtonTextNeumorphism = (props: ButtonDecorate & ButtonIconProps) => {
  const { size, textColor, className, color, ...rest } = props;

  return (
    <Neumorphism
      className={className}
      size={size}
      textColor={textColor}
      color={color}
    >
      <Button {...rest} />
    </Neumorphism>
  );
};

export default ButtonTextNeumorphism;

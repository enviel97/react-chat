import { Neumorphism } from "../decorate/neumorphism";
import Button from "./base";

const ButtonTextNeumorphism = (props: ButtonDecorate & ButtonTextProps) => {
  const { height, width, textColor, className, color, ...rest } = props;

  return (
    <Neumorphism
      className={className}
      height={height}
      width={width}
      textColor={textColor}
      color={color}
    >
      <Button {...rest} />
    </Neumorphism>
  );
};

export default ButtonTextNeumorphism;

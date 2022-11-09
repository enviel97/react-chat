import { Base } from "../decorate/base";
import Button from "./base";

const ButtonText = (props: ButtonDecorate & ButtonTextProps) => {
  const { height, width, textColor, className, color, ...rest } = props;
  return (
    <Base
      className={className}
      height={height}
      width={width}
      textColor={textColor}
      color={color}
    >
      <Button {...rest} />
    </Base>
  );
};

export default ButtonText;

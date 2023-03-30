import { Base } from "../decorate/base";
import Button from "./base";

const ButtonText = (props: ButtonDecorate & ButtonTextProps) => {
  const { height, width, textColor, className, color, disabled, ...rest } =
    props;

  return (
    <Base
      className={className}
      height={height}
      width={width}
      textColor={textColor}
      color={color}
    >
      <Button {...rest} disabled={disabled} />
    </Base>
  );
};

export default ButtonText;

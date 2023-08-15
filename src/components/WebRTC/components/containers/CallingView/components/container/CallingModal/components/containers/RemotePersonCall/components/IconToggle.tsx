import IconBase from "@components/Icon";
import { FC, useState } from "react";
import Styles from "../styles/IconToggle.decorate";

interface IconToggleProps extends Pick<KTooltip, "data-tooltip-id"> {
  name: "Audio" | "Webcam";
  disabled?: boolean;
  defaultChecked?: boolean;
  onClick?: (checked: boolean) => void;
}

const IconToggle: FC<IconToggleProps> = ({
  name,
  disabled,
  onClick,
  defaultChecked = false,
  ...tooltip
}) => {
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const handleClick = () => {
    setChecked((prev) => {
      onClick && onClick(!prev);
      return !prev;
    });
  };

  return (
    <Styles.Box
      {...tooltip}
      data-tooltip-content={disabled ? "disabled" : checked ? "on" : "off"}
    >
      <Styles.Button
        disabled={disabled}
        onClick={handleClick}
        name={name}
        $checked={checked}
      >
        <IconBase name={name} size={"2.75em"} />
      </Styles.Button>
    </Styles.Box>
  );
};

export default IconToggle;

import { IconBase } from "@components/Icon";
import { FC, Fragment, useEffect, useState } from "react";
import Styles from "../../styles/IconToggle.decorate";

interface IconToggleProps {
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
}) => {
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const handleClick = () => {
    setChecked((prev) => {
      onClick && onClick(!prev);
      return !prev;
    });
  };

  return (
    <Fragment>
      <Styles.Box
        disabled={disabled}
        onClick={handleClick}
        name={name}
        $checked={checked}
      >
        <IconBase name={name} size={"2.75em"} />
        {disabled && (
          <Styles.Disabled>
            <IconBase name='Reject' size='1.5rem' />
          </Styles.Disabled>
        )}
      </Styles.Box>
      <Styles.Hint anchorSelect={`${Styles.Box}[name='${name}']`} place='left'>
        {checked && "on"}
        {!checked && "off"}
      </Styles.Hint>
    </Fragment>
  );
};

export default IconToggle;

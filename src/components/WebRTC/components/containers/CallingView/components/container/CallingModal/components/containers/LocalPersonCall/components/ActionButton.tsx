import Icon from "@components/Icon";
import { colorBrightness } from "@theme/helper/tools";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import styled from "styled-components";

interface ActionButtonProps extends Pick<KTooltip, "data-tooltip-id"> {
  iconName: "Audio" | "Webcam";
  disabled?: boolean;
  defaultState?: boolean;
  onClick?: () => void;
}

const ButtonContainer = styled.div`
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 70%;
  aspect-ratio: 1/1;
`;

const Button = styled(motion.button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2em;
  outline: none;
  border: none;
  height: 100%;
  width: 100%;
  border-radius: 10%;
  color: #454545;
  border: 2px solid #000000;
  background: ${({ theme }) => {
    const mainColor = theme.surfaceColor;
    const dark = colorBrightness(mainColor, -5);
    const light = colorBrightness(mainColor, 10);
    return `linear-gradient(${light}, ${mainColor}, ${dark})`;
  }};

  &:active:not(:disabled) {
    & svg {
      scale: 0.98;
      transition: scale 0.5ms ease-in-out;
    }
    &::before {
      filter: blur(3px);
    }
  }

  &:disabled {
    cursor: pointer;
    & svg {
      color: #303030;
      scale: 0.98;
    }
    &::before {
      filter: brightness(50%) blur(2px);
    }
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0.3em 0.2em;
    border-top: 2px solid var(--gray);
    filter: blur(2px);
  }
`;

const variants = {
  inactive: {
    color: "#454545",
    boxShadow: [
      "inset 0 0.25em 0.0625em rgba(0, 0, 0, 0.35)",
      "0 0.25em 0.25em rgba(0, 0, 0, 0.5)",
      "0 1em 1.5em rgba(0, 0, 0, 0.35)",
      "0 0 1em rgba(255, 255, 255, 0.1)",
    ].join(","),
  },
  active: {
    color: "#efefef",
    boxShadow: [
      "inset 0 0.125em 0.125em rgba(0, 0, 0, 0.35)",
      "inset 0 0.25em 0.2em rgba(0, 0, 0, 0.5)",
      "inset 0 1em 1.5em rgba(0, 0, 0, 0.35)",
      "0 0 1em rgba(255, 255, 255, 0.1)",
    ].join(","),
  },
  click: {
    color: "#efefefaa",
    boxShadow: [
      "inset 0 0 0.3em rgba(0, 0, 0, 0.35)",
      "inset 0 0 0.4em rgba(0, 0, 0, 0.35)",
      "inset 0 0 0.5em rgba(0, 0, 0, 0.35)",
      "inset 0 0 0.6em rgba(0, 0, 0, 0.35)",
      "inset 0 1em 1.5em rgba(0, 0, 0, 0.35)",
      "0 0 1em rgba(255, 255, 255, 0.1)",
    ].join(","),
  },
};

const ActionButton: FC<ActionButtonProps> = ({
  iconName,
  disabled,
  onClick,
  defaultState = false,
  ...tooltip
}) => {
  const [isActive, setActive] = useState(defaultState);

  const handleOnClick = () => {
    onClick && onClick();
    setActive((prev) => {
      const _isActive = !prev;
      return _isActive;
    });
  };

  return (
    <ButtonContainer
      {...tooltip}
      data-tooltip-content={disabled ? "disabled" : isActive ? "on" : "off"}
    >
      <Button
        name={iconName}
        variants={variants}
        initial={!isActive || disabled ? "inactive" : "active"}
        animate={isActive && !disabled ? "active" : "inactive"}
        disabled={disabled}
        whileTap={disabled ? undefined : "click"}
        transition={{ color: { duration: 0.1 } }}
        onClick={handleOnClick}
      >
        <Icon name={iconName} size={"75%"} />
      </Button>
    </ButtonContainer>
  );
};

export default ActionButton;

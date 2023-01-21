import { colorBrightness, colorTheme } from "@common/helper/tools";
import { motion } from "framer-motion";
import { FC, useId } from "react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

const trigger = {
  hover: { scale: 1.1 },
  tap: { scale: 0.98 },
};

const KTooltip = styled(Tooltip)<{ color: string }>`
  background-color: ${(props) => colorBrightness(colorTheme(props), 20)};
`;

const Button: FC<ButtonIconProps> = ({
  icon,
  disabled,
  onClick,
  type = "button",
  itemType,
  hint,
  hintPosition = "top",
  hintBackgroundColor = "background",
}) => {
  const id = useId();
  return (
    <>
      <motion.button
        id={id}
        itemType={itemType}
        type={type}
        onClick={onClick}
        disabled={disabled}
        transition={{ duration: 0.1 }}
        whileHover='hover'
        whileTap='tap'
      >
        <motion.span variants={trigger}>{icon}</motion.span>
      </motion.button>
      {hint && (
        <KTooltip
          id='tooltip'
          anchorId={id}
          content={hint}
          place={hintPosition}
          delayShow={100}
          color={hintBackgroundColor}
        />
      )}
    </>
  );
};

export default Button;

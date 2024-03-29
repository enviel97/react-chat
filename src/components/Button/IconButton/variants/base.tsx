import { colorBrightness, colorTheme } from "@theme/helper/tools";
import { motion } from "framer-motion";
import { FC, useId } from "react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

const trigger = {
  hover: { scale: 1.1 },
  tap: { scale: 0.98 },
};

const KTooltip = styled(Tooltip)<{ $color: string; $fontSize: string }>`
  padding: 0.25em 0.5em;
  border: 1px solid ${({ theme }) => theme.backgroundColor};
  background-color: ${({ theme, $color }) =>
    colorBrightness(colorTheme({ color: $color ?? "surface", theme }), 5)};
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: bold;
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
  hintSize = "1rem",
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
          $color={hintBackgroundColor}
          $fontSize={hintSize}
        />
      )}
    </>
  );
};

export default Button;

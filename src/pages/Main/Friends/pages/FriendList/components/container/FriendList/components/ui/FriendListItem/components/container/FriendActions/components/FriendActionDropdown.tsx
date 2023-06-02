import { shaddow } from "@theme/helper/styles";
import { colorBrightness } from "@theme/helper/tools";
import { motion } from "framer-motion";
import { FC, memo } from "react";
import styled, { css } from "styled-components";
import useListFriendAction from "../../../../../../../hooks/useListFriendAction";
import {
  FriendActionItem,
  FriendActionItemContainer,
} from "../styles/FriendAction.animate";

const Container = styled(motion.div)`
  position: absolute;
  top: calc(10% + 0.5rem);
  right: calc(100% + 0.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 9em;
  overflow: hidden;
  border-radius: 1rem;
  border-top-right-radius: 0;
  z-index: 1;
  ${() => {
    const color = "#1d1d1d";
    const light = colorBrightness(color, 15);
    const dark = colorBrightness(color, -15);
    return css`
      background-color: ${color};
      box-shadow: ${shaddow.boxShadow(
        { color: dark, x: 0.2, y: 0.2 },
        { color: light, x: -0.025, y: -0.025 }
      )};
    `;
  }}
`;
const Option = styled(motion.div)<ItemProps>`
  display: flex;
  gap: 0.5em;
  font-size: 1.2rem;
  cursor: pointer;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5em 1em;

  &:hover {
    color: ${({ $hoverColor, theme }) => $hoverColor ?? theme.disableColor};
  }
`;

const FriendActionDropdown: FC<FriendActionDropdownProps> = ({ onAction }) => {
  const actions = useListFriendAction();

  return (
    <Container {...FriendActionItemContainer}>
      {actions.map(({ onClick, icon, label, hoverColor }, index) => (
        <Option
          {...FriendActionItem}
          key={`${label}${index}`}
          onTap={() => onAction(onClick)}
          $hoverColor={hoverColor}
        >
          <span>{icon}</span>
          <span>{label}</span>
        </Option>
      ))}
    </Container>
  );
};

export default memo(FriendActionDropdown);

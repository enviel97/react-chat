import styled, { css } from "styled-components";

interface Props {
  $value: UserStatus;
}

export const DropdownActionItemContainer = styled.div<Props>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-transform: capitalize;
  width: 100%;
  font-size: 1em;
  text-indent: 1em;

  &::before {
    content: "";
    position: absolute;
    height: 0.6em;
    aspect-ratio: 1/1;
    border-radius: 50%;
    top: 50%;
    bottom: 50%;
    left: 0;
    transform: translateY(-50%);
    ${({ $value, theme }) => {
      let color = theme.disableColor;
      switch ($value) {
        case "active":
          color = theme.successColor;
          break;
        case "not-disturb":
          color = theme.errorColor;
          break;
        case "waiting":
          color = theme.warningColor;
          break;
      }
      return css`
        background-color: ${color};
      `;
    }}
  }
`;

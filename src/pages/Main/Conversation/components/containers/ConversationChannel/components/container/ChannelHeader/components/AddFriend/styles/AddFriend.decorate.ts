import { shaddow } from "@theme/helper/styles";
import styled, { css } from "styled-components";
import { SvgIconContainer } from "./FriendIcon.decorate";

interface AddFriendContainerProps {
  $relationship: Relationship;
  $loadState: LoadState;
}
const _shadow = (main: string, options?: "inset") => {
  const dark = {
    options,
    brightness: -20,
    blur: 0.1,
    spread: -0.05,
    x: 0.1,
    y: 0.1,
  };
  const light = {
    options,
    brightness: 20,
    blur: 0.1,
    spread: -0.05,
    x: -0.1,
    y: -0.1,
  };

  return shaddow.boxShadow(
    { ...light, color: main },
    { ...light, color: main },
    { ...dark, color: main },
    { ...dark, color: main }
  );
};

export const AddFriendContainer = styled.div<AddFriendContainerProps>`
  display: block;
  cursor: pointer;
  background-color: var(--background-color);
  ${({ $relationship, $loadState, theme }) => {
    if (!["guest", "pending"].includes($relationship)) {
      return css``;
    }
    if ($loadState === "success")
      return css`
        box-shadow: ${_shadow(theme.backgroundColor)};
        &:hover ${SvgIconContainer} {
          scale: 1.05;
        }
        &:active {
          & ${SvgIconContainer} {
            scale: 0.95;
          }
          box-shadow: ${_shadow(theme.backgroundColor, "inset")};
        }
      `;
  }}
`;

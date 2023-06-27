import styled, { css } from "styled-components";
import { ButtonActionShadow } from "../../../utils/shadow";
import { SvgIconContainer } from "./FriendIcon.decorate";

interface AddFriendContainerProps {
  $relationship: Relationship;
  $loadState: LoadState;
}

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
        box-shadow: ${ButtonActionShadow(theme.backgroundColor)};
        &:hover ${SvgIconContainer} {
          scale: 1.05;
        }
        &:active {
          & ${SvgIconContainer} {
            scale: 0.95;
          }
          box-shadow: ${ButtonActionShadow(theme.backgroundColor, "inset")};
        }
      `;
  }}
`;

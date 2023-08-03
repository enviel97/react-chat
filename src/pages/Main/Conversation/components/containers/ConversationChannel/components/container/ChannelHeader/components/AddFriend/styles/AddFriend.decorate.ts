import styled, { css } from "styled-components";
import { SvgIconContainer } from "./FriendIcon.decorate";

interface AddFriendContainerProps {
  $relationship: Relationship;
  $loadState: LoadState;
}

export const AddFriendContainer = styled.div<AddFriendContainerProps>`
  display: block;
  cursor: pointer;
  background-color: var(--background-color);
  ${({ $relationship, $loadState }) => {
    if (!["guest", "pending"].includes($relationship)) {
      return css``;
    }
    if ($loadState === "success")
      return css`
        &:hover ${SvgIconContainer} {
          scale: 1.05;
        }
        &:active {
          & ${SvgIconContainer} {
            scale: 0.95;
          }
        }
      `;
  }}
`;

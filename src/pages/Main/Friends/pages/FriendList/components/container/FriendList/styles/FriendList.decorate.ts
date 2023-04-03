import { breakpoint } from "@theme/helper/breakpoint";
import styled from "styled-components";

export const FriendListItemsContainerScrollbar = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 90%;
  width: 100%;
`;

export const FriendListItemsContainer = styled.div`
  display: inline-grid;
  grid-gap: 1em;
  width: 100%;
  padding: 1rem 0;
  grid-template-columns: repeat(2, 1fr);
  overflow: hidden;
  height: 100%;
  overflow-y: auto;

  ${breakpoint.down("tablet")} {
    grid-template-columns: auto;
  }
`;

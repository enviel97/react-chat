import { breakpoint } from "@theme/helper/breakpoint";
import styled from "styled-components";

export const FriendRequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FriendRequestItemsContainer = styled.div`
  position: relative;
  display: inline-grid;
  grid-gap: 0.5em;
  grid-template-columns: repeat(8, minmax(auto, 11svw));
  padding-bottom: 10svh;

  ${breakpoint.down("laptop")} {
    grid-template-columns: repeat(5, minmax(auto, 11svw));
  }
  ${breakpoint.down("tablet")} {
    grid-template-columns: repeat(3, minmax(auto, 11svw));
  }
  ${breakpoint.down("mobile")} {
    grid-template-columns: repeat(1, minmax(auto, 11svw));
  }
`;

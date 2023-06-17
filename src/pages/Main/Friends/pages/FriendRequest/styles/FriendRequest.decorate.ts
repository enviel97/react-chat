import { breakpoint } from "@theme/helper/breakpoint";
import styled from "styled-components";

export const FriendRequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 0.5rem;
`;

export const FriendRequestItemsScroll = styled.div`
  flex: 1 1 auto;
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 1rem;
`;

export const FriendRequestItemContainer = styled.div`
  background-color: transparent;
  height: fit-content;
  width: 100%;
`;

export const FriendRequestItemsContainer = styled.div`
  position: relative;
  max-width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  padding-bottom: 10svh;

  ${FriendRequestItemContainer} {
    flex-basis: 12.5%;
    ${breakpoint.down("laptop")} {
      flex-basis: 20%;
    }
    ${breakpoint.down("tablet")} {
      flex-basis: 33.33%;
    }
    ${breakpoint.down("mobile")} {
      flex-basis: 50%;
    }
  }
`;

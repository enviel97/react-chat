import { breakpoint } from "@theme/helper/breakpoint";
import { motion } from "framer-motion";
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

export const FriendRequestItemContainer = styled(motion.div)`
  background-color: transparent;
  height: fit-content;
  width: 100%;
`;

export const FriendRequestItemsContainer = styled(motion.div)`
  position: relative;
  max-width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 10svh;
  font-weight: 300;
  font-style: italic;
  font-size: 1.25rem;
  gap: 0.5rem;

  ${FriendRequestItemContainer} {
    flex-basis: calc(12.5% - 0.5rem);
    ${breakpoint.down("laptop")} {
      flex-basis: calc(20% - 0.5rem);
    }
    ${breakpoint.down("tablet")} {
      justify-content: center;
      flex-basis: calc(33.33% - 0.5rem);
    }
    ${breakpoint.down("mobile")} {
      justify-content: center;
      flex-basis: calc(50% - 0.5rem);
    }
  }
`;

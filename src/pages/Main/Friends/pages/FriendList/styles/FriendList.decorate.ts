import styled from "styled-components";

export const FriendListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FriendListItemsContainer = styled.div`
  position: relative;
  display: inline-grid;
  grid-gap: 1em;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 10svh;
`;

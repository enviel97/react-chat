import styled from "styled-components";

export const FriendPendingBodyContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  overflow-y: hidden;
  scroll-behavior: smooth;
  margin-top: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

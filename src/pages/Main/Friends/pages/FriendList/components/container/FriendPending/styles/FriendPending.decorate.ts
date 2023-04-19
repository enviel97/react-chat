import styled from "styled-components";

export const FriendPendingBodyContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  overflow-y: hidden;
  scroll-behavior: smooth;
  min-height: 6rem;
  margin-top: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }

  & > span {
    font-weight: 300;
    text-indent: 2rem;
    font-style: italic;
    color: ${({ theme }) => theme.disableColor};
  }
`;

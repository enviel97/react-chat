import styled from "styled-components";

export const ModalFriendRequestContainer = styled.div`
  position: relative;
  display: flex;
  background-color: transparent;
  height: 100%;
  width: 100%;
  padding: 2rem;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalFriendRequestHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  margin-right: 2rem;

  & > h4 {
    font-weight: bold;
  }
  & > span {
    position: absolute;
    color: ${({ theme }) => theme.disableColor};
    bottom: -2.7rem;
    left: 2rem;
  }
`;

export const ModalFriendRequestBody = styled.div`
  position: relative;
  height: 100%;
  overflow: auto;
  scrollbar-gutter: stable both-edges;
`;

export const ModalFriendRequestList = styled.div`
  margin-top: 1.5rem;
  display: grid;
  grid-gap: 1rem;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(auto, 11vw));
`;

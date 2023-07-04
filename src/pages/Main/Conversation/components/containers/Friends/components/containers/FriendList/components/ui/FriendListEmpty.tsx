import { memo } from "react";
import styled from "styled-components";

const FriendListEmptyContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--disable-color);
  font-style: italic;
  font-size: 1rem;
  padding: 1rem 0;
`;

const FriendListEmpty = () => {
  return <FriendListEmptyContainer>No body</FriendListEmptyContainer>;
};

export default memo(FriendListEmpty);

import { breakpoint } from "@theme/helper/breakpoint";
import styled from "styled-components";

export const FriendContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  border-left: 2px solid ${({ theme }) => theme.surfaceColor};
  height: 100%;

  ${breakpoint.down("laptop")} {
    width: 150px;
  }
`;

export const ListFriendEmpty = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ListFriendContainer = styled.div`
  gap: 0.5rem;
  padding: 0.5em 1em;

  & span {
    font-weight: bold;
    font-size: 1em;
  }
`;

export const ListFriendHeaderTitle = styled.span`
  display: flex;
  flex-direction: row;

  align-items: stretch;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

export const ListFriendItemContainer = styled.div`
  display: flex;
  padding: 0.5em 0.8em;
  gap: 1em;
  align-items: center;

  ${breakpoint.down("laptop")} {
    justify-content: center;
  }

  & span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

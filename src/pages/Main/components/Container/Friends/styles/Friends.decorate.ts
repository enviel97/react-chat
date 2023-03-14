import { breakpoint } from "@theme/helper/breakpoint";
import { Tooltip } from "react-tooltip";
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

export const ListFriendItemContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  width: 100%;
  padding: 0.5em 0.8em;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme, isUser }) => {
    return isUser ? theme.surfaceColor : theme.backgroundColor;
  }};

  ${breakpoint.down("laptop")} {
    justify-content: center;
  }
`;

export const ListFriendItemBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  & span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ListItemHint = styled(Tooltip)`
  padding: 0.25em 0.5em;
  font-weight: bold;
  background-color: ${({ theme }) => theme.surfaceColor};
`;

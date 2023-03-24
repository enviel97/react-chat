import { breakpoint } from "@theme/helper/breakpoint";
import { colorBrightness } from "@theme/helper/tools";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

export const Items = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor};
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
  gap: 0.5em;

  align-items: stretch;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

export const ListFriendItemContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5em 0.8em;
  align-items: center;
  justify-content: space-between;

  ${breakpoint.down("laptop")} {
    justify-content: start;
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
  border: 1px solid ${({ theme }) => theme.backgroundColor};
  background-color: ${(props) => colorBrightness(props.theme.surfaceColor, 5)};
  font-weight: bold;
`;

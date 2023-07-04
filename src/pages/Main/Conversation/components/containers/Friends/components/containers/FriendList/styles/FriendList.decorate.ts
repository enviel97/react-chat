import { clampSize } from "@theme/helper/tools";
import styled from "styled-components";

export const FriendListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5em 1em;
`;

export const FriendListPartContainer = styled.div`
  display: block;
  box-sizing: border-box;
  min-height: 100px;
  max-width: 300px;
`;

export const FriendListHeaderTitle = styled.span`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  align-items: stretch;
  justify-content: space-between;
  padding: 0.5rem 0;

  & > span {
    font-weight: bold;
    font-size: ${clampSize({
      minWidth: 100,
      maxWidth: 300,
      maxFontSize: 1,
      minFontSize: 0.8,
    })};
  }
`;

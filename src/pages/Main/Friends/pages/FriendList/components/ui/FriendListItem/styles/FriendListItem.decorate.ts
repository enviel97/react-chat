import { colorBrightness } from "@theme/helper/tools";
import styled from "styled-components";

export const FriendListItemContainer = styled.div`
  height: 10lvh;
  display: flex;
  background-color: red;
  padding: 0.25rem;
  gap: 0.5rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.surfaceColor};
  box-shadow: 0.6em 0.5em 1em
    ${({ theme }) => colorBrightness(theme.surfaceColor, -2)};
`;

export const FriendListItemTrail = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: inherit;
  overflow: hidden;
`;

export const FriendListItemBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  justify-content: space-between;
  & h5 {
    cursor: pointer;
    position: relative;

    height: fit-content;
    width: fit-content;
    &:hover::after {
      display: initial;
      visibility: visible;
    }
    &::after {
      position: absolute;
      bottom: -0.2rem;
      left: 0;
      content: "";
      width: 100%;
      height: 3px;
      background-color: gray;
      display: none;
      visibility: hidden;
    }
  }
  & p {
    margin: 0.25em 0;
    font-size: 1em;
    font-weight: normal;
    & > strong {
      color: ${({ theme }) => theme.disableColor};
      font-weight: 400;
    }
  }
`;

export const FriendListItemAction = styled.div`
  display: flex;
  padding: 0.5em;
  align-items: flex-start;
  justify-content: center;
`;

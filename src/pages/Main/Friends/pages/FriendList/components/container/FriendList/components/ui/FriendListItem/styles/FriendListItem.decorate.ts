import { clampSize, colorBrightness } from "@theme/helper/tools";
import styled from "styled-components";

export const FriendListItemContainer = styled.div`
  height: ${clampSize({
    maxFontSize: 7.25,
    minFontSize: 7,
    maxWidth: 1802.41,
    minWidth: 390,
  })};
  display: flex;
  background-color: red;
  gap: 0.5rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.surfaceColor};
  padding: 0.25rem;
  box-shadow: 0.6rem 0.5rem 1rem
    ${({ theme }) => colorBrightness(theme.surfaceColor, -2)};
`;

export const FriendListItemTrail = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: inherit;
  overflow: hidden;
  background: ${({ theme }) => theme.backgroundColor};
`;

export const FriendListItemBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.25rem;
  max-height: 100%;

  & p {
    font-weight: 300;
    font-size: 1rem;
    & > strong {
      color: ${({ theme }) => theme.disableColor};
      font-weight: 400;
    }
  }
`;

export const FriendItemTitleContainer = styled.h4`
  display: flex;
  cursor: pointer;
  font-weight: bold;
  position: relative;
  width: fit-content;
  & span:nth-of-type(2) {
    scale: 0.7;
    font-weight: 300;
  }

  &:hover::after {
    display: initial;
    visibility: visible;
  }
  &::after {
    position: absolute;
    bottom: -0.05rem;
    left: 0;
    content: "";
    width: 100%;
    height: 2px;
    background-color: gray;
    display: none;
    visibility: hidden;
  }
`;

export const FriendListItemAction = styled.div`
  display: flex;
  padding: 0.5em;
  align-items: flex-start;
  justify-content: center;
`;

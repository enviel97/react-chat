import { shaddow } from "@theme/helper/styles";
import { clampSize } from "@theme/helper/tools";
import styled, { DefaultTheme } from "styled-components";

const _shadow = ({ theme }: { theme: DefaultTheme }) => {
  return shaddow.boxShadow(
    {
      x: 0.1,
      y: 0.1,
      color: theme.backgroundColor,
      blur: 0.1,
      spread: -0.15,
      brightness: -50,
    },
    {
      x: -0.15,
      y: -0.1,
      color: theme.backgroundColor,
      blur: 0.4,
      spread: -0.1,
      brightness: 50,
    }
  );
};

export const FriendListItemContainer = styled.div`
  position: relative;
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
  box-shadow: ${_shadow};
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

export const FriendItemTitleContainer = styled.h5`
  cursor: pointer;
  font-weight: bold;
  position: relative;
  width: fit-content;
  user-select: text;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;

  & span:nth-of-type(2) {
    margin-left: 1ch;
    font-size: 80%;
    font-weight: 300;
  }
`;

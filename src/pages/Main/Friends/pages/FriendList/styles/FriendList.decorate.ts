import { colorBrightness } from "@theme/helper/tools";
import styled, { css } from "styled-components";

export const FriendListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FriendListItemsContainer = styled.div`
  position: relative;
  display: inline-grid;
  grid-gap: 1em;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 10svh;
`;

export const FriendListAddMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 2rem;
  outline: none;
  margin-left: 1em;
  padding: 0.5em;
  cursor: pointer;
  text-decoration: none;
  & label {
    font-size: 1em;
    margin-right: 0.5rem;
  }

  ${({ theme }) => {
    const colorMain = theme.surfaceColor;
    const textColor = theme.onSurfaceColor;
    return css`
      color: ${textColor};
      background-color: ${colorMain};
      background: linear-gradient(
        to bottom,
        ${colorMain} 5%,
        ${colorBrightness(colorMain, 10)} 100%
      );
      border: 2px solid ${colorMain};
      text-shadow: 0px 1px 0px ${colorBrightness(colorMain, -20)};
      box-shadow: inset 0px 1px 0px 0px ${textColor};

      &:hover {
        background-color: ${colorMain};
        background: linear-gradient(
          to bottom,
          ${colorBrightness(colorMain, 10)} 5%,
          ${colorMain} 100%
        );
      }
      &:active {
        box-shadow: inset 8px 8px 12px -2px ${colorBrightness(colorMain, 10)},
          inset -8px -8px 12px -2px ${colorBrightness(colorMain, -50)},
          inset 2px 2px 0px 0px white,
          0px 12px 10px -10px ${colorBrightness(colorMain, 0.05)};
      }
    `;
  }}
`;

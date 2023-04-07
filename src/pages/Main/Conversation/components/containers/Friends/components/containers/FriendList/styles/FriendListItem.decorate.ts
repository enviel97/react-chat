import { clampSize, colorBrightness } from "@theme/helper/tools";
import { Tooltip } from "react-tooltip";
import styled, { css } from "styled-components";

interface StatusProps {
  $isOnline?: boolean;
  $status?: UserStatus;
}

interface AvatarContainerProps {
  $isOnline?: boolean;
}

export const FriendListItemContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const FriendListAvatarContainer = styled.div<AvatarContainerProps>`
  overflow: visible;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ $isOnline }) => {
    if ($isOnline) return css``;
    return css`
      opacity: 0.5;
      filter: alpha(opacity=50);
    `;
  }}
  font-size: ${clampSize({
    minWidth: 100,
    maxWidth: 300,
    maxFontSize: 1,
    minFontSize: 0.8,
  })};
`;

export const FriendListItemBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.8em;
  gap: 1em;
  width: 100%;
`;

export const FriendListItemContent = styled.span<StatusProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ $isOnline, theme }) =>
      $isOnline ? theme.onBackgroundColor : theme.disableColor};
    font-size: ${clampSize({
      minWidth: 100,
      maxWidth: 300,
      maxFontSize: 1,
      minFontSize: 0.8,
    })};
  }

  & > span:nth-of-type(2) {
    position: relative;
    text-transform: capitalize;
    text-indent: 1rem;
    color: ${({ $status = "not-disturb", theme }) => {
      switch ($status) {
        case "active":
          return theme.successColor;
        case "not-disturb":
          return theme.notificationColor;
        case "waiting":
          return theme.warningColor;
      }
    }};

    &::after {
      position: absolute;
      content: "";
      height: 2px;
      width: 0.5rem;
      background-color: currentColor;
      left: 0;
      top: 50%;
      bottom: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
    }
  }
`;

export const FriendListItemHint = styled(Tooltip)`
  padding: 0.25em 0.5em;
  border: 1px solid ${({ theme }) => theme.backgroundColor};
  background-color: ${(props) => colorBrightness(props.theme.surfaceColor, 5)};
  font-weight: bold;
`;

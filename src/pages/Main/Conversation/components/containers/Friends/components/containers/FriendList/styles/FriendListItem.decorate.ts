import { clampSize, colorBrightness } from "@theme/helper/tools";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import styled, { css } from "styled-components";

export const FriendListItemContainer = styled(motion.div)`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  max-width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const FriendListAvatarContainer = styled.div<AvatarContainerProps>`
  overflow: visible;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${({ $isOnline }) => {
    if (!$isOnline) {
      return css`
        opacity: 0.5;
        filter: alpha(50);
      `;
    }
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
  justify-content: center;
  padding: 0.5em 0.8em;
  gap: 1em;
  width: 100%;
`;

export const FriendListItemContent = styled(motion.span)`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: ${clampSize({
    minWidth: 100,
    maxWidth: 300,
    maxFontSize: 1,
    minFontSize: 0.8,
  })};
`;

export const FriendListName = styled.span<NameProps>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ $isOnline, theme }) => {
    if ($isOnline) return theme.onBackgroundColor;
    return theme.disableColor;
  }};
`;

export const FriendListStatus = styled(motion.span)<StatusProps>`
  position: relative;
  color: currentColor;
  white-space: normal;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ $bio }) => {
    if (!$bio) {
      return css`
        font-style: italic;
      `;
    }
  }}

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
`;

export const FriendListItemHint = styled(Tooltip)`
  padding: 0.25em 0.5em;
  border: 1px solid ${({ theme }) => theme.backgroundColor};
  background-color: ${(props) => colorBrightness(props.theme.surfaceColor, 5)};
  font-weight: bold;
`;

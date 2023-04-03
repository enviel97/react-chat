import { typography } from "@theme/helper/typography";
import styled from "styled-components";

export const FriendPageDecorate = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-height: 100svh;
  font-weight: bold;
  box-sizing: border-box;
  flex-direction: column;
`;

export const FriendPageLayout = styled.div`
  position: relative;
  display: inline-block;
  padding: 0.5em;
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

export const FriendPageTitle = styled.h4`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  width: fit-content;
  padding: 1rem;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.disableColor};
  & > strong,
  & > span > strong {
    font-weight: 300;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.notificationColor};
    font-family: ${typography.fontFamily.decorate};
    margin-left: 0.5rem;
  }
`;

export const FriendPageNotificationEmpty = styled.span`
  font-weight: normal;
  font-style: italic;
  width: 100%;
  color: ${({ theme }) => theme.disableColor};
`;

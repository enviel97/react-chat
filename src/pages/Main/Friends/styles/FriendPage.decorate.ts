import { typography } from "@theme/helper/typography";
import styled from "styled-components";

export const FriendPageDecorate = styled.div`
  display: flex;
  width: 100%;
  font-weight: bold;
  flex-direction: column;
`;

export const FriendPageLayout = styled.div`
  display: flex;
  padding: 0.5em;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  scrollbar-gutter: stable both-edges;
`;

export const FriendPageTitle = styled.h4`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  padding-top: 1em;
  padding-bottom: 0.25em;
  margin-bottom: 1em;
  width: fit-content;
  border-bottom: 1px solid ${({ theme }) => theme.disableColor};

  & strong {
    font-weight: 300;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.notificationColor};
    font-family: ${typography.fontFamily.decorate};
    margin-left: 1em;
  }
`;

export const FriendPageNotificationEmpty = styled.span`
  font-weight: normal;
  font-style: italic;
  color: ${({ theme }) => theme.disableColor};
`;

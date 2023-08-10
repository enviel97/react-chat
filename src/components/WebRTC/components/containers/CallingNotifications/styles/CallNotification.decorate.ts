import { clampSize, textMaxLine } from "@theme/helper/tools";
import styled from "styled-components";

export const CallNotificationContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const CallNotificationAction = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 1em;
  width: fit-content;
  padding: 0.5em;
`;

export const CallNotificationInfo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1em;
  padding: 0em 0.5em;
`;

export const CallNotificationText = styled.span`
  color: var(--disable-color);
  width: 20rem;
  font-size: ${clampSize({
    maxWidth: 1980,
    minWidth: 320,
    maxFontSize: 1.125,
    minFontSize: 1,
  })};
  ${textMaxLine(2)}
  & b {
    font-weight: bold;
    color: var(--on-background-color);
    margin-right: 0.5ch;
  }
`;

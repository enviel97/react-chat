import { clampSize } from "@theme/helper/tools";
import styled from "styled-components";

export const CallNotificationAction = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 1em;
  overflow: hidden;
  width: 10em;
`;

export const CallNotificationInfo = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1em;
  font-weight: bold;
  font-size: ${clampSize({
    maxWidth: 1980,
    minWidth: 320,
    maxFontSize: 1.25,
    minFontSize: 1.125,
  })};
`;

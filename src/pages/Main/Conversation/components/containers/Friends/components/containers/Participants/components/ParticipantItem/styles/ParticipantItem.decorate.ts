import { breakpoint } from "@theme/helper/breakpoint";
import { clampSize, colorBrightness } from "@theme/helper/tools";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

export const ParticipantItemParticipant = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const ParticipantItemContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5em 0.8em;
  align-items: center;
  justify-content: space-between;

  ${breakpoint.down("laptop")} {
    justify-content: start;
  }
`;

export const ParticipantItemBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${clampSize({
      minWidth: 100,
      maxWidth: 300,
      maxFontSize: 1,
      minFontSize: 0.8,
    })};
  }
`;

export const ParticipantItemHint = styled(Tooltip)`
  padding: 0.25em 0.5em;
  border: 1px solid ${({ theme }) => theme.backgroundColor};
  background-color: ${(props) => colorBrightness(props.theme.surfaceColor, 5)};
  font-weight: bold;
`;

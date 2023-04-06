import { clampSize } from "@theme/helper/tools";
import styled from "styled-components";

export const ParticipantListEmpty = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ParticipantListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5em 1em;
`;

export const ParticipantListHeaderTitle = styled.span`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  align-items: stretch;
  justify-content: space-between;
  padding: 0.5rem 0;

  & > span {
    font-weight: bold;
    font-size: ${clampSize({
      minWidth: 100,
      maxWidth: 300,
      maxFontSize: 1,
      minFontSize: 0.8,
    })};
  }
`;

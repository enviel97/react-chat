import { breakpoint } from "@common/helper/breakpoint";
import styled from "styled-components";

export const MessageContainer = styled.div`
  height: fit-content;
  padding: 4em 2em 1em;
  overflow-y: auto;
`;

export const MessageItemContainer = styled.div<MessageStyledProps>`
  width: 100%;
  display: flex;
  margin: 0.5em 0;
  gap: 0.3em;
  align-items: flex-end;
  flex-direction: ${({ fromYou }) => (fromYou ? "row-reverse" : "row")};

  & .timer {
    font-weight: normal;
    font-size: 0.9em;
    font-style: italic;
    color: ${({ theme }) => theme.disableColor};
  }
`;

export const MessageContent = styled.span<MessageStyledProps>`
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: ${({ fromYou, theme }) =>
    fromYou ? theme.surfaceColor : theme.secondaryColor};

  max-width: 50%;
  ${breakpoint.down("tablet")} {
    max-width: 80%;
  }
`;

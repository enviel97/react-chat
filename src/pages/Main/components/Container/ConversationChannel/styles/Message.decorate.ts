import { breakpoint } from "@common/helper/breakpoint";
import styled from "styled-components";

export const MessageContainer = styled.div`
  height: fit-content;
  padding: 4em 2em 1em;
  overflow-y: auto;
`;

export const MessageItemTimer = styled.span<{ isLastMessage: boolean }>`
  font-weight: normal;
  font-size: 0.9em;
  font-style: italic;
  margin-top: 0.5em;
  color: ${({ theme }) => theme.disableColor};
  visibility: ${({ isLastMessage }) => (isLastMessage ? "visible" : "hidden")};
  display: ${({ isLastMessage }) => (isLastMessage ? "initial" : "none")};
`;

export const MessageContent = styled.span<MessageStyledProps>`
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: ${({ fromYou, theme }) =>
    fromYou ? theme.surfaceColor : theme.secondaryColor};

  width: fit-content;
  max-width: 50%;
  ${breakpoint.down("tablet")} {
    max-width: 80%;
  }
`;

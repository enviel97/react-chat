import styled from "styled-components";

export const MessageAction = styled.div<MessageStyledProps>`
  position: absolute;
  right: ${({ fromYou }) => (fromYou ? "auto" : "-2rem")};
  left: ${({ fromYou }) => (fromYou ? "-2rem" : "auto")};
`;

export const MessageContainer = styled.div`
  position: relative;
  height: fit-content;
  max-height: 85vh;
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

export const MessageContentContainer = styled.div<MessageStyledProps>`
  position: relative;
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ fromYou }) => (fromYou ? "row-reverse" : "row")};
`;

export const MessageContent = styled.span<MessageStyledProps>`
  padding: 0.5rem 1rem;

  border-radius: 10px;
  background-color: ${({ fromYou, theme }) =>
    fromYou ? theme.secondaryColor : theme.surfaceColor};
`;

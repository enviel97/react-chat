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

export const MessageBodyContainer = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 10px;
  white-space: pre-wrap;

  &:focus[contenteditable="true"] {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: auto;
  }
`;

export const MessageContentContainer = styled.div<MessageStyledProps>`
  position: relative;
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ fromYou }) => (fromYou ? "row-reverse" : "row")};

  & ${MessageBodyContainer} {
    background-color: ${({ fromYou, theme }) =>
      fromYou ? theme.secondaryColor : theme.surfaceColor} !important;
  }
`;

export const HintEdit = styled.span`
  margin-top: 0.2em;
  font-size: 0.8em;
  font-style: italic;
  color: ${({ theme }) => theme.disableColor};
  & b {
    color: #fff;
  }
`;

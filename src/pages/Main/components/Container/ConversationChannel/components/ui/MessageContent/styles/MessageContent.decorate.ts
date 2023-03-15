import styled from "styled-components";

export const MessageContentContainer = styled.div<MessageStyledProps>`
  position: relative;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  white-space: pre-wrap;
  max-width: 50vw;
  background-color: ${({ fromYou, theme }) =>
    fromYou ? theme.secondaryColor : theme.surfaceColor};

  &:focus[contenteditable="true"] {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: auto;
  }
`;

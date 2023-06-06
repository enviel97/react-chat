import { clampSize } from "@theme/helper/tools";
import styled, { css } from "styled-components";

interface MessageContentContainerProps {
  $fromYou: boolean;
}

export const MessageContentContainer = styled.div<MessageContentContainerProps>`
  position: relative;
  white-space: pre-wrap;
  max-width: 50vw;
  padding: 0.75rem 1rem;
  display: flex;
  width: 100%;
  user-select: text;
  cursor: auto;

  ${({ $fromYou }) => {
    if ($fromYou) {
      return css`
        justify-content: flex-end;
      `;
    }
    return css`
      justify-content: flex-start;
    `;
  }}

  font-size: ${clampSize({
    minWidth: 282,
    maxWidth: 748.4,
    maxFontSize: 1.2,
    minFontSize: 0.75,
  })};

  &:focus[contenteditable="true"] {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: auto;
  }
`;

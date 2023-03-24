import styled, { css } from "styled-components";
import { MessageContentContainer as MiniContent } from "../components/ui/MessageContent/styles/MessageContent.decorate";

interface MessageItemContainerProps extends MessageStyledProps {
  action: MessageAction;
}

export const MessageItemContainer = styled.div<MessageStyledProps>`
  display: flex;
  gap: 0.5em;
  align-items: flex-start;
  flex-direction: ${({ fromYou }) => (fromYou ? "row-reverse" : "row")};
`;

export const MessageContentContainer = styled.div<MessageItemContainerProps>`
  position: relative;
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;

  & ${MiniContent} {
    ${({ action }) => {
      switch (action) {
        case "Removed":
          return css`
            background-color: ${({ theme }) => theme.backgroundColor};
            border: 1px solid currentColor;
            font-style: italic;
            color: #eaeaea80;
          `;
        case "Notice":
          return css``;
      }
      return css``;
    }}
  }
`;

export const MessageItemTimer = styled.span`
  font-weight: normal;
  font-size: 0.9em;
  font-style: italic;
  margin-top: 0.5em;
  color: ${({ theme }) => theme.disableColor};
`;

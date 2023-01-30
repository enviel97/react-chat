import styled from "styled-components";
import { MessageContentDecorate } from "../../../ui/MessageContent";
interface MessageItemContainerProps {
  fromYou: boolean;
}

export const MessageItemContainer = styled.div<MessageItemContainerProps>`
  display: flex;
  gap: 0.5em;
  align-items: flex-start;
  flex-direction: ${({ fromYou }) => (fromYou ? "row-reverse" : "row")};
`;

export const MessageContentContainer = styled.div<MessageStyledProps>`
  position: relative;
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;

  & ${MessageContentDecorate} {
    max-width: 50vw;
    background-color: ${({ fromYou, theme }) =>
      fromYou ? theme.secondaryColor : theme.surfaceColor};
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

export const MessageItemTimer = styled.span`
  font-weight: normal;
  font-size: 0.9em;
  font-style: italic;
  margin-top: 0.5em;
  color: ${({ theme }) => theme.disableColor};
`;

export const MessageAction = styled.div`
  position: absolute;
  right: auto;
  left: -2rem;
`;

import { motion } from "framer-motion";
import styled from "styled-components";

interface ActionProps {
  $action: MessageAction;
}

interface FromYouProps {
  $fromYou: boolean;
}

export const MessageItemBody = styled.div<FromYouProps>`
  box-sizing: border-box;
  display: flex;
  width: fit-content;
  justify-content: flex-start;
  max-width: 45svw;
  width: fit-content;
  align-items: ${({ $fromYou }) => ($fromYou ? "flex-end" : "flex-start")};
  flex-direction: column;
`;

export const MessageItemContainer = styled(motion.div)<FromYouProps>`
  display: flex;
  gap: 0.5em;
  align-items: flex-start;
  flex-direction: ${({ $fromYou }) => ($fromYou ? "row-reverse" : "row")};
  cursor: ${({ $fromYou }) => ($fromYou ? "pointer" : "default")};
`;

export const MessageTextContainer = styled.div<ActionProps>`
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
`;

export const MessageContentContainer = styled.div<FromYouProps>`
  position: relative;
  background-color: red;
  display: block;
  box-sizing: border-box;
  border-radius: 10px;

  background-color: ${({ $fromYou, theme }) =>
    $fromYou ? theme.secondaryColor : theme.surfaceColor};
`;

export const MessageItemTimer = styled.span`
  font-weight: normal;
  font-size: 0.9em;
  font-style: italic;
  margin-top: 0.5em;
  color: ${({ theme }) => theme.disableColor};
`;

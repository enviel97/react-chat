import useAppSelector from "@hooks/useAppSelector";
import messageUtils from "@store/repo/message/utils/utils";
import { validateUser } from "@store/slices/profiles";
import { clampSize } from "@theme/helper/tools";
import { FC, memo, useMemo } from "react";
import styled, { css } from "styled-components";
import MessageAvatar from "../container/MessageItem/components/MessageAvatar";

interface MessageRemovedProps {
  message?: Message;
}

const MessageRemovedWrapper = styled.div<{ $fromYou: boolean }>`
  display: flex;
  gap: 0.5em;
  align-items: flex-start;

  ${({ $fromYou }) => {
    if ($fromYou) {
      return css`
        flex-direction: row-reverse;
      `;
    }
    return css`
      flex-direction: row;
    `;
  }}
`;

const Content = styled.span`
  background-color: ${({ theme }) => theme.backgroundColor};
  border: 1px solid currentColor;
  font-style: italic;
  color: #eaeaea80;
  align-items: flex-start;

  position: relative;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  white-space: pre-wrap;
  width: fit-content;

  font-size: ${clampSize({
    minWidth: 282,
    maxWidth: 748.4,
    maxFontSize: 1.2,
    minFontSize: 0.75,
  })};
`;

const MessageRemoved: FC<MessageRemovedProps> = ({ message }) => {
  const isUser = useAppSelector((state) =>
    validateUser(state, message?.author)
  );
  const isTemp = useMemo(() => messageUtils.isTemp(message), [message]);

  return (
    <MessageRemovedWrapper $fromYou={isTemp || isUser}>
      <MessageAvatar isShow={false} />
      <Content>{message?.content}</Content>
    </MessageRemovedWrapper>
  );
};

export default memo(MessageRemoved);

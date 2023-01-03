import { useState } from "react";
import styled from "styled-components";

const TypingNotification = styled.p`
  position: absolute;
  width: fit-content;
  font-size: 1rem;
  margin: 0;
  padding: 0;
  padding-left: 2rem;
  text-decoration: italic;
  top: -2.5rem;
  left: 0;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const ChannelChattingNotification = () => {
  const [isTyping] = useState(false);

  if (!isTyping) {
    return <></>;
  }

  return <TypingNotification>Someone typing...</TypingNotification>;
};

export default ChannelChattingNotification;

import { isCharacterKeyCode } from "@utils/validate";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TypingNotification = styled.p`
  width: fit-content;
  font-size: 1rem;
  margin: 0;
  padding: 0;
  padding-left: 2rem;
  text-decoration: italic;
`;

const ChannelChattingNotification = () => {
  const [isTyping, setTyping] = useState(false);
  useEffect(() => {
    const inputMessage = document.querySelector(".message-input");

    if (!inputMessage) return;
    let timeout = setTimeout(() => {}, 0);

    const typeListen = (event: any) => {
      clearTimeout(timeout);
      const input = event.target as HTMLInputElement;
      if (!input || !isCharacterKeyCode(event.keyCode)) return;
      setTyping(true);
      timeout = setTimeout(() => {
        setTyping(false);
      }, 400);
    };
    inputMessage.addEventListener("keydown", typeListen);

    return () => inputMessage.removeEventListener("keydown", typeListen);
  }, []);

  if (!isTyping) {
    return <></>;
  }

  return <TypingNotification>Someone typing...</TypingNotification>;
};

export default ChannelChattingNotification;

import { Event } from "@core/common/socket.define";
import useAuthenticate from "@hooks/useAuthenticate";
import useSocket from "@hooks/useSocket";
import string from "@utils/string";
import { useLayoutEffect, useState } from "react";
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
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const { user } = useAuthenticate();
  useLayoutEffect(() => {
    socket.on(Event.EVENT_USER_TYPED, (payload: TypingPayload) => {
      if (user && string.getId(user) !== payload.userId) {
        setMessage(payload.message);
      }
    });

    return () => {
      socket.off(Event.EVENT_USER_TYPED);
    };
  }, [socket]);

  if (!message) return <></>;
  return <TypingNotification>{message}</TypingNotification>;
};

export default ChannelChattingNotification;

import useSocket from "@hooks/useSocket";
import string from "@utils/string";
import { FC, memo, useEffect, useLayoutEffect, useState } from "react";
import { ChannelMessageContainer } from "../../styles/Channel.decorate";
import { Event } from "@core/common/socket.define";
import MessageItem from "../MessageItem";
import ChannelSendForm from "./ChannelSendForm";
import { Box } from "@utils/styles";
import { postMessage } from "@store/repo/message";

interface ChannelBodyProps {
  conversationId: string;
  messages: Message[];
}

const ChannelBody: FC<ChannelBodyProps> = ({ messages, conversationId }) => {
  const [message, setMessages] = useState<Message[]>(messages);

  const socket = useSocket();

  useEffect(() => {
    setMessages(
      messages.sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      })
    );
  }, [messages]);

  useEffect(() => {
    socket.on(Event.EMIT_NOTIFICATION_MESSAGE, (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off(Event.EMIT_NOTIFICATION_MESSAGE);
    };
  }, [socket]);

  useLayoutEffect(() => {
    // Scroll to new messenger
    const container = document.querySelector(`${ChannelMessageContainer}`);
    container!.scrollTo({
      top: container!.scrollHeight,
      left: 0,
      behavior: "auto",
    });
  }, [message]);

  return (
    <>
      <ChannelMessageContainer>
        {message.length === 0 && (
          <Box
            style={{ height: "100%" }}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <h5>Say hi to to begin conversation</h5>
          </Box>
        )}
        {message.map((mess, index, arr) => {
          const presentChatter =
            index === 0 ? undefined : arr[index - 1].author;
          const lastChatter = index === arr.length - 1;
          return (
            <MessageItem
              key={`${string.getId(mess)}$${index}`}
              message={mess}
              preChatter={presentChatter}
              lastChatter={lastChatter}
            />
          );
        })}
      </ChannelMessageContainer>

      <ChannelSendForm
        onConfirm={async (message: string) => {
          console.log(message);
          const response = await postMessage({
            message,
            conversationId,
          });
          setMessages([...messages, response]);
        }}
      />
    </>
  );
};

export default memo(ChannelBody);

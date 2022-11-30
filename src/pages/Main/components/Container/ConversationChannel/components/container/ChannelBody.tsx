import { postMessage } from "@pages/Main/repo/message";
import string from "@utils/string";
import { memo, useEffect, useState } from "react";
import { useAsyncValue } from "react-router-dom";
import { ChannelMessageContainer } from "../../styles/Channel.decorate";
import MessageItem from "../MessageItem";
import ChannelSendForm from "./ChannelSendForm";

const ChannelBody = () => {
  const conversation = useAsyncValue() as ConversationDetail;

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const message = conversation.messages.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    console.log(message);
    setMessages(message);
  }, [conversation.messages]);

  return (
    <>
      <ChannelMessageContainer>
        {messages.map((mess, index) => {
          const presentChatter =
            index === 0 ? undefined : messages[index - 1].author;
          const lastChatter = index === messages.length - 1;
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
          const response = await postMessage({
            message,
            conversationId: string.getId(conversation),
          });
          setMessages([...messages, response]);
        }}
      />
    </>
  );
};

export default memo(ChannelBody);

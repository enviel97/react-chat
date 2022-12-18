import useSocket from "@hooks/useSocket";
import string from "@utils/string";
import { memo, useEffect, useLayoutEffect } from "react";
import { Event } from "@core/common/socket.define";
import MessageItem from "../ui/MessageItem";
import { Box } from "@utils/styles";
import useAppDispatch from "@hooks/useAppDispatch";
import { MessageContainer } from "../../styles/Message.decorate";
import useAppSelector from "@hooks/useAppSelector";
import { addMessages, selectAllMessage } from "@store/slices/messageSlice";
import { isLoading } from "@utils/validate";
import MessageContainerLoading from "../ui/MessageContainerLoading";

const ChannelBody = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectAllMessage);
  const status = useAppSelector((state) => state.message.process);
  const socket = useSocket();

  useEffect(() => {
    socket.on(Event.EMIT_NOTIFICATION_MESSAGE, (msg: Message) => {
      dispatch(addMessages(msg));
    });

    return () => {
      socket.off(Event.EMIT_NOTIFICATION_MESSAGE);
    };
  }, [dispatch, socket]);

  useLayoutEffect(() => {
    // Scroll to new messenger
    const container = document.querySelector(`${MessageContainer}`);
    container?.scrollTo({
      top: container?.scrollHeight ?? window.innerHeight,
      left: 0,
      behavior: "auto",
    });
  }, [messages]);

  if (isLoading(status)) {
    return <MessageContainerLoading />;
  }

  return (
    <MessageContainer>
      {messages.length === 0 && (
        <Box
          style={{ height: "75vh" }}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <h5>Say hi to to begin conversation</h5>
        </Box>
      )}
      {messages.length !== 0 &&
        messages.map((mess, index, arr) => {
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
    </MessageContainer>
  );
};

export default memo(ChannelBody);

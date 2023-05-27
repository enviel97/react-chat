import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import { updateLastMessage } from "@store/slices/conversations";
import {
  addMessages,
  editMessage,
  removeMessage,
} from "@store/slices/messages";
import { selectConversationType } from "@store/slices/ui";
import { useCallback, useEffect } from "react";

const useMessageSocket = (id: string) => {
  const dispatch = useAppDispatch();
  const type = useAppSelector(selectConversationType);
  const socket = useSocket();

  const onMessageCreated = useCallback(
    (msg: Message) => {
      if (msg.conversationId === id) {
        dispatch(addMessages(msg));
      }
    },
    [dispatch, id]
  );

  const onMessageRemove = useCallback(
    (payload: MessageRemovePayload) => {
      const { conversationId, messageId } = payload;
      if (conversationId === id) {
        dispatch(removeMessage(messageId));
      }
    },
    [id, dispatch]
  );

  const onMessageEdited = useCallback(
    (payload: MessageEditedPayload) => {
      const { conversationId, messageId, content } = payload;
      if (conversationId === id) {
        dispatch(editMessage({ messageId, content }));
      }
    },
    [dispatch, id]
  );

  const onUpdateLastMessage = useCallback(
    (payload: Message) => {
      const { conversationId } = payload;
      console.log(payload);
      dispatch(updateLastMessage({ conversationId, message: payload, type }));
    },
    [dispatch, type]
  );

  useEffect(() => {
    socket.on(Event.EVENT_MESSAGE_CREATED, onMessageCreated);
    socket.on(Event.EVENT_MESSAGE_REMOVE, onMessageRemove);
    socket.on(Event.EVENT_MESSAGE_EDITED, onMessageEdited);
    socket.on(Event.EVENT_MESSAGE_UPDATE_LAST_MESSAGE, onUpdateLastMessage);
    return () => {
      socket.off(Event.EVENT_MESSAGE_EDITED);
      socket.off(Event.EVENT_MESSAGE_REMOVE);
      socket.off(Event.EVENT_MESSAGE_CREATED);
      socket.off(Event.EVENT_MESSAGE_UPDATE_LAST_MESSAGE);
    };
  }, [
    socket,
    onMessageCreated,
    onMessageRemove,
    onMessageEdited,
    onUpdateLastMessage,
  ]);
};
export default useMessageSocket;

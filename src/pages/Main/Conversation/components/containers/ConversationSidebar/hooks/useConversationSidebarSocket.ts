import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import {
  addConversation,
  removeConversation,
  updateConversation,
} from "@store/slices/conversations";
import { useCallback, useEffect } from "react";

const useConversationSidebarSocket = (type: ConversationType) => {
  const socket = useSocket();
  const dispatch = useAppDispatch();

  const dispatchOnBannedUser = useCallback(
    (payload: BannedMemberPayload) => {
      dispatch(removeConversation(payload));
    },
    [dispatch]
  );

  const dispatchOnRemoveMembers = useCallback(
    (payload: Conversation) => {
      dispatch(updateConversation({ conversation: payload, type: type }));
    },
    [dispatch, type]
  );
  const dispatchOnCreateConversation = useCallback(
    (payload: Conversation) => {
      dispatch(addConversation({ conversation: payload, type: type }));
    },
    [dispatch, type]
  );

  useEffect(() => {
    socket.on(Event.EVENT_BANNED_USER, dispatchOnBannedUser);
    socket.on(Event.EVENT_REMOVE_NEW_MEMBERS, dispatchOnRemoveMembers);
    socket.on(Event.EVENT_CONVERSATION_CREATED, dispatchOnCreateConversation);
    return () => {
      socket.off(Event.EVENT_CONVERSATION_CREATED);
      socket.off(Event.EVENT_REMOVE_NEW_MEMBERS);
      socket.off(Event.EVENT_BANNED_USER);
    };
    // eslint
  }, [
    dispatchOnBannedUser,
    dispatchOnRemoveMembers,
    dispatchOnCreateConversation,
    socket,
  ]);
};

export default useConversationSidebarSocket;

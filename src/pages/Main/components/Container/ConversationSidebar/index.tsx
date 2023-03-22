import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import { fetchConversations } from "@store/repo/conversation";
import {
  addConversation,
  updateConversation,
  removeConversation,
} from "@store/slices/conversations";
import { useCallback, useEffect } from "react";
import SideHeader from "./components/containers/SideHeader";
import SideItems from "./components/containers/SideItems";
import { SidebarContainer } from "./styles/Sidebar.decorate";

const ConversationSidebar = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const type = useAppSelector((state) => state.ui.selectedConversationType);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch, type]);

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
    dispatch,
  ]);

  return (
    <SidebarContainer>
      <SideHeader />
      <SideItems />
    </SidebarContainer>
  );
};

export default ConversationSidebar;

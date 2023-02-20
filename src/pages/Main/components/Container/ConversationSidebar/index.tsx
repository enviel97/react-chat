import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import { fetchConversations } from "@store/repo/conversation";
import { addConversation } from "@store/slices/conversations";
import { useEffect } from "react";
import SideHeader from "./components/containers/SideHeader";
import SideItems from "./components/containers/SideItems";
import { SidebarContainer } from "./styles/Sidebar.decorate";

const ConversationSidebar = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const type = useAppSelector((state) => state.conversation.type);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch, type]);

  useEffect(() => {
    socket.on(Event.EVENT_CONVERSATION_CREATED, (payload: Conversation) => {
      dispatch(addConversation(payload));
    });
    return () => {
      socket.off(Event.EVENT_CONVERSATION_CREATED);
    };
  }, [socket, dispatch]);

  return (
    <SidebarContainer>
      <SideHeader />
      <SideItems />
    </SidebarContainer>
  );
};

export default ConversationSidebar;

import { Event } from "@core/common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { fetchConversations } from "@store/repo/conversation";
import { addConversation } from "@store/slices/conversationSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideHeader from "./components/containers/SideHeader";
import SideItems from "./components/containers/SideItems";
import { SidebarContainer } from "./styles/Sidebar.decorate";

enum ConversationType {
  GROUP = "group",
  DIRECT = "direct",
}

const ConversationSidebar = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const navigator = useNavigate();
  const [type, setType] = useState<ConversationType>(ConversationType.DIRECT);

  const onFilter = (type: "direct" | "group") => {
    if (type === "direct") setType(ConversationType.DIRECT);
    else setType(ConversationType.GROUP);
    navigator("/conversation");
  };

  useEffect(() => {
    socket.on(Event.EVENT_CONVERSATION_CREATED, (payload: Conversation) => {
      dispatch(addConversation(payload));
    });
    return () => {
      socket.off(Event.EVENT_CONVERSATION_CREATED);
    };
  }, [socket, dispatch]);

  useEffect(() => {
    dispatch(fetchConversations(type));
  }, [dispatch, type]);

  return (
    <SidebarContainer>
      <SideHeader onFilter={onFilter} />
      <SideItems />
    </SidebarContainer>
  );
};

export default ConversationSidebar;

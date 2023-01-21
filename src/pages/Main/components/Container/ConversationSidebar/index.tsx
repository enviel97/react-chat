import { Event } from "@core/common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import {
  fetchDirectConversations,
  fetchGroupConversations,
} from "@store/repo/conversation";
import { addConversation } from "@store/slices/conversationSlice";
import { useEffect, useState } from "react";
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
  const [type, setType] = useState<ConversationType>(ConversationType.DIRECT);

  const onFilter = (type: "direct" | "group") => {
    if (type === "direct") {
      setType(ConversationType.DIRECT);
    } else {
      setType(ConversationType.GROUP);
    }
  };

  useEffect(() => {
    if (type === "group") {
      dispatch(fetchGroupConversations());
      return;
    }
    dispatch(fetchDirectConversations());
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
      <SideHeader onFilter={onFilter} />
      <SideItems type={type} />
    </SidebarContainer>
  );
};

export default ConversationSidebar;

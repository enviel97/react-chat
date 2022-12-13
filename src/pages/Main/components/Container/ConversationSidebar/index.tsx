import useAppDispatch from "@hooks/useAppDispatch";
import { fetchConversations } from "@store/repo/conversation";
import { useEffect } from "react";
import SideHeader from "./components/SideHeader";
import SideItems from "./components/SideItems";
import {
  SidebarContainer,
  SideItemsContainer,
} from "./styles/Sidebar.decorate";

const ConversationSidebar = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  return (
    <SidebarContainer>
      <SideHeader />
      <SideItemsContainer>
        <SideItems />
      </SideItemsContainer>
    </SidebarContainer>
  );
};

export default ConversationSidebar;

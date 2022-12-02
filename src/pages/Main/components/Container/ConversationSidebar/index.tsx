import SideHeader from "./components/SideHeader";
import SideItems from "./components/SideItems";
import {
  SidebarContainer,
  SideItemsContainer,
} from "./styles/Sidebar.decorate";

const ConversationSidebar = () => {
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

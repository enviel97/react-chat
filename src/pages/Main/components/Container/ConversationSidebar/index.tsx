import SideHeader from "./components/SideHeader";
import SideItems from "./components/SideItems";
import { SidebarContainer } from "./styles/Sidebar.decorate";

const ConversationSidebar = () => {
  return (
    <SidebarContainer>
      <SideHeader />
      <SideItems />
    </SidebarContainer>
  );
};

export default ConversationSidebar;

import SideHeader from "./components/SideHeader";
import SideItems from "./components/SideItems";
import {
  SidebarContainer,
  SideFooterContainer,
} from "./styles/Sidebar.decorate";

const ConversationSidebar = () => {
  return (
    <SidebarContainer>
      <SideHeader />
      <SideItems />
      <SideFooterContainer />
    </SidebarContainer>
  );
};

export default ConversationSidebar;

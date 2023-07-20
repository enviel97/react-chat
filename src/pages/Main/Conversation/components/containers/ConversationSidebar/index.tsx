import { lazy, memo, Suspense } from "react";
import SideHeader from "./components/containers/SideHeader";
import Loading from "./components/containers/SideItems/components/loading";
import useConversationSidebarSocket from "./hooks/useConversationSidebarSocket";
import { SidebarContainer } from "./styles/Sidebar.decorate";

const SideItems = lazy(() => import("./components/containers/SideItems"));

const ConversationSidebar = () => {
  useConversationSidebarSocket();

  return (
    <SidebarContainer>
      <SideHeader />
      <Suspense fallback={<Loading count={7} />}>
        <SideItems />
      </Suspense>
    </SidebarContainer>
  );
};

export default memo(ConversationSidebar);

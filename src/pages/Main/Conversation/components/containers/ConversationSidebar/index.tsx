import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import { fetchConversations } from "@store/repo/conversation";
import { lazy, memo, Suspense, useEffect } from "react";
import SideHeader from "./components/containers/SideHeader";
import Loading from "./components/containers/SideItems/components/loading";
import useConversationSidebarSocket from "./hooks/useConversationSidebarSocket";
import { SidebarContainer } from "./styles/Sidebar.decorate";

const SideItems = lazy(() => import("./components/containers/SideItems"));

const ConversationSidebar = () => {
  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.ui.selectedConversationType);
  useConversationSidebarSocket(type);
  useEffect(() => {
    const promise = dispatch(fetchConversations(type));
    return promise.abort;
  }, [dispatch, type]);

  return (
    <SidebarContainer>
      <SideHeader />
      <Suspense fallback={<Loading count={2} />}>
        <SideItems />
      </Suspense>
    </SidebarContainer>
  );
};

export default memo(ConversationSidebar);

import MainLayout from "@pages/Static/MainLayout.page";
import { Navigate, Route } from "react-router-dom";

import { Page } from "@utils/styles";
import { Outlet, useParams } from "react-router-dom";
import { Panel, UnselectedConversation } from "./styles/Conversation.decorate";

import ConversationError from "./components/Container/ConversationError";
import ConversationAction from "./components/Container/ConversationAction";
import useBreakpoint from "@hooks/useBreakpoint";
import { lazy, Suspense } from "react";
import MessageContainerLoading from "./components/Container/ConversationChannel/components/ui/MessageContainerLoading";
import Friends from "./components/Container/Friends";
import ConversationSidebar from "./components/Container/ConversationSidebar";
const ConversationChannel = lazy(
  () => import("./components/Container/ConversationChannel")
);

const ConversationLayout = () => {
  const params = useParams();
  const breakpoint = useBreakpoint();

  return (
    <Page display='flex' height={`${window.innerHeight}px`}>
      <ConversationAction />
      {breakpoint.up("tablet") && <ConversationSidebar />}
      <Panel>
        {breakpoint.down("tablet") && <ConversationSidebar />}
        {!params?.id && (
          <UnselectedConversation>Select messenger</UnselectedConversation>
        )}
        <Suspense fallback={<MessageContainerLoading />}>
          {params?.id && <Outlet />}
        </Suspense>
      </Panel>
      <Friends />
    </Page>
  );
};

const MainRoute = (
  <Route path='/' key='Main' element={<MainLayout />}>
    <Route path='home' element={<Navigate to={"/conversation"} replace />} />
    <Route path='' element={<Navigate to={"/conversation"} replace />} />
    <Route path='conversation'>
      <Route
        path='/conversation'
        key='Conversation'
        errorElement={<ConversationError />}
        element={<ConversationLayout />}
      >
        <Route path='messenger/:id' element={<ConversationChannel />} />
      </Route>
    </Route>
  </Route>
);

export default MainRoute;

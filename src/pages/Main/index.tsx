import MainLayout from "@pages/Static/MainLayout.page";
import { Navigate, Route } from "react-router-dom";

import { Page } from "@utils/styles";
import { Outlet, useParams } from "react-router-dom";
import { Panel, UnselectedConversation } from "./styles/Conversation.decorate";

import ConversationSidebar from "./components/Container/ConversationSidebar";
import ConversationChannel from "./components/Container/ConversationChannel";
import ConversationError from "./components/Container/ConversationError";
import ConversationAction from "./components/Container/ConversationAction";
import useBreakpoint from "@hooks/useBreakpoint";

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
        {params?.id && <Outlet />}
      </Panel>
    </Page>
  );
};

const MainRoute = (
  <Route path='/' key='Main' element={<MainLayout />}>
    <Route path='home' element={<Navigate to={"/conversation"} replace />} />
    <Route path='' element={<Navigate to={"/conversation"} replace />} />
    <Route path='conversation' errorElement={<ConversationError />}>
      <Route
        path='/conversation'
        key='Conversation'
        element={<ConversationLayout />}
      >
        <Route
          path='messenger/:id'
          errorElement={<ConversationError />}
          element={<ConversationChannel />}
        />
      </Route>
    </Route>
  </Route>
);

export default MainRoute;

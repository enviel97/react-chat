import MainLayout from "@pages/Static/MainLayout.page";
import { defer, Navigate, Route } from "react-router-dom";

import { Page } from "@utils/styles";
import { Outlet, useParams } from "react-router-dom";
import { Panel } from "./styles/Conversation.decorate";

import ConversationSidebar from "./components/Container/ConversationSidebar";
import ConversationChannel from "./components/Container/ConversationChannel";
import ConversationError from "./components/Container/ConversationError";
import { getConversation } from "./repo/conversation";

const ConversationLayout = () => {
  const params = useParams();
  return (
    <Page display='flex'>
      <ConversationSidebar />
      <Panel>
        {!params?.id && <h4>Select messenger</h4>}
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
          loader={({ params }) => {
            const conversation = getConversation(params.id!);
            return defer({ conversation });
          }}
          errorElement={<ConversationError />}
          element={<ConversationChannel />}
        />
      </Route>
    </Route>
  </Route>
);

export default MainRoute;

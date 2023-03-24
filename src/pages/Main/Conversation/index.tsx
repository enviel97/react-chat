import { Route } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";
import { Panel, UnselectedConversation } from "./styles/Conversation.decorate";
import useBreakpoint from "@hooks/useBreakpoint";
import ConversationSidebar from "./components/Container/ConversationSidebar";
import Friends from "./components/Container/Friends";
import ConversationChannel from "./components/Container/ConversationChannel";
import ConversationError from "./components/Container/ConversationError";
import { Fragment } from "react";

const ConversationLayout = () => {
  const params = useParams();
  const breakpoint = useBreakpoint();

  return (
    <Fragment>
      {breakpoint.up("tablet") && <ConversationSidebar />}
      <Panel>
        {breakpoint.down("tablet") && <ConversationSidebar />}
        {!params?.id && (
          <UnselectedConversation>Select messenger</UnselectedConversation>
        )}
        {params.id && <Outlet />}
      </Panel>
      <Friends />
    </Fragment>
  );
};

const ConversationRoute = (
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
);

export default ConversationRoute;

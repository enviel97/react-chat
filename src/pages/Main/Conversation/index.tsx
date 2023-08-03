import { Route } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";
import { Panel, UnselectedConversation } from "./styles/Conversation.decorate";
import useBreakpoint from "@hooks/useBreakpoint";
import ConversationSidebar from "./components/containers/ConversationSidebar";
import Friends from "./components/containers/Friends";
import ConversationChannel from "./components/containers/ConversationChannel";
import ConversationError from "./components/containers/ConversationError";
import { Fragment } from "react";
import useFriendFetch from "../hooks/useFriendFetch";
import useConversationFetch from "../hooks/useConversationsFetch";

const ConversationLayout = () => {
  const params = useParams();
  const breakpoint = useBreakpoint();

  /**
   * Fetch friends list
   */
  useFriendFetch();

  /**
   * Fetch conversation list
   */
  useConversationFetch();

  return (
    <Fragment>
      {!breakpoint.down("tablet") && <ConversationSidebar />}
      <Panel>
        {breakpoint.down("tablet") && <ConversationSidebar />}
        {!params?.id && (
          <UnselectedConversation>Select messenger</UnselectedConversation>
        )}
        {params.id && <Outlet />}
      </Panel>
      {breakpoint.up("tablet") && <Friends />}
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

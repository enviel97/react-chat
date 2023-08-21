import { Route } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";
import {
  ConversationContainer,
  ConversationMessageContainer,
  UnselectedConversation,
} from "./styles/Conversation.decorate";
import useBreakpoint from "@hooks/useBreakpoint";
import ConversationSidebar from "./components/containers/ConversationSidebar";
import Friends from "./components/containers/Friends";
import ConversationChannel from "./components/containers/ConversationChannel";
import ConversationError from "./components/containers/ConversationError";
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
    <ConversationContainer>
      {/* width: 25svw;  max-width: 250px;x */}
      <ConversationMessageContainer>
        <ConversationSidebar />
        <UnselectedConversation>
          {!params?.id && "Select messenger"}
          {params.id && <Outlet />}
        </UnselectedConversation>
      </ConversationMessageContainer>
      {/* width-full: 250px; width-small: 150px */}
      {!breakpoint.down("tablet") && <Friends />}
    </ConversationContainer>
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

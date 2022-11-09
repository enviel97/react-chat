import { Page } from "@utils/styles";
import { Outlet, useParams } from "react-router-dom";
import ConversationSidebar from "../components/Container/ConversationSidebar";
import { Panel } from "../styles/Conversation.decorate";

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

export default ConversationLayout;

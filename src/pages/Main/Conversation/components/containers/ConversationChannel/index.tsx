import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import ChannelSendForm from "./components/container/ChannelSendForm";
import { AttachmentsProvider } from "./context/AttachmentProvider";
import useConversationSocket from "./hooks/useConversationSocket";
import useEmitJoinRoom from "./hooks/useEmitJoinRoom";
import useFetchMessages from "./hooks/useFetchMessages";
import {
  ChannelBodyContainer,
  ChannelContainer,
} from "./styles/Channel.decorate";
import ChannelHeaderLoading from "./components/container/ChannelHeader/components/ChannelHeaderLoading";
import ChannelBodyLoading from "./components/container/ChannelBody/components/ui/ChannelBodyLoading";

const Body = lazy(() => import("./components/container/ChannelBody"));
const Header = lazy(() => import("./components/container/ChannelHeader"));

const ConversationChannel = () => {
  const { id = "" } = useParams<{ id: string }>();
  useConversationSocket(id);
  useEmitJoinRoom(id);
  useFetchMessages(id);

  return (
    <AttachmentsProvider accepts={["image"]}>
      <ChannelContainer>
        <Suspense fallback={<ChannelHeaderLoading />}>
          <Header conversationId={id} />
        </Suspense>
        <ChannelBodyContainer>
          <Suspense fallback={<ChannelBodyLoading />}>
            <Body />
          </Suspense>
          <ChannelSendForm conversationId={id} />
        </ChannelBodyContainer>
      </ChannelContainer>
    </AttachmentsProvider>
  );
};

export default ConversationChannel;

import useAppSelector from "@hooks/useAppSelector";
import { isError } from "@utils/validate";
import { lazy, Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";

import ChannelSendForm from "./components/container/ChannelSendForm";
import MessageContainerLoading from "./components/ui/MessageContainerLoading";
import { AttachmentsProvider } from "./context/AttachmentProvider";
import useConversationSocket from "./hooks/useConversationSocket";
import useEmitJoinRoom from "./hooks/useEmitJoinRoom";
import useFetchMessages from "./hooks/useFetchMessages";
import {
  ChannelBodyContainer,
  ChannelContainer,
} from "./styles/Channel.decorate";

const ChannelBody = lazy(() => import("./components/container/ChannelBody"));
const ChannelHeader = lazy(
  () => import("./components/container/ChannelHeader")
);

const ConversationChannel = () => {
  const { id = "" } = useParams<{ id: string }>();
  const process = useAppSelector((state) => state.message.process);
  useConversationSocket(id);
  useEmitJoinRoom(id);
  useFetchMessages(id);

  if (isError(process)) {
    return <Navigate to={"/conversation"} replace={true} />;
  }

  return (
    <AttachmentsProvider>
      <ChannelContainer>
        <Suspense fallback={"Loading ..."}>
          <ChannelHeader conversationId={id} />
        </Suspense>
        <ChannelBodyContainer>
          <Suspense fallback={<MessageContainerLoading />}>
            <ChannelBody />
          </Suspense>
          <ChannelSendForm conversationId={id} />
        </ChannelBodyContainer>
      </ChannelContainer>
    </AttachmentsProvider>
  );
};

export default ConversationChannel;

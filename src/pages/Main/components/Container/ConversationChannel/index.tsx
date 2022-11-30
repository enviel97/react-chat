import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import ChannelBody from "./components/container/ChannelBody";
import ChannelHeader from "./components/container/ChannelHeader";
import ChannelBodyLoading from "./components/loading/ChannelBodyLoading";
import ChannelHeaderLoading from "./components/loading/ChannelHeaderLoading";
import {
  ChannelBodyContainer,
  ChannelContainer,
} from "./styles/Channel.decorate";

interface LoaderData {
  conversation: Conversation;
}

const ConversationChannel = () => {
  const { conversation } = useLoaderData() as LoaderData;

  return (
    <ChannelContainer>
      <Suspense fallback={<ChannelHeaderLoading />}>
        <Await resolve={conversation}>
          <ChannelHeader />
        </Await>
      </Suspense>
      <ChannelBodyContainer>
        <Suspense fallback={<ChannelBodyLoading />}>
          <Await resolve={conversation}>
            <ChannelBody />
          </Await>
        </Suspense>
      </ChannelBodyContainer>
    </ChannelContainer>
  );
};

export default ConversationChannel;

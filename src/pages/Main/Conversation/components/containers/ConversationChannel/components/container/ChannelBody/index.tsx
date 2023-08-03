import string from "@utils/string";
import { memo } from "react";
import useAppSelector from "@hooks/useAppSelector";
import { selectAllMessage } from "@store/slices/messages";
import { isLoading } from "@utils/validate";
import { useParams } from "react-router-dom";
import useAutoScrollToBottom from "./hooks/useAutoScrollToBottom";
import { ChannelMessageContainer } from "../../../styles/Channel.decorate";
import MessageItem from "./components/container/MessageItem";
import ChannelEmpty from "./components/container/ChannelEmpty";
import useMessageSocket from "./hooks/useMessageSocket";
import MessageNotice from "./components/ui/MessageNotice";
import ChannelBodyLoading from "./components/ui/ChannelBodyLoading";
import MessageRemoved from "./components/ui/MessageRemoved";
import AttachmentSideProvider from "./components/container/AttachmentSideProvider";

const ChannelBody = () => {
  const { id = "" } = useParams();
  const messages = useAppSelector(selectAllMessage);
  const status = useAppSelector((state) => state.message.process);
  const ref = useAutoScrollToBottom();
  useMessageSocket(id);
  if (isLoading(status)) return <ChannelBodyLoading />;

  return (
    <AttachmentSideProvider>
      <ChannelMessageContainer ref={ref}>
        {messages.length === 0 && <ChannelEmpty id={id} />}
        {messages.length !== 0 &&
          messages.map((mess, index, arr) => {
            const key = `${string.getId(mess)}$${index}`;
            if (mess.action === "Notice") {
              return <MessageNotice key={key} message={mess} />;
            }
            if (mess.action === "Removed") {
              return <MessageRemoved key={key} message={mess} />;
            }
            const presentChatter =
              index === 0 || arr[index - 1]?.action === "Notice"
                ? undefined
                : arr[index - 1].author.getId();
            const lastChatter = index === arr.length - 1;
            return (
              <MessageItem
                key={key}
                message={mess}
                preChatter={presentChatter}
                lastChatter={lastChatter}
              />
            );
          })}
      </ChannelMessageContainer>
    </AttachmentSideProvider>
  );
};

export default memo(ChannelBody);

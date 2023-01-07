import { Event } from "@core/common/socket.define";
import useAppSelector from "@hooks/useAppSelector";
import useAuthenticate from "@hooks/useAuthenticate";
import useSocket from "@hooks/useSocket";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import { selectConversationById } from "@store/slices/conversationSlice";
import string from "@utils/string";
import { FC, memo, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SideItemContainer,
  SideItemContent,
} from "../../../styles/Sidebar.decorate";
import Loading from "./loading";

enum Status {
  New = "New",
  Seen = "Seen",
}

interface ItemProps {
  channelId: string;
}

const Item: FC<ItemProps> = ({ channelId }) => {
  const [status, setStatus] = useState<Status>(Status.Seen);
  const { isUser } = useAuthenticate();
  const navigator = useNavigate();
  const socket = useSocket();
  const channel = useAppSelector((state) =>
    selectConversationById(state, channelId)
  );

  if (!channel) return <Loading />;

  const _seen = () => {
    // TODO: Seen
    setStatus(Status.Seen);
    navigator(`messenger/${channelId}`);
    socket.emit(Event.EVENT_CONNECT_ROOM_CONVERSATION, {
      conversationId: channelId,
    });
  };

  const conversationName = isUser(channel.participant)
    ? string.getFullName(channel.author)
    : string.getFullName(channel.participant);

  const lastMessenger = !channel.lastMessage
    ? ""
    : isUser(channel.lastMessage.author)
    ? "You: "
    : `${channel.lastMessage.author.lastName}: `;

  return (
    <SideItemContainer onClick={_seen}>
      <CircleAvatar className='avatar' />
      <SideItemContent>
        <span className='Messenger'>{conversationName}</span>

        <span className={string.classList("Content", status)}>
          <span
            className={string.classList(
              "Content--Text",
              channel.lastMessage ? "" : "Content--Default"
            )}
          >
            {lastMessenger}
            {channel.lastMessage?.content ??
              "Say something with your friend !!"}
          </span>

          <span className='Content--Time'>
            {string.chatFromNow(channel.lastMessage?.createdAt)}
            {status === Status.New && <span className='Circle' />}
          </span>
        </span>
      </SideItemContent>
    </SideItemContainer>
  );
};

export default memo(Item);

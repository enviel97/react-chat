import useAuthenticate from "@hooks/useAuthenticate";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import string from "@utils/string";
import { FC, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideItemContainer } from "../../../styles/Sidebar.decorate";

enum Status {
  New = "New",
  Seen = "Seen",
}

interface ItemProps {
  channel: Conversation;
}

const Item: FC<ItemProps> = ({ channel }) => {
  const [status, setStatus] = useState<Status>(Status.New);
  const { isUser } = useAuthenticate();
  const navigator = useNavigate();

  const _seen = () => {
    // TODO: Seen
    setStatus(Status.Seen);
    navigator(`messenger/${channel.id ?? channel._id}`);
  };

  const conversationName = isUser(channel.participant)
    ? string.getFullName(channel.author)
    : string.getFullName(channel.participant);

  const lastMessenger = !channel.lastMessage
    ? ""
    : isUser(channel.lastMessage.author)
    ? "You "
    : `${channel.lastMessage.author.lastName} `;

  return (
    <SideItemContainer onClick={_seen}>
      <CircleAvatar className='avatar' />
      <div className='Message'>
        <span className='Messenger'>{conversationName}</span>

        <span className={`Content ${status ?? ""}`.trim()}>
          <span
            className={`Content--Text${
              channel.lastMessage ? "" : " Content--Default"
            }`}
          >
            {lastMessenger}
            {channel.lastMessage?.content ??
              "Say something with your friend !!"}
          </span>

          <span className='Content--Time'>
            {string.chatFromNow(channel.lastMessage?.createdAt)}
            {status === Status.New && <div className='Circle' />}
          </span>
        </span>
      </div>
    </SideItemContainer>
  );
};

export default memo(Item);

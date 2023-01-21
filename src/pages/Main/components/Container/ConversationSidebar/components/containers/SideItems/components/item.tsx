import useAuthenticate from "@hooks/useAuthenticate";
import useBreakpoint from "@hooks/useBreakpoint";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import HeaderConversation from "@pages/Main/components/UI/HeaderConversation";
import string from "@utils/string";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  SideItemContainer,
  SideItemContent,
} from "../../../../styles/Sidebar.decorate";

import Loading from "./loading";

enum Status {
  New = "New",
  Seen = "Seen",
}

interface ItemProps {
  channel: Conversation;
  onItemClick: () => void;
}

const Item: FC<ItemProps> = ({ channel, onItemClick }) => {
  const { id } = useParams();
  const [status, setStatus] = useState<Status>(Status.Seen);
  const [selected, setSelected] = useState<boolean>(false);
  const { isUser } = useAuthenticate();
  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (!!id && id === string.getId(channel)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [id, channel]);

  const lastMessenger = useMemo(() => {
    if (!channel) return "";
    return !channel.lastMessage
      ? ""
      : isUser(channel.lastMessage.author)
      ? "You: "
      : `${channel.lastMessage.author.lastName}: `;
  }, [channel, isUser]);

  if (!channel) return <Loading />;

  const _seen = () => {
    // TODO: Seen
    setStatus(Status.Seen);
    onItemClick();
  };

  return (
    <SideItemContainer
      className={string.classList(selected ? "active" : "")}
      onClick={_seen}
    >
      <CircleAvatar
        className='avatar'
        size={breakpoint.up("tablet") ? undefined : 40}
      />
      <SideItemContent>
        <HeaderConversation channel={channel} />

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
            {string.chatFromNow(channel.lastMessage?.updatedAt)}
            {status === Status.New && <span className='Circle' />}
          </span>
        </span>
      </SideItemContent>
    </SideItemContainer>
  );
};

export default memo(Item);

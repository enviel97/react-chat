import useAppSelector from "@hooks/useAppSelector";
import useAuthenticate from "@hooks/useAuthenticate";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import { selectConversationById } from "@store/slices/conversationSlice";
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
  channelId: string;
}

const Item: FC<ItemProps> = ({ channelId }) => {
  const { id } = useParams();
  const [status, setStatus] = useState<Status>(Status.Seen);
  const [selected, setSelected] = useState<boolean>(false);
  const { isUser } = useAuthenticate();
  const navigator = useNavigate();
  const channel = useAppSelector((state) =>
    selectConversationById(state, channelId)
  );

  useEffect(() => {
    // console.log(id);
    if (!!id && id === string.getId(channelId)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [id, channelId]);

  const conversationName = useMemo(() => {
    if (!channel) return "";
    const members = channel.participant.members;
    if (members.length > 2) {
      return "Group of " + members.map((mem) => mem.lastName).join(", ");
    }
    return isUser(members[0])
      ? string.getFullName(members[1])
      : string.getFullName(members[0]);
  }, [channel, isUser]);

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
    navigator(`messenger/${channelId}`);
  };

  return (
    <SideItemContainer
      className={string.classList(selected ? "active" : "")}
      onClick={_seen}
    >
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
            {string.chatFromNow(channel.lastMessage?.updatedAt)}
            {status === Status.New && <span className='Circle' />}
          </span>
        </span>
      </SideItemContent>
    </SideItemContainer>
  );
};

export default memo(Item);

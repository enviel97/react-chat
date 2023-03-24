import useAppSelector from "@hooks/useAppSelector";
import useAuthenticate from "@hooks/useAuthenticate";
import useBreakpoint from "@hooks/useBreakpoint";
import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import HeaderConversation from "@pages/Main/Conversation/components/ui/HeaderConversation";
import { selectConversationById } from "@store/slices/conversations";
import string from "@utils/string";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
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
  conversationId: string;
  onItemClick: () => void;
  onContextMenu: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: Conversation
  ) => void;
}

const Item: FC<ItemProps> = ({
  conversationId,
  onItemClick,
  onContextMenu,
}) => {
  const { id } = useParams();
  const [status, setStatus] = useState<Status>(Status.Seen);
  const [selected, setSelected] = useState<boolean>(false);
  const [lastMessage, setLastMessage] = useState(
    "Say something with your friend !!"
  );
  const { isUser } = useAuthenticate();
  const breakpoint = useBreakpoint();
  const conversation = useAppSelector((state) =>
    selectConversationById(state, conversationId)
  );
  useEffect(() => {
    if (!!conversation?.lastMessage?.content) {
      setLastMessage(conversation.lastMessage.content);
    }
  }, [conversation?.lastMessage?.content]);

  useEffect(() => {
    if (!!id && id === conversationId) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [id, conversationId]);

  const lastMessenger = useMemo(() => {
    if (!conversation) return "";
    return !conversation.lastMessage
      ? ""
      : isUser(conversation.lastMessage.author)
      ? "You: "
      : `${conversation.lastMessage.author.lastName}: `;
  }, [conversation, isUser]);

  if (!conversation) return <Loading />;

  const _seen = () => {
    // TODO: Seen
    setStatus(Status.Seen);
    onItemClick();
  };

  return (
    <SideItemContainer
      className={string.classList(selected ? "active" : "")}
      onClick={_seen}
      onContextMenu={(event) => {
        event.preventDefault();
        onContextMenu(event, conversation);
      }}
    >
      <CircleAvatar
        className='avatar'
        size={breakpoint.up("tablet") ? undefined : 40}
      />
      <SideItemContent>
        <HeaderConversation conversationId={string.getId(conversation)} />
        <span className={string.classList("Content", status)}>
          <span
            className={string.classList(
              "Content--Text",
              conversation.lastMessage ? "" : "Content--Default"
            )}
          >
            {lastMessenger}
            {lastMessage}
          </span>

          <span className='Content--Time'>
            {string.chatFromNow(conversation.lastMessage?.updatedAt)}
            {status === Status.New && <span className='Circle' />}
          </span>
        </span>
      </SideItemContent>
    </SideItemContainer>
  );
};

export default memo(Item);

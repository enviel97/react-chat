import useAppSelector from "@hooks/useAppSelector";
import ConversationAvatar from "@pages/Main/Conversation/components/ui/ConversationAvatar";
import HeaderConversation from "@pages/Main/Conversation/components/ui/HeaderConversation";
import { selectConversationById } from "@store/slices/conversations";
import string from "@utils/string";
import { FC, memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  SideItemContainer,
  SideItemContent,
} from "../../../../styles/Sidebar.decorate";
import useLastMessage from "../hooks/useLastMessage";

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
  const conversation = useAppSelector((state) =>
    selectConversationById(state, conversationId)
  );
  const { lastMessage, lastMessenger } = useLastMessage(conversation);

  useEffect(() => {
    if (!!id && id === conversationId) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [id, conversationId]);

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
      <ConversationAvatar conversationId={conversation.getId()} />
      <SideItemContent>
        <HeaderConversation conversationId={string.getId(conversation)} />
        <span className={string.classList("Content", status)}>
          <span
            className={string.classList(
              "Content--Text",
              !conversation.lastMessage || !conversation.lastMessage.content
                ? "Content--Default"
                : ""
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

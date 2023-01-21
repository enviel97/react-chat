import useAppSelector from "@hooks/useAppSelector";
import { selectAllDirectConversations } from "@store/slices/conversationSlice";
import { selectAllGroupConversations } from "@store/slices/groupConversationSlice";
import string from "@utils/string";
import { isLoading } from "@utils/validate";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  SideItemsContainer,
  SideItemsEmpty,
} from "../../../styles/Sidebar.decorate";
import Item from "./components/item";
import Loading from "./components/loading";

interface SideItemProps {
  type: "direct" | "group";
}

const SideItems: FC<SideItemProps> = ({ type }) => {
  const navigator = useNavigate();
  const conversations = useAppSelector((state) => {
    if (type === "direct") {
      return selectAllDirectConversations(state);
    }
    return selectAllGroupConversations(state);
  });

  const status = useAppSelector((state) => {
    if (type === "direct") {
      return state.conversation.process;
    }
    return state.groupConversation.process;
  });

  if (isLoading(status)) {
    return (
      <SideItemsContainer>
        <Loading />
        <Loading />
      </SideItemsContainer>
    );
  }

  return (
    <SideItemsContainer>
      {conversations.length === 0 && (
        <SideItemsEmpty>No messenger found.</SideItemsEmpty>
      )}
      {conversations.length !== 0 &&
        conversations.map((conversation, index) => {
          const id = string.getId(conversation);
          return (
            <Item
              key={`${id}&${index}`}
              channel={conversation}
              onItemClick={function (): void {
                navigator(`messenger/${type}/${id}`);
              }}
            />
          );
        })}
    </SideItemsContainer>
  );
};

export default SideItems;

import ContextMenuProvider from "@components/Select/ContextMenu";
import useAppSelector from "@hooks/useAppSelector";
import { selectAllConversation } from "@store/slices/conversations";
import string from "@utils/string";
import { isLoading } from "@utils/validate";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  SideItemsContainer,
  SideItemsEmpty,
} from "../../../styles/Sidebar.decorate";
import Item from "./components/item";
import Loading from "./components/loading";
import useSideConversationAction from "./hooks/useSideConversationAction";

const SideItems = () => {
  const navigator = useNavigate();
  const conversations = useAppSelector((state) => selectAllConversation(state));
  const status = useAppSelector((state) => state.conversation.process);
  const ref = useRef<ContextMenuRef>(null);
  const actions = useSideConversationAction();

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
      {conversations.length !== 0 && (
        <ContextMenuProvider ref={ref} menuTitle='Actions' menuItem={actions}>
          {conversations.map((conversation, index) => {
            const id = string.getId(conversation);
            return (
              <div
                key={`${id}&${index}`}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (conversation.type === "group") {
                    ref.current?.onContextMenu<Conversation>(e, conversation);
                  }
                }}
              >
                <Item
                  channel={conversation}
                  onItemClick={function (): void {
                    navigator(`messenger/${id}`);
                  }}
                />
              </div>
            );
          })}
        </ContextMenuProvider>
      )}
    </SideItemsContainer>
  );
};

export default SideItems;

import ContextMenuProvider from "@components/Select/ContextMenu";
import useAppSelector from "@hooks/useAppSelector";
import { selectConversationIds } from "@store/slices/conversations/selectors/getConversationSelector";
import { isLoading } from "@utils/validate";
import { memo, useCallback, useRef } from "react";
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
  const status = useAppSelector((state) => state.conversation.process);
  const ref = useRef<ContextMenuRef>(null);
  const actions = useSideConversationAction();
  const conversationIds = useAppSelector(selectConversationIds);

  const onContextMenu = useCallback(
    (event: any, conversation: Conversation) => {
      if (conversation?.type === "group") {
        ref.current?.onContextMenu<Conversation>(event, conversation);
      }
    },
    []
  );

  if (isLoading(status)) {
    return <Loading count={2} />;
  }

  return (
    <SideItemsContainer>
      {conversationIds.length === 0 && (
        <SideItemsEmpty>No messenger found.</SideItemsEmpty>
      )}
      {conversationIds.length !== 0 && (
        <ContextMenuProvider ref={ref} menuTitle='Actions' menuItem={actions}>
          {conversationIds.map((id, index) => {
            const _id = id.toString();
            return (
              <Item
                onContextMenu={onContextMenu}
                key={`${id}&${index}`}
                conversationId={_id}
                onItemClick={function (): void {
                  navigator(`messenger/${_id}`);
                }}
              />
            );
          })}
        </ContextMenuProvider>
      )}
    </SideItemsContainer>
  );
};

export default memo(SideItems);

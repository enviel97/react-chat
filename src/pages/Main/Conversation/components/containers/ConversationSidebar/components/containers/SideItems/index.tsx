import ContextMenuProvider from "@components/Select/ContextMenu";
import useAppSelector from "@hooks/useAppSelector";
import { selectConversationIds } from "@store/slices/conversations/selectors/getConversationSelector";
import { isLoading, isRefresh } from "@utils/validate";
import { AnimatePresence } from "framer-motion";
import { memo, useCallback, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { CircleSpinner } from "react-spinners-kit";
import { useTheme } from "styled-components";
import {
  SideItemLoading,
  SideItemsContainer,
  SideItemsEmpty,
} from "../../../styles/Sidebar.decorate";
import Item from "./components/item";
import Loading from "./components/loading";
import useSideConversationAction from "./hooks/useSideConversationAction";

const SideItems = () => {
  const navigator = useNavigate();
  const theme = useTheme();
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
      <AnimatePresence mode='wait'>
        {isRefresh(status) && (
          <SideItemLoading
            variants={{
              visible: { x: 0, opacity: 1 },
              hidden: { x: -10, opacity: 0 },
            }}
            initial='hidden'
            animate='visible'
            exit='hidden'
            transition={{ bounce: 0 }}
          >
            <span>
              <CircleSpinner color={theme.disableColor} size={24} />
            </span>
          </SideItemLoading>
        )}
      </AnimatePresence>
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

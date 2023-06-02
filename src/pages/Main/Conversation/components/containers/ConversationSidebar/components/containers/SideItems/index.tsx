import ContextMenuProvider from "@components/Select/ContextMenu";
import useAppSelector from "@hooks/useAppSelector";
import { selectConversationIds } from "@store/slices/conversations/selectors/getConversationSelector";
import { selectConversationType } from "@store/slices/ui";
import { isLoading, isRefresh } from "@utils/validate";
import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import {
  SideItemsContainer,
  SideItemsEmpty,
} from "../../../styles/Sidebar.decorate";
import Item from "./components/item";
import Loading from "./components/loading";
import SideRefreshAnimate from "./components/SideRefreshAnimate";
import useSideConversationAction from "./hooks/useSideConversationAction";

const SideItems = () => {
  const status = useAppSelector((state) => state.conversation.process);
  const actions = useSideConversationAction();
  const conversationIds = useAppSelector(selectConversationIds);
  const type = useAppSelector(selectConversationType);

  if (isLoading(status)) return <Loading count={2} />;

  return (
    <SideItemsContainer>
      <AnimatePresence mode='wait'>
        {isRefresh(status) && <SideRefreshAnimate />}
      </AnimatePresence>
      {conversationIds.length === 0 && (
        <SideItemsEmpty>No messenger found.</SideItemsEmpty>
      )}
      {conversationIds.length !== 0 && (
        <ContextMenuProvider
          menuTitle='Actions'
          menuItem={actions}
          disable={type !== "group"}
        >
          {conversationIds.map((id, index) => {
            const _id = id.toString();
            return <Item key={`${id}&${index}`} conversationId={_id} />;
          })}
        </ContextMenuProvider>
      )}
    </SideItemsContainer>
  );
};

export default memo(SideItems);

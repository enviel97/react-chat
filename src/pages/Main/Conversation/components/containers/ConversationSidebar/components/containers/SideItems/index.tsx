import useAppSelector from "@hooks/useAppSelector";
import { selectConversationIds } from "@store/slices/conversations/selectors/getConversationSelector";
import { isLoading, isRefresh } from "@utils/validate";
import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import {
  SideItemsContainer,
  SideItemsEmpty,
} from "../../../styles/Sidebar.decorate";
import ConversationList from "./components/ConversationList";
import Loading from "./components/loading";
import SideRefreshAnimate from "./components/SideRefreshAnimate";

const SideItems = () => {
  const status = useAppSelector((state) => state.conversation.process);
  const conversationIds = useAppSelector(selectConversationIds);

  if (isLoading(status)) return <Loading count={2} />;

  return (
    <SideItemsContainer>
      <AnimatePresence mode='wait'>
        {isRefresh(status) && <SideRefreshAnimate />}
      </AnimatePresence>
      {conversationIds.length === 0 && (
        <SideItemsEmpty>No messenger found.</SideItemsEmpty>
      )}
      {conversationIds.length !== 0 && <ConversationList />}
    </SideItemsContainer>
  );
};

export default memo(SideItems);

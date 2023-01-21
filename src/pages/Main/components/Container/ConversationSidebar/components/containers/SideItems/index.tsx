import useAppSelector from "@hooks/useAppSelector";
import { selectConversationIds } from "@store/slices/conversationSlice";
import { isLoading } from "@utils/validate";
import { FC } from "react";
import {
  SideItemsContainer,
  SideItemsEmpty,
} from "../../../styles/Sidebar.decorate";
import Item from "./components/item";
import Loading from "./components/loading";

interface SideItemProps {}

const SideItems: FC<SideItemProps> = (props) => {
  const conversationIds = useAppSelector(selectConversationIds);
  const status = useAppSelector((state) => state.conversation.process);

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
      {conversationIds.length === 0 && (
        <SideItemsEmpty>No messenger found.</SideItemsEmpty>
      )}
      {conversationIds.length !== 0 &&
        conversationIds.map((conversationIds, index) => {
          return (
            <Item
              key={`${conversationIds}&${index}`}
              channelId={conversationIds.toString()}
            />
          );
        })}
    </SideItemsContainer>
  );
};

export default SideItems;

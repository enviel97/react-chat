import useAppSelector from "@hooks/useAppSelector";
import { selectConversationIds } from "@store/slices/conversationSlice";
import { FC, Fragment } from "react";
import { SideItemsEmpty } from "../../styles/Sidebar.decorate";
import Item from "./components/item";

interface SideItemProps {}

const SideItems: FC<SideItemProps> = (props) => {
  const conversationIds = useAppSelector(selectConversationIds);
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default SideItems;

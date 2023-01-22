import useAppSelector from "@hooks/useAppSelector";
import { selectAllConversation } from "@store/slices/conversations";
import string from "@utils/string";
import { isLoading } from "@utils/validate";
import { useNavigate } from "react-router-dom";
import {
  SideItemsContainer,
  SideItemsEmpty,
} from "../../../styles/Sidebar.decorate";
import Item from "./components/item";
import Loading from "./components/loading";

const SideItems = () => {
  const navigator = useNavigate();
  const conversations = useAppSelector((state) => selectAllConversation(state));
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
                navigator(`messenger/${id}`);
              }}
            />
          );
        })}
    </SideItemsContainer>
  );
};

export default SideItems;

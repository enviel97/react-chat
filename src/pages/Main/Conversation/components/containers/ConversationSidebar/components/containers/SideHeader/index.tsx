import { TextFieldSearchNeumorphism } from "@components/TextInput";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchConversations } from "@store/repo/conversation";
import { updateTypeConversation } from "@store/slices/ui";
import { useCallback, useRef } from "react";
import AddChatButton from "./components/container/AddChatButton";
import FilterButton from "./components/ui/FilterButton";
import {
  SideHeaderContainer,
  SideHeaderFilter,
  SideHeaderSearchContainer,
} from "./styles/SideHeader.decorate";

const SideHeader = () => {
  const dispatch = useAppDispatch();
  const list = useRef<any>();

  const filter = useCallback(
    (type: "direct" | "group") => {
      if (list.current) list.current.abort();
      dispatch(updateTypeConversation(type));
      list.current = dispatch(fetchConversations(type));
    },
    [dispatch, list]
  );

  return (
    <SideHeaderContainer>
      <SideHeaderSearchContainer>
        <TextFieldSearchNeumorphism
          onSearch={function (search?: string | undefined): void {}}
        />
        <AddChatButton />
      </SideHeaderSearchContainer>

      <SideHeaderFilter>
        <FilterButton text='Messenger' onClick={() => filter("direct")} />
        <FilterButton text='Group' onClick={() => filter("group")} />
      </SideHeaderFilter>
    </SideHeaderContainer>
  );
};

export default SideHeader;

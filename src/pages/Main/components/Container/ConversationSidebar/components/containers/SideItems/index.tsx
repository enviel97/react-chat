import ContextMenuProvider from "@components/Select/ContextMenu";
import useAppSelector from "@hooks/useAppSelector";
import { selectAllConversation } from "@store/slices/conversations";
import string from "@utils/string";
import { isLoading } from "@utils/validate";
import { useEffect, useMemo, useRef } from "react";
import { TiEject, TiArchive } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
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
  const ref = useRef<ContextMenuRef>(null);
  const theme = useTheme();

  useEffect(() => {
    console.log(ref);
  });

  const actions = useMemo<ContextMenuOption[]>(() => {
    return [
      {
        icon: <TiEject size={16} />,
        label: "Leave group",
        onClick: (value?: Conversation) => {
          console.log(value);
        },
        hoverColor: theme.errorColor,
      },
      {
        icon: <TiArchive size={16} />,
        label: "Archive group",
        onClick: (value?: Conversation) => {},
        hoverColor: theme.primaryColor,
      },
    ];
  }, [theme.errorColor, theme.primaryColor]);

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
      <ContextMenuProvider ref={ref} menuTitle='Actions' menuItem={actions}>
        {conversations.length !== 0 &&
          conversations.map((conversation, index) => {
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
    </SideItemsContainer>
  );
};

export default SideItems;

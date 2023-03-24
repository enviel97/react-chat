import { Placeholder } from "@utils/styles";
import { memo } from "react";
import AddChatButton from "../container/AddChatButton";
import {
  SidebarActionContainer,
  SidebarContainer,
} from "../styles/Sidebar.decorate";
import CircleAvatar from "../ui/CircleAvatar";
import FriendsChatButton from "./FriendsChatButton";
import LogoutButton from "./LogoutButton";

const ConversationAction = () => {
  return (
    <SidebarContainer>
      <SidebarActionContainer>
        <CircleAvatar size={48} />
        <Placeholder height='0.5em' width='auto' />
        <AddChatButton />
        <FriendsChatButton />
      </SidebarActionContainer>
      <LogoutButton />
    </SidebarContainer>
  );
};

export default memo(ConversationAction);

import useAppSelector from "@hooks/useAppSelector";
import { Placeholder } from "@utils/styles";
import { selectImage } from "@store/slices/profiles";
import { memo } from "react";
import {
  SidebarActionContainer,
  SidebarContainer,
} from "../styles/Sidebar.decorate";
import CircleAvatar from "../ui/CircleAvatar";
import Conversation from "./Conversation";
import FriendsChatButton from "./FriendRequest";
import LogoutButton from "./LogoutButton";

const ConversationAction = () => {
  const profileAvatar = useAppSelector((state) => selectImage(state, "avatar"));

  return (
    <SidebarContainer>
      <SidebarActionContainer>
        <CircleAvatar size={48} src={profileAvatar} />
        <Placeholder height='0.5em' width='auto' />
        <Conversation />
        <FriendsChatButton />
      </SidebarActionContainer>
      <LogoutButton />
    </SidebarContainer>
  );
};

export default memo(ConversationAction);

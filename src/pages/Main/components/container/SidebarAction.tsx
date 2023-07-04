import useAppSelector from "@hooks/useAppSelector";
import { selectImage } from "@store/slices/profiles";
import { memo } from "react";
import {
  ActionPlaceHolder,
  SidebarActionContainer,
  SidebarContainer,
} from "../styles/Sidebar.decorate";
import CircleAvatar from "../ui/CircleAvatar";
import Conversation from "./Conversation";
import FriendRequest from "./FriendRequest";
import LogoutButton from "./LogoutButton";

const ConversationAction = () => {
  const profileAvatar = useAppSelector((state) => selectImage(state, "avatar"));

  return (
    <SidebarContainer>
      <SidebarActionContainer>
        <CircleAvatar size={48} src={profileAvatar} />
        <ActionPlaceHolder height='0.5em' width='auto' />
        <Conversation />
        <FriendRequest />
      </SidebarActionContainer>
      <LogoutButton />
    </SidebarContainer>
  );
};

export default memo(ConversationAction);

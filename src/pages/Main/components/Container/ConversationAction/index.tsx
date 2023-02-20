import { Placeholder } from "@utils/styles";
import { FC } from "react";
import CircleAvatar from "../../UI/CircleAvatar";
import AddChatButton from "./components/containers/AddChatButton";
import LogoutButton from "./components/containers/LogoutButton";
import FriendsChatButton from "./components/containers/FriendsChatButton";
import {
  ConversationActionContainer,
  ConversationSidebarContainer,
} from "./styles/ConversationAction.decorate";

const ConversationAction: FC<ConversationActionProps> = () => {
  return (
    <ConversationSidebarContainer>
      <ConversationActionContainer>
        <CircleAvatar size={48} />
        <Placeholder height='0.5em' width='auto' />
        <AddChatButton />
        <FriendsChatButton />
      </ConversationActionContainer>
      <LogoutButton />
    </ConversationSidebarContainer>
  );
};

export default ConversationAction;

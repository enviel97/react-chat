import { Placeholder } from "@utils/styles";
import { FC } from "react";
import CircleAvatar from "../../UI/CircleAvatar";
import AddChatButton from "./components/containers/AddChatButton";
import LogoutButton from "./components/containers/LogoutButton";
import ProfileChatButton from "./components/containers/ProfileChatButton";
import {
  ConversationActionContainer,
  ConversationSidebarContainer,
} from "./styles/ConversationAction.decorate";

const ConversationAction: FC<ConversationActionProps> = () => {
  return (
    <ConversationSidebarContainer>
      <ConversationActionContainer>
        <CircleAvatar size={40} />
        <Placeholder height='0.5em' width='auto' />
        <AddChatButton />
        <ProfileChatButton />
      </ConversationActionContainer>
      <LogoutButton />
    </ConversationSidebarContainer>
  );
};

export default ConversationAction;

import { FC, memo } from "react";
import styled from "styled-components";
import AddUserToGroup from "../container/ChannelHeader/components/AddUserToGroup";
import LeaveGroup from "../container/ChannelHeader/components/LeaveGroup";

interface ConversationGroupHeaderActionProps {
  roles: ParticipantRole;
  members: User[];
  type: ConversationType;
  conversationId: string;
}

const Container = styled.div`
  display: flex;
  gap: 1em;
`;

const ConversationGroupHeaderAction: FC<ConversationGroupHeaderActionProps> = ({
  roles,
  conversationId,
  members,
  type,
}) => {
  return (
    <Container>
      <AddUserToGroup
        role={roles}
        conversationId={conversationId}
        members={members}
        type={type ?? "direct"}
      />
      <LeaveGroup conversationId={conversationId} />
    </Container>
  );
};

export default memo(ConversationGroupHeaderAction);

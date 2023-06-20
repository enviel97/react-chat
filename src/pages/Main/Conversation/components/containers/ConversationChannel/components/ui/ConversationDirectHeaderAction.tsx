import { FC, memo } from "react";
import styled from "styled-components";
import AddFriend from "../container/ChannelHeader/components/AddFriend";

interface ConversationDirectHeaderActionProps {
  members: User[];
}

const Container = styled.div`
  display: flex;
  gap: 1em;
`;

const ConversationDirectHeaderAction: FC<
  ConversationDirectHeaderActionProps
> = ({ members }) => {
  return (
    <Container>
      <AddFriend members={members} />
    </Container>
  );
};

export default memo(ConversationDirectHeaderAction);

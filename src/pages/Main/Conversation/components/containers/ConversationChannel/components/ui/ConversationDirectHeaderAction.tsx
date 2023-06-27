import useAppSelector from "@hooks/useAppSelector";
import { selectProfile } from "@store/slices/profiles";
import { FC, memo, useEffect, useState } from "react";
import styled from "styled-components";
import AddFriend from "../container/ChannelHeader/components/AddFriend";
import CallAction from "../container/ChannelHeader/components/CallAction";

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
  const profile = useAppSelector(selectProfile);
  const [friendId, setFriendId] = useState<string>();

  useEffect(() => {
    if (members.length > 2) return;
    const id = members.find((id) => !id.isSame(profile.user))?.getId();
    setFriendId(id);
  }, [members, profile]);

  return (
    <Container>
      <AddFriend friendId={friendId} />
      <CallAction type='PhoneCall' friendId={friendId} />
      <CallAction type='VideoCall' friendId={friendId} />
    </Container>
  );
};

export default memo(ConversationDirectHeaderAction);

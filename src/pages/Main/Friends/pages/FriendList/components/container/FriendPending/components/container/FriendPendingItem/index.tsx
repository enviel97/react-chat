import NetworkImage from "@components/Image/NetworkImage";
import useAppSelector from "@hooks/useAppSelector";
import { selectFriendPendingById } from "@store/slices/friendPending";
import { FC, useMemo } from "react";
import CancelButton from "../../ui/CancelButton";
import FriendItemPendingLoading from "./components/FriendPendingItemLoading";
import {
  Action,
  Body,
  Container,
  Title,
} from "./styles/FriendPendingItem.decorate";

interface Props {
  friendId: string;
}

const FriendPendingItem: FC<Props> = ({ friendId }) => {
  const friend = useAppSelector((state) =>
    selectFriendPendingById(state, friendId)
  );

  const name = useMemo(() => {
    if (!friend) return "Loading...";
    return friend.friendProfile.getProfileUserName();
  }, [friend]);

  if (!friend) return <FriendItemPendingLoading />;

  return (
    <Container>
      <Title>
        <NetworkImage src={friend.friendProfile.avatar} />
      </Title>
      <Body>
        <span>{name}</span>
        <span>pending...</span>
      </Body>
      <Action>
        <CancelButton friendId={friendId} friendName={name} />
      </Action>
    </Container>
  );
};

export default FriendPendingItem;

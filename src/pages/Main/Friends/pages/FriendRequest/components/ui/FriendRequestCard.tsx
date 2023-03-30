import useAppSelector from "@hooks/useAppSelector";
import { selectFriendRequestById } from "@store/slices/friendRequest";
import { FC, memo } from "react";
import { default as Card } from "../../../../components/FriendRequestCard";

interface FriendRequestCardProps {
  friendId: string;
}

const FriendRequestCard: FC<FriendRequestCardProps> = ({ friendId }) => {
  const friend = useAppSelector((state) =>
    selectFriendRequestById(state, friendId)
  );

  if (!friend) return <></>;

  return <Card friend={friend.authorProfile} loading={false} />;
};

export default memo(FriendRequestCard);

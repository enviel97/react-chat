import useAppSelector from "@hooks/useAppSelector";
import { selectFriendRequestById } from "@store/slices/friendRequest";
import { FC, memo, useCallback, useState } from "react";
import { default as Card } from "../../../../components/FriendRequestCard";
import useAppDispatch from "@hooks/useAppDispatch";
import { PromiseToast } from "@components/Toast/promise";
import { fetchFriendRequestResponse } from "@store/repo/user";

interface FriendRequestCardProps {
  friendId: string;
}

const FriendRequestCard: FC<FriendRequestCardProps> = ({ friendId }) => {
  const friend = useAppSelector((state) =>
    selectFriendRequestById(state, friendId)
  );
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>();

  const handleFriendRequestResponse = useCallback(
    (status: "Accept" | "Reject") => {
      PromiseToast({
        async action() {
          setLoading(true);
          return await dispatch(
            fetchFriendRequestResponse({
              friendRequestId: friendId,
              status: status,
            })
          ).unwrap();
        },

        onFinally: () => {
          setLoading(false);
        },
      });
    },
    [friendId, dispatch]
  );

  if (!friend) return <></>;

  return (
    <Card
      friend={friend.authorProfile}
      loading={loading}
      onClickAdd={() => handleFriendRequestResponse("Accept")}
      onClickReject={() => handleFriendRequestResponse("Reject")}
    />
  );
};

export default memo(FriendRequestCard);

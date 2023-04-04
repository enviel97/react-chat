import { PromiseToast } from "@components/Toast/promise";
import useAppDispatch from "@hooks/useAppDispatch";
import FriendRequestCard from "@pages/Main/Friends/components/FriendRequestCard";
import { fetchSendFriendRequest } from "@store/repo/user";
import { addFriendPending } from "@store/slices/friendPending";
import { FC, useCallback, useRef, useState } from "react";
import useSearch from "../hooks/useSearch";

interface AddFriendCardProps {
  profile: UserProfile;
}

const AddFriendCard: FC<AddFriendCardProps> = ({ profile }) => {
  const [isLoading, setLoading] = useState<boolean>();
  const storePromise = useRef<any>();
  const dispatch = useAppDispatch();
  const { remove } = useSearch();

  const onClickAdd = useCallback(
    (profile: UserProfile) => {
      setLoading(true);
      PromiseToast({
        action: async () => {
          if (storePromise.current) storePromise.current.abort();
          storePromise.current = dispatch(
            fetchSendFriendRequest(profile.user.getId())
          );
          return await storePromise.current.unwrap();
        },
        onSuccess: (res: FriendRequest) => {
          dispatch(addFriendPending({ friendReq: res }));
          remove(profile.getId());
        },
        onFinally: () => {
          setLoading(false);
        },
      });
    },
    [remove, dispatch, storePromise]
  );

  return (
    <FriendRequestCard
      friend={profile}
      isShowRejectButton={false}
      onClickAdd={() => onClickAdd(profile)}
      loading={isLoading}
    />
  );
};
export default AddFriendCard;

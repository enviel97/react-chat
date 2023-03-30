import useAppSelector from "@hooks/useAppSelector";
import { FriendPageTitle } from "@pages/Main/Friends/styles/FriendPage.decorate";
import { selectFriendRequestIds } from "@store/slices/friendRequest";
import { memo } from "react";

const FriendRequestTitle = () => {
  const ids = useAppSelector(selectFriendRequestIds);

  return (
    <FriendPageTitle>
      <span>Friend Request</span>
      {Number.isSafeInteger(ids.length) && <strong>{`|${ids.length}|`}</strong>}
    </FriendPageTitle>
  );
};

export default memo(FriendRequestTitle);

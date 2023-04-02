import { memo } from "react";
import { FriendPageTitle } from "@pages/Main/Friends/styles/FriendPage.decorate";
import useAppSelector from "@hooks/useAppSelector";
import { selectUserIds } from "@store/slices/users";

const FriendListTitle = () => {
  const ids = useAppSelector(selectUserIds);

  return (
    <FriendPageTitle>
      <span>
        Friend List
        {Number.isSafeInteger(ids.length) && (
          <strong>{`|${ids.length}|`}</strong>
        )}
      </span>
    </FriendPageTitle>
  );
};

export default memo(FriendListTitle);

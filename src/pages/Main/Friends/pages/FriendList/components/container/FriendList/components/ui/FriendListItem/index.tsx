import { FC, memo } from "react";
import {
  FriendListItemBody,
  FriendListItemContainer,
  FriendListItemTrail,
} from "./styles/FriendListItem.decorate";
import useAppSelector from "@hooks/useAppSelector";
import { selectUserById } from "@store/slices/users";
import FriendStatus from "./components/ui/FriendStatus";
import FriendItemTitle from "./components/container/FriendItemTitle";
import NormalAvatar from "@pages/Main/components/ui/NormalAvatar";
import FriendActions from "./components/container/FriendActions";

const FriendListItem: FC<FriendListItemProps> = ({ friendId }) => {
  const friend = useAppSelector((state) => selectUserById(state, friendId));

  if (!friend) return <></>;

  return (
    <FriendListItemContainer>
      <FriendListItemTrail>
        <NormalAvatar friendAvatarId={friend.avatar} />
      </FriendListItemTrail>
      <FriendListItemBody>
        <FriendItemTitle
          mainName={friend.displayName ?? friend.user.getFullName()}
          subName={friend.displayName && friend.user.getFullName()}
        />
        <FriendStatus friendStatus={friend.status} bio={friend.bio} />
        <FriendActions friendId={friend.user.getId()} />
      </FriendListItemBody>
    </FriendListItemContainer>
  );
};

export default memo(FriendListItem);

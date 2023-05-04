import { ButtonIcon } from "@components/Button";
import { FC, memo } from "react";
import { FaUserAltSlash } from "react-icons/fa";
import {
  FriendListItemAction,
  FriendListItemBody,
  FriendListItemContainer,
  FriendListItemTrail,
} from "./styles/FriendListItem.decorate";
import useAppSelector from "@hooks/useAppSelector";
import { selectUserById } from "@store/slices/users";
import UserActive from "./components/ui/Active";
import FriendItemTitle from "./components/container/FriendItemTitle";
import NormalAvatar from "@pages/Main/components/ui/NormalAvatar";

interface FriendListItemProps {
  friendId: string;
}

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
        <p>
          <strong>Bio.</strong>
          {friend.bio ?? " Nothing to say..."}
        </p>
        <UserActive friendUserActive={friend.status ?? "not-disturb"} />
      </FriendListItemBody>
      <FriendListItemAction>
        <ButtonIcon
          size='2.5rem'
          icon={<FaUserAltSlash size='2rem' />}
          circle
          color='notification'
          hint='Unfriend'
        />
      </FriendListItemAction>
    </FriendListItemContainer>
  );
};

export default memo(FriendListItem);

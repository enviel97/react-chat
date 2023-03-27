import { ButtonIcon } from "@components/Button";
import NetworkImage from "@components/Image/NetworkImage";
import { FC, memo } from "react";
import { FaUserAltSlash } from "react-icons/fa";
import {
  FriendListItemAction,
  FriendListItemBody,
  FriendListItemContainer,
  FriendListItemTrail,
} from "./styles/FriendListItem.decorate";

interface FriendListItemProps {
  friendId: string;
  isLoading?: boolean;
}

const FriendListItem: FC<FriendListItemProps> = ({ friendId }) => {
  return (
    <FriendListItemContainer>
      <FriendListItemTrail>
        <NetworkImage
          src={friendId}
          alt='Avatar'
          width={Number(100).toPx()}
          height={Number(100).toPx()}
        />
      </FriendListItemTrail>
      <FriendListItemBody>
        <h6>Ha Ton Nu Tra My</h6>
        <p>
          <strong>Bio.</strong> Nothing to say...
        </p>
        <p>Online</p>
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

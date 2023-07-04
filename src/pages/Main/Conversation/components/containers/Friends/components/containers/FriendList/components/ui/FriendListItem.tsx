import useAppSelector from "@hooks/useAppSelector";
import useBreakpoint from "@hooks/useBreakpoint";
import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import useFriendListSocket from "@pages/Main/Friends/pages/FriendList/hooks/useFriendListSocket";
import { selectUserById } from "@store/slices/users";
import string from "@utils/string";
import { FC, memo } from "react";
import {
  FriendListAvatarContainer,
  FriendListItemBody,
  FriendListItemContainer,
  FriendListItemContent,
  FriendListItemHint,
} from "../../styles/FriendListItem.decorate";
import FriendListItemLoading from "./FriendListItemLoading";

interface Props {
  friendId: string;
  isOnline?: boolean;
}
interface SubProps {
  profile: UserProfile;
  isOnline: boolean;
}

const Content: FC<SubProps> = memo(({ isOnline, profile }) => {
  return (
    <FriendListItemContent $isOnline={isOnline} $status={profile.status}>
      <span>
        {profile.displayName ??
          string.getFullName(profile.user, { short: true })}
      </span>
      {isOnline && <span>{profile.status ?? "not-disturb"}</span>}
    </FriendListItemContent>
  );
});

const FriendListItem: FC<Props> = ({ friendId, isOnline = false }) => {
  const breakpoint = useBreakpoint();
  const profile = useAppSelector((state) => selectUserById(state, friendId));
  useFriendListSocket();

  if (!profile) return <FriendListItemLoading />;

  return (
    <FriendListItemContainer>
      <FriendListItemBody id={friendId}>
        <FriendListAvatarContainer $isOnline={isOnline}>
          <CircleAvatar
            className='status'
            online={isOnline}
            src={profile.avatar}
          />
        </FriendListAvatarContainer>
        {breakpoint.up("laptop") && (
          <Content isOnline={isOnline} profile={profile} />
        )}
      </FriendListItemBody>
      {breakpoint.down("laptop") && (
        <FriendListItemHint
          id='tooltip'
          anchorId={friendId}
          place={"right"}
          delayShow={100}
        >
          <Content isOnline={isOnline} profile={profile} />
        </FriendListItemHint>
      )}
    </FriendListItemContainer>
  );
};

export default FriendListItem;

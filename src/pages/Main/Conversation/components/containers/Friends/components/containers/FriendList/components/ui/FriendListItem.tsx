import { Event } from "@common/socket.define";
import useBreakpoint from "@hooks/useBreakpoint";
import useSocket from "@hooks/useSocket";
import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import string from "@utils/string";
import { FC, memo, useCallback, useEffect, useState } from "react";
import useUserProvider from "../../../../../hook/useUserProvider";
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
  const { selectById } = useUserProvider();
  const breakpoint = useBreakpoint();
  const [profile, setProfile] = useState<UserProfile>();
  const socket = useSocket();
  const { updateSwap } = useUserProvider();

  useEffect(() => {
    setProfile(selectById(friendId));
  }, [friendId, selectById]);

  const _handleFriendListRetrieve = useCallback(
    (payload: FriendRetrievePayload) => {
      if (friendId === payload.userId) {
        updateSwap({ id: payload.userId, status: payload.status });
      }
    },
    [friendId, updateSwap]
  );

  const _handleUpdateProfile = useCallback(
    (payload: UserProfile) => {
      if (friendId === payload.id) {
        setProfile((prev) => {
          if (!prev) return prev;
          return { ...prev, ...payload };
        });
      }
    },
    [friendId]
  );

  useEffect(() => {
    socket.on(Event.EVENT_FRIEND_LIST_RETRIEVE, _handleFriendListRetrieve);
    socket.on(Event.EVENT_FRIEND_UPLOAD_IMAGE, _handleUpdateProfile);
    socket.on(Event.EVENT_FRIEND_UPDATE_PROFILE, _handleUpdateProfile);

    return () => {
      socket.off(Event.EVENT_FRIEND_LIST_RETRIEVE);
      socket.off(Event.EVENT_FRIEND_UPLOAD_IMAGE);
      socket.off(Event.EVENT_FRIEND_UPDATE_PROFILE);
    };
  }, [socket, _handleFriendListRetrieve, _handleUpdateProfile]);

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

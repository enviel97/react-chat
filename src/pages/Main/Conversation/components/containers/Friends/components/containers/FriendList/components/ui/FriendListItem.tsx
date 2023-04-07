import { Event } from "@common/socket.define";
import useBreakpoint from "@hooks/useBreakpoint";
import useSocket from "@hooks/useSocket";
import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import string from "@utils/string";
import { FC, memo, useEffect, useMemo } from "react";
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
      <span>{string.getFullName(profile.user, { short: true })}</span>
      {isOnline && <span>{profile.status ?? "not-disturb"}</span>}
    </FriendListItemContent>
  );
});

const FriendListItem: FC<Props> = ({ friendId, isOnline = false }) => {
  const { selectById } = useUserProvider();
  const breakpoint = useBreakpoint();
  const socket = useSocket();
  const { updateSwap } = useUserProvider();

  useEffect(() => {
    socket.on(
      Event.EVENT_FRIEND_LIST_RETRIEVE,
      (payload: FriendRetrievePayload) => {
        if (friendId === payload.userId) {
          console.log(payload, friendId);
          updateSwap({ id: payload.userId, status: payload.status });
        }
      }
    );
    return () => {
      socket.off(Event.EVENT_FRIEND_LIST_RETRIEVE);
    };
  }, [socket, friendId, updateSwap]);

  const profile = useMemo(() => {
    return selectById(friendId);
  }, [friendId, selectById]);

  if (!profile) return <FriendListItemLoading />;

  return (
    <FriendListItemContainer>
      <FriendListItemBody id={friendId}>
        <FriendListAvatarContainer $isOnline={isOnline}>
          <CircleAvatar className='status' online={isOnline} />
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

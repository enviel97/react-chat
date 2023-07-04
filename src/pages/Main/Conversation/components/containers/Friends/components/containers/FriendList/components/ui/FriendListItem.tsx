import useAppSelector from "@hooks/useAppSelector";
import useBreakpoint from "@hooks/useBreakpoint";
import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import { selectUserById } from "@store/slices/users";
import { AnimatePresence } from "framer-motion";
import { FC, Fragment, memo } from "react";
import { FriendListAnimate } from "../../styles/FriendList.animate";
import {
  FriendListAvatarContainer,
  FriendListItemBody,
  FriendListItemContent,
  FriendListItemHint,
  FriendListName,
  FriendListStatus,
} from "../../styles/FriendListItem.decorate";
import FriendListItemLoading from "./FriendListItemLoading";

const Content: FC<FriendListItemSubProps> = memo(({ isOnline, profileId }) => {
  const profile = useAppSelector((state) => selectUserById(state, profileId));

  return (
    <AnimatePresence mode='wait'>
      {profile && (
        <FriendListItemContent {...FriendListAnimate.name}>
          <FriendListName $isOnline={isOnline}>
            {profile.getProfileUserName(true)}
          </FriendListName>
          <AnimatePresence>
            {isOnline && (
              <FriendListStatus
                {...FriendListAnimate.status}
                $status={profile.status}
                $bio={!!profile.bio}
              >
                {profile.bio || "Bio not yet."}
              </FriendListStatus>
            )}
          </AnimatePresence>
        </FriendListItemContent>
      )}
    </AnimatePresence>
  );
});

const FriendListItem: FC<FriendListItemProps> = ({
  friendId,
  isOnline = false,
}) => {
  const breakpoint = useBreakpoint();
  const profile = useAppSelector((state) => selectUserById(state, friendId));

  if (!profile) return <FriendListItemLoading />;

  return (
    <Fragment>
      <FriendListItemBody id={friendId}>
        <FriendListAvatarContainer $isOnline={isOnline}>
          <CircleAvatar
            className='status'
            online={isOnline}
            src={profile.avatar}
          />
        </FriendListAvatarContainer>
        {breakpoint.up("laptop") && (
          <Content isOnline={isOnline} profileId={friendId} />
        )}
      </FriendListItemBody>
      {breakpoint.down("laptop") && (
        <FriendListItemHint
          id='tooltip'
          anchorId={friendId}
          place={"right"}
          delayShow={100}
        >
          <Content isOnline={isOnline} profileId={friendId} />
        </FriendListItemHint>
      )}
    </Fragment>
  );
};

export default FriendListItem;

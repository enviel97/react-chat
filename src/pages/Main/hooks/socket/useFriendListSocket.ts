import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { removeFriendPending } from "@store/slices/friendPending";
import { updateFriendList } from "@store/slices/profiles";
import { addFriend, updateFriendProfile } from "@store/slices/users";
import { useCallback, useEffect } from "react";

interface UpdateProfileProps {
  id: string;
  changes: Partial<UserProfile>;
}

interface UpdateProfilePayload {
  user: string;
  type: "banner" | "avatar";
  image: string;
}

const useFriendListSocket = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const handleOnReceiveAllowFriendRequest = useCallback(
    (payload: FriendRequest) => {
      dispatch(addFriend(payload.friendProfile));
      dispatch(updateFriendList(payload.friendProfile.getId()));
      dispatch(removeFriendPending(payload.getId()));
    },
    [dispatch]
  );

  const handleOnReceiveRejectFriendRequest = useCallback(
    (payload: FriendRequest) => {
      dispatch(removeFriendPending(payload.getId()));
    },
    [dispatch]
  );

  const _handleUpdateProfile = useCallback(
    (payload: UpdateProfileProps) => {
      dispatch(updateFriendProfile(payload));
    },
    [dispatch]
  );

  useEffect(() => {
    socket.on(
      Event.EVENT_FRIEND_UPLOAD_IMAGE,
      (payload: UpdateProfilePayload) => {
        _handleUpdateProfile({
          id: payload.user,
          changes: { [payload.type]: payload.image },
        });
      }
    );

    socket.on(Event.EVENT_FRIEND_UPDATE_PROFILE, (payload: UserProfile) => {
      _handleUpdateProfile({
        id: payload.getId(),
        changes: {
          bio: payload.bio,
          ...(payload.status && { status: payload.status }),
          ...(payload.displayName && {
            displayName: payload.displayName,
          }),
        },
      });
    });

    socket.on(
      Event.EVENT_FRIEND_RECEIVE_ALLOW_FRIEND,
      handleOnReceiveAllowFriendRequest
    );

    socket.on(
      Event.EVENT_FRIEND_RECEIVE_REJECT_FRIEND,
      handleOnReceiveRejectFriendRequest
    );

    return () => {
      socket.off(Event.EVENT_FRIEND_UPLOAD_IMAGE);
      socket.off(Event.EVENT_FRIEND_UPDATE_PROFILE);
      socket.off(Event.EVENT_FRIEND_RECEIVE_ALLOW_FRIEND);
      socket.off(Event.EVENT_FRIEND_RECEIVE_REJECT_FRIEND);
    };
  }, [
    handleOnReceiveAllowFriendRequest,
    handleOnReceiveRejectFriendRequest,
    _handleUpdateProfile,
    socket,
  ]);
};

export default useFriendListSocket;

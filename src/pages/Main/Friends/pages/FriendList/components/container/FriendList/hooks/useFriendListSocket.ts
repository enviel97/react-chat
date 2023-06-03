import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { updateFriendProfile } from "@store/slices/users";
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
        changes: payload,
      });
    });

    return () => {
      socket.off(Event.EVENT_FRIEND_UPLOAD_IMAGE);
      socket.off(Event.EVENT_FRIEND_UPDATE_PROFILE);
    };
  }, [socket, _handleUpdateProfile]);
};

export default useFriendListSocket;

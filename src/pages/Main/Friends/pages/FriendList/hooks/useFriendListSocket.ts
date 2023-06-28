import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { removeFriendPending } from "@store/slices/friendPending";
import { updateFriendList } from "@store/slices/profiles";
import { addFriend } from "@store/slices/users";
import { useCallback, useEffect } from "react";

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

  useEffect(() => {
    socket.on(
      Event.EVENT_FRIEND_RECEIVE_ALLOW_FRIEND,
      handleOnReceiveAllowFriendRequest
    );
    socket.on(
      Event.EVENT_FRIEND_RECEIVE_REJECT_FRIEND,
      handleOnReceiveRejectFriendRequest
    );

    return () => {
      socket.off(Event.EVENT_FRIEND_RECEIVE_ALLOW_FRIEND);
      socket.off(Event.EVENT_FRIEND_RECEIVE_REJECT_FRIEND);
    };
  }, [
    handleOnReceiveAllowFriendRequest,
    handleOnReceiveRejectFriendRequest,
    socket,
  ]);
};

export default useFriendListSocket;

import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import {
  addFriendRequest,
  removeFriendRequest,
} from "@store/slices/friendRequest";
import { useCallback, useEffect } from "react";

const useFriendRequestSocket = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const onHasFriendRequest = useCallback(
    (payload: FriendRequest) => {
      dispatch(addFriendRequest(payload));
    },
    [dispatch]
  );

  const handleRemoveFriendRequest = useCallback(
    (payload: FriendRequest) => {
      dispatch(removeFriendRequest(payload.getId()));
    },
    [dispatch]
  );

  useEffect(() => {
    socket.on(Event.EVENT_FRIEND_RECEIVE_FRIEND_REQUEST, onHasFriendRequest);
    socket.on(
      Event.EVENT_FRIEND_RECEIVE_CANCEL_FRIEND_REQUEST,
      handleRemoveFriendRequest
    );

    return () => {
      socket.off(Event.EVENT_FRIEND_RECEIVE_FRIEND_REQUEST);
      socket.off(Event.EVENT_FRIEND_RECEIVE_CANCEL_FRIEND_REQUEST);
    };
  }, [socket, onHasFriendRequest, handleRemoveFriendRequest]);
};

export default useFriendRequestSocket;

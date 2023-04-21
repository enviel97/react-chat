import { Event } from "@common/socket.define";
import { ToastContent } from "@components/Toast/components/ToastContent";
import useSocket from "@hooks/useSocket";
import { useCallback, useEffect } from "react";
import { toast, ToastOptions } from "react-toastify";
const toastObject: ToastOptions = Object.freeze<ToastOptions>({
  autoClose: 5000,
  position: "bottom-left",
});
const useNotificationFriendToast = () => {
  const socket = useSocket();
  const handleOnReceiveRejectFriendRequest = useCallback(
    (payload: FriendRequest) => {
      toast.info(
        <ToastContent>
          <strong>{payload.authorProfile.getProfileUserName()}</strong> not
          allow your friend request
        </ToastContent>,
        toastObject
      );
    },
    []
  );

  const handleOnReceiveAllowFriendRequest = useCallback(
    (payload: FriendRequest) => {
      toast.info(
        <ToastContent>
          <strong>{payload.authorProfile.getProfileUserName()}</strong>
          allow your friend request
        </ToastContent>,
        toastObject
      );
    },
    []
  );

  const onHasFriendRequest = useCallback((payload: FriendRequest) => {
    toast.info(
      <ToastContent>
        You have friend request from{" "}
        <strong>{payload.authorProfile.getProfileUserName()}</strong>
      </ToastContent>,
      toastObject
    );
  }, []);

  useEffect(() => {
    socket.on(
      Event.EVENT_FRIEND_RECEIVE_ALLOW_FRIEND,
      handleOnReceiveAllowFriendRequest
    );
    socket.on(
      Event.EVENT_FRIEND_RECEIVE_REJECT_FRIEND,
      handleOnReceiveRejectFriendRequest
    );
    socket.on(Event.EVENT_FRIEND_RECEIVE_FRIEND_REQUEST, onHasFriendRequest);
    return () => {
      socket.off(Event.EVENT_FRIEND_RECEIVE_ALLOW_FRIEND);
      socket.off(Event.EVENT_FRIEND_RECEIVE_REJECT_FRIEND);
      socket.off(Event.EVENT_FRIEND_RECEIVE_FRIEND_REQUEST);
    };
  }, [
    socket,
    handleOnReceiveAllowFriendRequest,
    handleOnReceiveRejectFriendRequest,
    onHasFriendRequest,
  ]);

  useEffect(() => {}, [socket]);
};

export default useNotificationFriendToast;

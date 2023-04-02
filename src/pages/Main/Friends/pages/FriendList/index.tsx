import useAppDispatch from "@hooks/useAppDispatch";
import { fetchListFriends } from "@store/repo/user";
import { memo, useEffect, useCallback, Fragment } from "react";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import { Event } from "@common/socket.define";
import { addFriend } from "@store/slices/users";
import { removeFriendRequest } from "@store/slices/friendRequest";
import FriendList from "./components/container/FriendList";
import FiendPending from "./components/container/FriendPending";
import AddFriendButton from "./components/ui/AddFriendButton";

const FriendListLayout = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const currentTab = useAppSelector((state) => state.ui.tabFriendSelect);

  const handleOnReceiveAllowFriendRequest = useCallback(
    (payload: FriendRequest) => {
      if (currentTab === "list") {
        dispatch(addFriend(payload.authorProfile));
      }
      if (currentTab === "request") {
        dispatch(removeFriendRequest(payload.getId()));
      }
    },
    [dispatch, currentTab]
  );

  const handleOnReceiveRejectFriendRequest = useCallback(
    (payload: FriendRequest) => {
      if (currentTab === "request") {
        dispatch(removeFriendRequest(payload.getId()));
      }
    },
    [dispatch, currentTab]
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

  useEffect(() => {
    const promise = dispatch(fetchListFriends());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <Fragment>
      <AddFriendButton />
      <FiendPending />
      <FriendList />
    </Fragment>
  );
};

export default memo(FriendListLayout);

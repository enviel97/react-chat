import useAppDispatch from "@hooks/useAppDispatch";
import { memo, useEffect, useCallback, Fragment } from "react";
import useSocket from "@hooks/useSocket";
import { Event } from "@common/socket.define";
import { addFriend } from "@store/slices/users";
import FriendList from "./components/container/FriendList";
import FiendPending from "./components/container/FriendPending";
import AddFriendButton from "./components/ui/AddFriendButton";
import {
  FriendListContainer,
  FriendPendingContainer,
} from "./styles/FriendListTab.decorate";
import { removeFriendPending } from "@store/slices/friendPending";

const FriendListLayout = () => {
  const dispatch = useAppDispatch();

  const socket = useSocket();
  const handleOnReceiveAllowFriendRequest = useCallback(
    (payload: FriendRequest) => {
      dispatch(addFriend(payload.friendProfile));
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

  return (
    <Fragment>
      <AddFriendButton />
      <FriendPendingContainer>
        <FiendPending />
      </FriendPendingContainer>
      <FriendListContainer>
        <FriendList />
      </FriendListContainer>
    </Fragment>
  );
};

export default memo(FriendListLayout);

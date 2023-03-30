import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import { fetchListFriendRequest } from "@store/repo/user";
import { addFriendRequest } from "@store/slices/friendRequest";
import { memo, useCallback, useEffect } from "react";
import CornerLoading from "../../components/CornerLoading";
import FriendRequestList from "./components/container/FriendRequestList";
import FriendRequestTitle from "./components/container/FriendRequestTitle";
import { FriendRequestContainer } from "./styles/FriendRequest.decorate";

const FriendRequest = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const status = useAppSelector((state) => {
    return state["friend-request"].process;
  });

  const onHasFriendRequest = useCallback(
    (payload: FriendRequest) => {
      dispatch(addFriendRequest(payload));
    },
    [dispatch]
  );

  useEffect(() => {
    socket.on(Event.EVENT_FRIEND_RECEIVE_FRIEND_REQUEST, onHasFriendRequest);
    return () => {
      socket.off(Event.EVENT_FRIEND_RECEIVE_FRIEND_REQUEST);
    };
  }, [socket, onHasFriendRequest]);

  useEffect(() => {
    const promise = dispatch(fetchListFriendRequest());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <FriendRequestContainer>
      <FriendRequestTitle />
      <FriendRequestList />
      <CornerLoading status={status} />
    </FriendRequestContainer>
  );
};

export default memo(FriendRequest);

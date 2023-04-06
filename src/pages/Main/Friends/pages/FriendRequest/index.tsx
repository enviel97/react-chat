import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import { fetchListFriendRequest } from "@store/repo/user";
import {
  addFriendRequest,
  removeFriendRequest,
} from "@store/slices/friendRequest";
import { lazy, memo, useCallback, useEffect, Suspense } from "react";
import CornerLoading from "../../components/CornerLoading";
import FriendRequestTitle from "./components/container/FriendRequestTitle";
import { FriendRequestContainer } from "./styles/FriendRequest.decorate";
const FriendRequestList = lazy(
  () => import("./components/container/FriendRequestList")
);

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

  useEffect(() => {
    const promise = dispatch(fetchListFriendRequest());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <FriendRequestContainer>
      <FriendRequestTitle />
      <Suspense fallback={<>Loading...</>}>
        <FriendRequestList />
      </Suspense>
      <CornerLoading status={status} />
    </FriendRequestContainer>
  );
};

export default memo(FriendRequest);

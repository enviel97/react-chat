import useAppDispatch from "@hooks/useAppDispatch";
import { fetchListFriends } from "@store/repo/user";
import { memo, useEffect, lazy, Suspense, useCallback } from "react";
import FriendListLoading from "./components/ui/FriendListLoading";
import FriendListTitle from "./components/container/FriendListTitle";
import { FriendListContainer } from "./styles/FriendList.decorate";
import useAppSelector from "@hooks/useAppSelector";
import CornerLoading from "../../components/CornerLoading";
import useSocket from "@hooks/useSocket";
import { Event } from "@common/socket.define";
import { addFriend } from "@store/slices/users";
import { removeFriendRequest } from "@store/slices/friendRequest";
const FriendList = lazy(() => import("./components/container/FriendList"));

const FriendListLayout = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const currentTab = useAppSelector((state) => state.ui.tabFriendSelect);

  const status = useAppSelector((state) => {
    return state.user.process;
  });

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
    <FriendListContainer>
      <FriendListTitle />
      <Suspense fallback={<FriendListLoading />}>
        <FriendList />
      </Suspense>
      <CornerLoading status={status} />
    </FriendListContainer>
  );
};

export default memo(FriendListLayout);

import { memo, useCallback, useEffect } from "react";
import { FriendListContainer } from "./styles/FriendList.decorate";
import OnlineList from "./components/containers/OnlineList";
import OfflineList from "./components/containers/OfflineList";
import useSocket from "@hooks/useSocket";
import { Event } from "@common/socket.define";
import useAppSelector from "@hooks/useAppSelector";
import { selectFriendIds, updateOnline } from "@store/slices/users";
import useAppDispatch from "@hooks/useAppDispatch";

const FriendList = () => {
  const ids = useAppSelector(selectFriendIds);
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const hookFriendOnline = useCallback(() => {
    socket.emit(Event.EVENT_FRIEND_LIST_STATUS, ids, (payload?: string[]) => {
      console.log({ payload });
      if (!payload) return;
      dispatch(updateOnline(payload));
    });
  }, [ids, socket, dispatch]);

  useEffect(() => {
    hookFriendOnline();
    const _id = setInterval(hookFriendOnline, 2000);
    return () => {
      clearInterval(_id);
    };
  }, [hookFriendOnline]);

  return (
    <FriendListContainer>
      <OnlineList />
      <OfflineList />
    </FriendListContainer>
  );
};

export default memo(FriendList);

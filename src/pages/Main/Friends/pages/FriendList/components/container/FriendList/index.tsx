import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { fetchListFriends } from "@store/repo/user";
import { updateFriendProfile } from "@store/slices/users";
import { memo, lazy, Suspense, useEffect, useCallback } from "react";
import FriendListTitle from "./components/containers/FriendListTitle";
import FriendListLoading from "./components/ui/FriendListLoading";
const FriendListBody = lazy(
  () => import("./components/containers/FriendListBody")
);

interface UpdateProfileProps {
  id: string;
  changes: Partial<UserProfile>;
}

const FriendList = () => {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const _handleUpdateProfile = useCallback(
    (payload: UpdateProfileProps) => {
      dispatch(
        updateFriendProfile({
          id: payload.id,
          changes: payload,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    socket.on(
      Event.EVENT_FRIEND_UPLOAD_IMAGE,
      (payload: { id: string; avatar: string }) => {
        _handleUpdateProfile({
          id: payload.id,
          changes: { avatar: payload.avatar },
        });
      }
    );
    socket.on(Event.EVENT_FRIEND_CHANGE_STATUS, (payload: UserProfile) => {
      _handleUpdateProfile({
        id: payload.getId(),
        changes: payload,
      });
    });
    socket.on(Event.EVENT_FRIEND_UPDATE_INFO, (payload: UserProfile) => {
      _handleUpdateProfile({
        id: payload.getId(),
        changes: payload,
      });
    });
    return () => {
      socket.off(Event.EVENT_FRIEND_UPLOAD_IMAGE);
      socket.off(Event.EVENT_FRIEND_CHANGE_STATUS);
      socket.off(Event.EVENT_FRIEND_UPDATE_INFO);
    };
  }, [socket, _handleUpdateProfile]);

  useEffect(() => {
    const promise = dispatch(fetchListFriends());
    return () => {
      promise.abort();
    };
  }, [dispatch]);
  return (
    <>
      <FriendListTitle />
      <Suspense fallback={<FriendListLoading />}>
        <FriendListBody />
      </Suspense>
    </>
  );
};
export default memo(FriendList);

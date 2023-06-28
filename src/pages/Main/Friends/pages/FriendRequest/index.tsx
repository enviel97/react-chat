import useAppDispatch from "@hooks/useAppDispatch";
import { fetchListFriendRequest } from "@store/repo/user";
import { lazy, memo, useEffect, Suspense } from "react";
import CornerLoading from "../../components/CornerLoading";
import FriendRequestTitle from "./components/container/FriendRequestTitle";
import useFriendRequestSocket from "./hooks/useFriendRequestSocket";
import { FriendRequestContainer } from "./styles/FriendRequest.decorate";
const List = lazy(() => import("./components/container/FriendRequestList"));

const FriendRequest = () => {
  const dispatch = useAppDispatch();
  useFriendRequestSocket();
  useEffect(() => {
    const promise = dispatch(fetchListFriendRequest());
    return promise.abort;
  }, [dispatch]);

  return (
    <FriendRequestContainer>
      <FriendRequestTitle />
      <Suspense fallback={<>Loading...</>}>
        <List />
      </Suspense>
      <CornerLoading />
    </FriendRequestContainer>
  );
};

export default memo(FriendRequest);

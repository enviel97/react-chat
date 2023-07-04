import useAppDispatch from "@hooks/useAppDispatch";
import { useFriendListSocket } from "@pages/Main/hooks/socket";
import { fetchListFriends } from "@store/repo/user";
import { memo, lazy, Suspense, useEffect, Fragment } from "react";
import FriendListTitle from "./components/containers/FriendListTitle";
import FriendListLoading from "./components/ui/FriendListLoading";
const Body = lazy(() => import("./components/containers/FriendListBody"));

const FriendList = () => {
  const dispatch = useAppDispatch();
  useFriendListSocket();
  useEffect(() => {
    const promise = dispatch(fetchListFriends());
    return promise.abort;
  }, [dispatch]);

  return (
    <Fragment>
      <FriendListTitle />
      <Suspense fallback={<FriendListLoading />}>
        <Body />
      </Suspense>
    </Fragment>
  );
};
export default memo(FriendList);

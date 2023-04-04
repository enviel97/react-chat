import useAppDispatch from "@hooks/useAppDispatch";
import { fetchListFriends } from "@store/repo/user";
import { memo, lazy, Suspense, useEffect } from "react";
import FriendListTitle from "./components/containers/FriendListTitle";
import FriendListLoading from "./components/ui/FriendListLoading";
const FriendListBody = lazy(
  () => import("./components/containers/FriendListBody")
);

const FriendList = () => {
  const dispatch = useAppDispatch();
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

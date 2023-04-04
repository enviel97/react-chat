import useAppDispatch from "@hooks/useAppDispatch";
import { fetchFriendPending } from "@store/repo/user";
import { Fragment, lazy, memo, Suspense, useEffect } from "react";
import FriendPendingListLoading from "./components/ui/FriendPendingListLoading";
import FriendPendingTitle from "./components/ui/FriendPendingTitle";
const FriendPendingBody = lazy(
  () => import("./components/container/FriendPendingBody")
);

const FiendPending = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(fetchFriendPending());
    return () => {
      promise.abort();
    };
  }, [dispatch]);
  return (
    <Fragment>
      <FriendPendingTitle />
      <Suspense fallback={<FriendPendingListLoading />}>
        <FriendPendingBody />
      </Suspense>
    </Fragment>
  );
};

export default memo(FiendPending);

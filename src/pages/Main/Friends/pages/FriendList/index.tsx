import useAppDispatch from "@hooks/useAppDispatch";
import { fetchListFriends } from "@store/repo/user";
import { memo, useEffect, lazy, Suspense } from "react";
import FriendListLoading from "./components/ui/FriendListLoading";
import FriendListTitle from "./components/container/FriendListTitle";
import { FriendListContainer } from "./styles/FriendList.decorate";
import useAppSelector from "@hooks/useAppSelector";
import CornerLoading from "../../components/CornerLoading";
const FriendList = lazy(() => import("./components/container/FriendList"));

const FriendListLayout = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => {
    return state.user.process;
  });
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

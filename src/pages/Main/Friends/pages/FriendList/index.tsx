import useAppDispatch from "@hooks/useAppDispatch";
import { fetchListFriends } from "@store/repo/user";
import { lazy, memo, useEffect, Suspense } from "react";
import FriendListLoading from "./components/ui/FriendListLoading";
import FriendListTitle from "./components/container/FriendListTitle";
import { FriendListContainer } from "./styles/FriendList.decorate";
const FriendList = lazy(() => import("./components/container/FriendList"));

const FriendListLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchListFriends());
  }, []);

  return (
    <FriendListContainer>
      <FriendListTitle />
      <Suspense fallback={<FriendListLoading />}>
        <FriendList />
      </Suspense>
    </FriendListContainer>
  );
};

export default memo(FriendListLayout);

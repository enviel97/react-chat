import { memo, lazy, Suspense } from "react";
import FriendListTitle from "./components/containers/FriendListTitle";
import FriendListLoading from "./components/ui/FriendListLoading";
import { FriendListContainer } from "./styles/FriendList.decorate";
const FriendListBody = lazy(
  () => import("./components/containers/FriendListBody")
);

const FriendList = () => {
  return (
    <FriendListContainer>
      <FriendListTitle />
      <Suspense fallback={<FriendListLoading />}>
        <FriendListBody />
      </Suspense>
    </FriendListContainer>
  );
};
export default memo(FriendList);

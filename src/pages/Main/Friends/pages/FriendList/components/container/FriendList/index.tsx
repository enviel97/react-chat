import { memo, lazy, Suspense } from "react";
import FriendListTitle from "./components/containers/FriendListTitle";
import FriendListLoading from "./components/ui/FriendListLoading";
const FriendListBody = lazy(
  () => import("./components/containers/FriendListBody")
);

const FriendList = () => {
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

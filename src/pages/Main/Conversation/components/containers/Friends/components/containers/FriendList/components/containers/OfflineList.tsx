import useAppSelector from "@hooks/useAppSelector";
import { selectOffline } from "@store/slices/users";
import { Fragment, lazy, memo, Suspense } from "react";
import FriendListHeader from "../ui/FriendListHeader";
import FriendListItemLoading from "../ui/FriendListItemLoading";
const FriendListItem = lazy(() => import("../ui/FriendListItem"));

const OfflineList = () => {
  const ids = useAppSelector(selectOffline);
  return (
    <Fragment>
      <FriendListHeader title='Offline' quantity={ids.length} />
      {ids.map((id, index) => {
        return (
          <Suspense key={`${id}$${index}`} fallback={<FriendListItemLoading />}>
            <FriendListItem friendId={id.toString()} />
          </Suspense>
        );
      })}
    </Fragment>
  );
};

export default memo(OfflineList);

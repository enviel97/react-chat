import useAppSelector from "@hooks/useAppSelector";
import { selectOnline } from "@store/slices/users";
import { FC, Fragment, lazy, Suspense } from "react";
import FriendListHeader from "../ui/FriendListHeader";
import FriendListItemLoading from "../ui/FriendListItemLoading";
const FriendListItem = lazy(() => import("../ui/FriendListItem"));

interface Props {}
const OnlineList: FC<Props> = () => {
  const ids = useAppSelector(selectOnline);
  return (
    <Fragment>
      <FriendListHeader title='Online' quantity={ids.length} />
      {ids.map((id, index) => {
        return (
          <Suspense key={`${id}$${index}`} fallback={<FriendListItemLoading />}>
            <FriendListItem friendId={id} isOnline />
          </Suspense>
        );
      })}
    </Fragment>
  );
};

export default OnlineList;

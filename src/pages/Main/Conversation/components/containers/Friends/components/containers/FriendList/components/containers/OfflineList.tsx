import useUserProvider from "@pages/Main/Conversation/components/containers/Friends/hook/useUserProvider";
import { FC, Fragment, lazy, Suspense, useMemo } from "react";
import FriendListHeader from "../ui/FriendListHeader";
import FriendListItemLoading from "../ui/FriendListItemLoading";
const FriendListItem = lazy(() => import("../ui/FriendListItem"));

interface Props {}

const OfflineList: FC<Props> = () => {
  const { selectOfflineIds } = useUserProvider();
  const ids = useMemo(selectOfflineIds, [selectOfflineIds]);

  return (
    <Fragment>
      <FriendListHeader title='Offline' quantity={ids.length} />
      {ids.map((id, index) => {
        return (
          <Suspense key={`${id}$${index}`} fallback={<FriendListItemLoading />}>
            <FriendListItem friendId={id} />
          </Suspense>
        );
      })}
    </Fragment>
  );
};

export default OfflineList;

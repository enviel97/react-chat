import { FC, Fragment, lazy, Suspense, useMemo } from "react";
import useUserProvider from "@pages/Main/Conversation/components/containers/Friends/hook/useUserProvider";
import FriendListHeader from "../ui/FriendListHeader";
import FriendListItem from "../ui/FriendListItem";
const FriendListItemLoading = lazy(() => import("../ui/FriendListItemLoading"));

interface Props {}
const OnlineList: FC<Props> = () => {
  const { selectOnlineIds } = useUserProvider();
  const ids = useMemo(selectOnlineIds, [selectOnlineIds]);
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

import useAppSelector from "@hooks/useAppSelector";
import { FriendPageNotificationEmpty } from "@pages/Main/Friends/styles/FriendPage.decorate";
import { EntityId } from "@reduxjs/toolkit";
import { selectFriendRequestIds } from "@store/slices/friendRequest";
import { isRefresh, isSuccess } from "@utils/validate";
import { useEffect } from "react";
import { useState } from "react";
import { Suspense } from "react";
import { lazy, memo, useMemo } from "react";
import { FriendRequestItemsContainer } from "../../styles/FriendRequest.decorate";
import FriendRequestCardLoading from "../ui/FriendRequestCardLoading";
import FriendRequestLoading from "../ui/FriendRequestLoading";

const FriendRequestCard = lazy(() => import("../ui/FriendRequestCard"));

const FriendRequestList = () => {
  const ids = useAppSelector(selectFriendRequestIds);
  const [data, setData] = useState<EntityId[]>();
  const status = useAppSelector((state) => state["friend-request"].process);
  useEffect(() => {
    if (ids.length !== 0 && (isRefresh(status) || isSuccess(status))) {
      setData(ids);
    }
  }, [ids, status]);

  const FriendRequests = useMemo(() => {
    if (data === undefined) return <FriendRequestLoading />;
    if (data.length === 0) {
      return (
        <FriendPageNotificationEmpty>
          You don't have any friend request...
        </FriendPageNotificationEmpty>
      );
    }
    return data.map((value, index) => {
      return (
        <Suspense
          key={`${value}$${index}`}
          fallback={<FriendRequestCardLoading />}
        >
          <FriendRequestCard friendId={value.toString()} />
        </Suspense>
      );
    });
  }, [data]);

  return (
    <FriendRequestItemsContainer>
      <Suspense fallback={<FriendRequestLoading />}>{FriendRequests}</Suspense>
    </FriendRequestItemsContainer>
  );
};

export default memo(FriendRequestList);

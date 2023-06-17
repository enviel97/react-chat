import useAppSelector from "@hooks/useAppSelector";
import { FriendPageNotificationEmpty } from "@pages/Main/Friends/styles/FriendPage.decorate";
import { selectFriendRequestIds } from "@store/slices/friendRequest";
import { Suspense } from "react";
import { lazy, memo, useMemo } from "react";
import {
  FriendRequestItemContainer,
  FriendRequestItemsContainer,
  FriendRequestItemsScroll,
} from "../../styles/FriendRequest.decorate";
import FriendRequestCardLoading from "../ui/FriendRequestCardLoading";
import FriendRequestLoading from "../ui/FriendRequestLoading";
import { isSuccess } from "@utils/validate";

const Card = lazy(() => import("../ui/FriendRequestCard"));

const FriendRequestList = () => {
  const data = useAppSelector(selectFriendRequestIds);
  const status = useAppSelector((state) => state["friend-request"].process);
  const FriendRequests = useMemo(() => {
    if (data.length === 0 && isSuccess(status)) {
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
          <FriendRequestItemContainer>
            <Card friendId={value.toString()} />
          </FriendRequestItemContainer>
        </Suspense>
      );
    });
  }, [data, status]);

  return (
    <FriendRequestItemsScroll>
      <FriendRequestItemsContainer>
        <Suspense fallback={<FriendRequestLoading />}>
          {FriendRequests}
        </Suspense>
      </FriendRequestItemsContainer>
    </FriendRequestItemsScroll>
  );
};

export default memo(FriendRequestList);

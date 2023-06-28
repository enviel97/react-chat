import useAppSelector from "@hooks/useAppSelector";
import { selectFriendRequestIds } from "@store/slices/friendRequest";
import { lazy, memo, Suspense, useMemo } from "react";
import {
  FriendRequestItemContainer,
  FriendRequestItemsContainer,
  FriendRequestItemsScroll,
} from "../../styles/FriendRequest.decorate";
import FriendRequestSystem from "../ui/FriendRequestSystem";
import { isSuccess } from "@utils/validate";
import { AnimatePresence } from "framer-motion";
import { Animate } from "../../styles/FriendRequest.animate";
import FriendRequestCardLoading from "../ui/FriendRequestCardLoading";
const Card = lazy(() => import("../ui/FriendRequestCard"));

const FRIEND_REQUEST_EMPTY = "You don't have any friend request...";

const FriendRequestList = () => {
  const data = useAppSelector(selectFriendRequestIds);
  const status = useAppSelector((state) => state["friend-request"].process);
  const FriendRequests = useMemo(() => {
    return data.map((value, index) => {
      return (
        <FriendRequestItemContainer
          key={`${value}`}
          custom={index}
          {...Animate.card}
        >
          <Suspense fallback={<FriendRequestCardLoading />}>
            <Card friendId={value.toString()} />
          </Suspense>
        </FriendRequestItemContainer>
      );
    });
  }, [data]);

  return (
    <FriendRequestItemsScroll>
      <FriendRequestItemsContainer>
        <AnimatePresence mode='wait'>
          {data.length === 0 && isSuccess(status) && (
            <FriendRequestSystem message={FRIEND_REQUEST_EMPTY} />
          )}
        </AnimatePresence>
        <AnimatePresence mode='wait'>
          {data.length === 0 && !isSuccess(status) && <FriendRequestSystem />}
        </AnimatePresence>
        <AnimatePresence mode='popLayout'>{FriendRequests}</AnimatePresence>
      </FriendRequestItemsContainer>
    </FriendRequestItemsScroll>
  );
};

export default memo(FriendRequestList);

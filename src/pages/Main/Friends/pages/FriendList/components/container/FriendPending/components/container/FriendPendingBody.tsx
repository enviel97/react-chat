import useAppSelector from "@hooks/useAppSelector";
import { selectFriendPendingIds } from "@store/slices/friendPending";
import { isSuccess } from "@utils/validate";
import { lazy, Suspense, useMemo } from "react";
import { FriendPendingBodyContainer } from "../../styles/FriendPending.decorate";
import FriendPendingEmpty from "../ui/FriendPendingEmpty";
import FriendItemPendingLoading from "./FriendPendingItem/components/FriendPendingItemLoading";
const FriendPendingItem = lazy(() => import("./FriendPendingItem"));

const FriendPendingBody = () => {
  const data = useAppSelector(selectFriendPendingIds);
  const status = useAppSelector((state) => state["friend-pending"].process);
  const Friends = useMemo(() => {
    if (!data) return <>Loading...</>;
    if (data.length === 0 && isSuccess(status)) {
      return <FriendPendingEmpty />;
    }
    return data.map((value, index) => {
      const id = value.toString();
      return (
        <Suspense
          key={`${value}$${index}`}
          fallback={<FriendItemPendingLoading />}
        >
          <FriendPendingItem friendId={id} />
        </Suspense>
      );
    });
  }, [data, status]);

  return <FriendPendingBodyContainer>{Friends}</FriendPendingBodyContainer>;
};

export default FriendPendingBody;

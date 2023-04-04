import { memo } from "react";
import { FriendPendingBodyContainer } from "../../styles/FriendPending.decorate";
import FriendItemPendingLoading from "../container/FriendPendingItem/components/FriendPendingItemLoading";

const FriendPendingListLoading = () => {
  return (
    <FriendPendingBodyContainer>
      {Array.from({ length: 10 }, (_, index) => (
        <FriendItemPendingLoading key={index} />
      ))}
    </FriendPendingBodyContainer>
  );
};

export default memo(FriendPendingListLoading);

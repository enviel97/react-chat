import { memo } from "react";
import { FriendPendingBodyContainer } from "../../styles/FriendPending.decorate";
const FriendPendingEmpty = () => {
  return (
    <FriendPendingBodyContainer>
      <span>You don't have any request</span>
    </FriendPendingBodyContainer>
  );
};

export default memo(FriendPendingEmpty);

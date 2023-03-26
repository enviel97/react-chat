import { FriendPageTitle } from "@pages/Main/Friends/styles/FriendPage.decorate";

import { memo, useState, useTransition } from "react";

const FriendRequestTitle = () => {
  const [quantity, setQuantity] = useState<number>();
  const [isPending, startTransition] = useTransition();

  return (
    <FriendPageTitle>
      <span>Friend Request</span>{" "}
      {Number.isSafeInteger(quantity) && (
        <strong>{isPending ? "" : `|${quantity}|`}</strong>
      )}
    </FriendPageTitle>
  );
};

export default memo(FriendRequestTitle);

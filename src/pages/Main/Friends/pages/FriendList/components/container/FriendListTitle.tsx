import { memo, useState, useTransition } from "react";
import { FriendListAddMoreButton } from "../../styles/FriendList.decorate";
import { FriendPageTitle } from "@pages/Main/Friends/styles/FriendPage.decorate";
import { BiPlusMedical } from "react-icons/bi";

const FriendListTitle = () => {
  const [quantity, setQuantity] = useState<number>();
  const [isPending, startTransition] = useTransition();

  return (
    <FriendPageTitle>
      <span>Friend List</span>

      <FriendListAddMoreButton>
        {Number.isSafeInteger(quantity) && (
          <label>{isPending ? "" : `${quantity}`}</label>
        )}
        <BiPlusMedical />
      </FriendListAddMoreButton>
    </FriendPageTitle>
  );
};

export default memo(FriendListTitle);

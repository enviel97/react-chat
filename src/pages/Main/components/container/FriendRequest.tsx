import useAppSelector from "@hooks/useAppSelector";
import { selectTotalFriendRequest } from "@store/slices/ui";
import { memo } from "react";
import { ActionContainer } from "../styles/Sidebar.decorate";
import ActionButton from "../ui/ActionButton";
import BadgeQuantity from "../ui/BadgeQuantity";

const FriendsChatButton = () => {
  const quantity = useAppSelector(selectTotalFriendRequest);
  return (
    <ActionContainer>
      <ActionButton icon={"Profiles"} to={"/friends"} />
      <BadgeQuantity quantity={quantity} />
    </ActionContainer>
  );
};

export default memo(FriendsChatButton);

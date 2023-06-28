import { FC, memo } from "react";
import { Animate } from "../../styles/FriendRequest.animate";
import { FriendRequestItemsContainer } from "../../styles/FriendRequest.decorate";

interface FriendRequestSystemProps {
  message?: string;
}

const FriendRequestSystem: FC<FriendRequestSystemProps> = ({ message }) => {
  return (
    <FriendRequestItemsContainer {...Animate.system}>
      {message ?? "Loading List..."}
    </FriendRequestItemsContainer>
  );
};

export default memo(FriendRequestSystem);

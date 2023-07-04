import { useFriendListSocket } from "@pages/Main/hooks/socket";
import { memo, Fragment } from "react";
import FriendList from "./components/container/FriendList";
import FiendPending from "./components/container/FriendPending";
import AddFriendButton from "./components/ui/AddFriendButton";
import {
  FriendListContainer,
  FriendPendingContainer,
} from "./styles/FriendListTab.decorate";

const FriendListLayout = () => {
  useFriendListSocket();

  return (
    <Fragment>
      <AddFriendButton />
      <FriendPendingContainer>
        <FiendPending />
      </FriendPendingContainer>
      <FriendListContainer>
        <FriendList />
      </FriendListContainer>
    </Fragment>
  );
};

export default memo(FriendListLayout);

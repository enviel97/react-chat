import { memo } from "react";
import { FriendListContainer } from "./styles/FriendList.decorate";
import OnlineList from "./components/containers/OnlineList";
import OfflineList from "./components/containers/OfflineList";

const FriendList = () => {
  return (
    <FriendListContainer>
      <OnlineList />
      <OfflineList />
    </FriendListContainer>
  );
};

export default memo(FriendList);

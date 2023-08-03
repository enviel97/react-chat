import { useFriendListSocket } from "@pages/Main/hooks/socket";
import { memo } from "react";
import FriendList from "./components/containers/FriendList";
import Header from "./components/containers/Header";
import Participants from "./components/containers/Participants";
import {
  RelationShipContainer,
  UserProfileListContainer,
} from "./styles/Friends.decorate";

const Friends = () => {
  useFriendListSocket();
  return (
    <RelationShipContainer>
      <Header />
      <UserProfileListContainer>
        <Participants />
        <FriendList />
      </UserProfileListContainer>
    </RelationShipContainer>
  );
};
export default memo(Friends);

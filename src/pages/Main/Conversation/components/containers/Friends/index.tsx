import { memo } from "react";
import FriendList from "./components/containers/FriendList";
import Header from "./components/containers/Header";
import Participants from "./components/containers/Participants";
import UserProvider from "./context/UserProvider";
import {
  RelationShipContainer,
  UserProfileListContainer,
} from "./styles/Friends.decorate";

const Friends = () => (
  <RelationShipContainer>
    <Header />
    <UserProfileListContainer>
      <Participants />
      <UserProvider>
        <FriendList />
      </UserProvider>
    </UserProfileListContainer>
  </RelationShipContainer>
);
export default memo(Friends);

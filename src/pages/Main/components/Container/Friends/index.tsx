import { memo } from "react";
import Header from "./components/containers/Header";
import Participants from "./components/containers/Participants";
import ListFriend from "./components/ui/ListFriend";
import { FriendContainer } from "./styles/Friends.decorate";

const Friends = () => {
  return (
    <FriendContainer>
      <Header />
      <Participants />
      <ListFriend groupTitle='Online' />
      <ListFriend groupTitle='Un-active' />
    </FriendContainer>
  );
};
export default memo(Friends);

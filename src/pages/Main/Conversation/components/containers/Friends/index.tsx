import { memo } from "react";
import Header from "./components/containers/Header";
import Participants from "./components/containers/Participants";
import { FriendContainer } from "./styles/Friends.decorate";

const Friends = () => (
  <FriendContainer>
    <Header />
    <Participants />
  </FriendContainer>
);
export default memo(Friends);

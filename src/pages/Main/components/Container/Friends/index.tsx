import { lazy, memo, Suspense } from "react";
import Header from "./components/containers/Header";
import ListFriend from "./components/ui/ListFriend";
import { FriendContainer } from "./styles/Friends.decorate";
const Participants = lazy(() => import("./components/containers/Participants"));

const Friends = () => (
  <FriendContainer>
    <Header />
    <Suspense fallback={"Loading participant"}>
      <Participants />
    </Suspense>
    <ListFriend groupTitle='Online' />
    <ListFriend groupTitle='Un-active' />
  </FriendContainer>
);
export default memo(Friends);

import useAppDispatch from "@hooks/useAppDispatch";
import { fetchListFriends } from "@store/repo/user";
import { memo, useEffect } from "react";
import FriendList from "./components/containers/FriendList";
import Header from "./components/containers/Header";
import Participants from "./components/containers/Participants";
import {
  RelationShipContainer,
  UserProfileListContainer,
} from "./styles/Friends.decorate";

const Friends = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(fetchListFriends());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

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

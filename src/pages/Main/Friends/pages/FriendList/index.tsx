import { memo, useState } from "react";
import FriendListTitle from "./components/container/FriendListTitle";
import ListFriendEmpty from "./components/container/ListFriendEmpty";
import {
  FriendListContainer,
  FriendListItemsContainer,
} from "./styles/FriendList.decorate";

const FriendList = () => {
  const [data, setData] = useState<string[]>([]);

  return (
    <FriendListContainer>
      <FriendListTitle />
      <FriendListItemsContainer>
        {data.length === 0 && <ListFriendEmpty />}
        {data.length !== 0 &&
          data.map((value, index) => {
            return <div key={`${value}$${index}`}>Checking</div>;
          })}
      </FriendListItemsContainer>
    </FriendListContainer>
  );
};

export default memo(FriendList);

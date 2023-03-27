import axios from "axios";
import { lazy, memo, Suspense, useEffect, useState } from "react";
import FriendListTitle from "./components/container/FriendListTitle";
import ListFriendEmpty from "./components/container/ListFriendEmpty";
import FriendListItemLoading from "./components/ui/FriendListItemLoading";
import {
  FriendListContainer,
  FriendListItemsContainer,
} from "./styles/FriendList.decorate";
const FriendListItem = lazy(() => import("./components/ui/FriendListItem"));

const FriendList = () => {
  const [data, setData] = useState<string[]>();

  return (
    <FriendListContainer>
      <FriendListTitle />
      <FriendListItemsContainer>
        {data === undefined ? (
          "Loading..."
        ) : data.length === 0 ? (
          <ListFriendEmpty />
        ) : (
          data.map((value, index) => {
            return (
              <Suspense
                key={`${value}$${index}`}
                fallback={<FriendListItemLoading />}
              >
                <FriendListItem friendId={value} isLoading={false} />
              </Suspense>
            );
          })
        )}
      </FriendListItemsContainer>
    </FriendListContainer>
  );
};

export default memo(FriendList);

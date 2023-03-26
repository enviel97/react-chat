import { memo, useState } from "react";
import { FriendPageNotificationEmpty } from "../../styles/FriendPage.decorate";
import FriendRequestCard from "./components/container/FriendRequestCard";
import FriendRequestTitle from "./components/container/FriendRequestTitle";
import {
  FriendRequestContainer,
  FriendRequestItemsContainer,
} from "./styles/FriendRequest.decorate";

const FriendRequest = () => {
  const [data, setData] = useState<string[]>([]);
  return (
    <FriendRequestContainer>
      <FriendRequestTitle />
      <FriendRequestItemsContainer>
        {data.length === 0 && (
          <FriendPageNotificationEmpty>
            You don't have any friend request...
          </FriendPageNotificationEmpty>
        )}
        {data.length !== 0 &&
          data.map((value, index) => {
            return (
              <FriendRequestCard key={`${value}$${index}`} friendId={value} />
            );
          })}
      </FriendRequestItemsContainer>
    </FriendRequestContainer>
  );
};

export default memo(FriendRequest);

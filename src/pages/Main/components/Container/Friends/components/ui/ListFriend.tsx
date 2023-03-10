import Divider from "@components/Divider";
import useAuthenticate from "@hooks/useAuthenticate";
import useBreakpoint from "@hooks/useBreakpoint";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import string from "@utils/string";
import { FC, memo, useEffect, useState } from "react";
import {
  ListFriendContainer,
  ListFriendHeaderTitle,
  ListFriendItemContainer,
} from "../../styles/Friends.decorate";

const FriendItem: FC<FriendItemProps> = ({ user }) => {
  const { isUser } = useAuthenticate();
  const breakpoint = useBreakpoint();

  const [isOnline, setOnline] = useState(isUser(user));

  useEffect(() => {}, [user]);

  return (
    <ListFriendItemContainer>
      <CircleAvatar className='status' online={isOnline} />
      {breakpoint.up("laptop") && <span>{string.getFullName(user)}</span>}
    </ListFriendItemContainer>
  );
};

const ListFriend: FC<ListFriendProps> = ({ groupTitle, data = [] }) => {
  return (
    <ListFriendContainer>
      <ListFriendHeaderTitle>
        <span>{groupTitle}</span>
        <span>{`(${data.length})`}</span>
      </ListFriendHeaderTitle>
      <Divider />
      {data.length !== 0 &&
        data.map((user) => {
          return <FriendItem key={string.getId(user)} user={user} />;
        })}
    </ListFriendContainer>
  );
};

export default memo(ListFriend);

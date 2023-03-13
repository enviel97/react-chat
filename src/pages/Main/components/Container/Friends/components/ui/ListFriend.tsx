import { Event } from "@common/socket.define";
import Divider from "@components/Divider";
import useAuthenticate from "@hooks/useAuthenticate";
import useBreakpoint from "@hooks/useBreakpoint";
import useSocket from "@hooks/useSocket";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import string from "@utils/string";
import { FC, memo, useEffect, useMemo, useState } from "react";
import {
  ListFriendContainer,
  ListFriendHeaderTitle,
  ListFriendItemContainer,
  ListItemHint,
} from "../../styles/Friends.decorate";

const FriendItem: FC<FriendItemProps> = ({ user }) => {
  const { isUser } = useAuthenticate();
  const breakpoint = useBreakpoint();
  const socket = useSocket();

  const [isOnline, setOnline] = useState(isUser(user));
  const id = useMemo(() => string.getId(user), [user]);

  useEffect(() => {
    socket.on(Event.EVENT_CONNECTED_ROOM, (payload: any) => {
      if (payload.id === string.getId(user)) {
        setOnline(true);
      }
    });

    return () => {
      socket.off(Event.EVENT_CONNECTED_ROOM, (payload: any) => {
        if (payload.id === string.getId(user)) {
          setOnline(false);
        }
      });
    };
  }, [user]);

  return (
    <>
      <ListFriendItemContainer id={id}>
        <CircleAvatar className='status' online={isOnline} />
        {breakpoint.up("laptop") && <span>{string.getFullName(user)}</span>}
      </ListFriendItemContainer>
      {breakpoint.down("laptop") && (
        <ListItemHint
          id='tooltip'
          anchorId={id}
          content={`${user.lastName} (${user.email})`}
          place={"right"}
          delayShow={100}
        />
      )}
    </>
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

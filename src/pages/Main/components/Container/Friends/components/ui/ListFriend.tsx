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
  ListFriendItemBody,
  ListFriendItemContainer,
  ListItemHint,
} from "../../styles/Friends.decorate";
import { ActionMenu } from "@components/Select";
import { MdKey } from "react-icons/md";
import { Box } from "@utils/styles";

const FriendItem: FC<FriendItemProps> = ({ user, role }) => {
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
      <ListFriendItemContainer id={id} isUser={isUser(user)}>
        <ListFriendItemBody>
          <CircleAvatar className='status' online={isOnline} />
          {breakpoint.up("laptop") && (
            <span>{string.getFullName(user, { short: true })}</span>
          )}
        </ListFriendItemBody>
        {role === "Admin" && <MdKey id='role' />}
      </ListFriendItemContainer>
      {breakpoint.down("laptop") && (
        <ListItemHint
          id='tooltip'
          anchorId={id}
          content={`${string.getFullName(user, { short: true })} (${
            user.email
          })`}
          place={"right"}
          delayShow={100}
        />
      )}
      {role === "Admin" && (
        <ListItemHint
          id='tooltip'
          anchorId={"role"}
          content={`Admin`}
          place={"top"}
          delayShow={100}
        />
      )}
    </>
  );
};

const ListFriend: FC<ListFriendProps> = ({
  groupTitle,
  data = [],
  role,
  options,
}) => {
  return (
    <ListFriendContainer>
      <ListFriendHeaderTitle>
        <span>{groupTitle}</span>
        <span>{`(${data.length})`}</span>
      </ListFriendHeaderTitle>
      <Divider />
      {data.length !== 0 &&
        data.map((user) => (
          <Box display='flex' key={string.getId(user)} flexDirection='row'>
            {options && (
              <ActionMenu
                isVerticalIcon
                options={options.map((option) => ({
                  ...option,
                  onClick: () => option.onClick(user),
                }))}
              />
            )}
            <FriendItem user={user} role={role && role[string.getId(user)]} />
          </Box>
        ))}
    </ListFriendContainer>
  );
};

export default memo(ListFriend);

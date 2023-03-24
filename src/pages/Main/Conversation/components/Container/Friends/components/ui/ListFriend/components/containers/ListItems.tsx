import { Event } from "@common/socket.define";
import useBreakpoint from "@hooks/useBreakpoint";
import useSocket from "@hooks/useSocket";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import string from "@utils/string";
import { FC, memo, useEffect, useMemo, useState, useTransition } from "react";
import { useParams } from "react-router-dom";
import {
  Items,
  ListFriendItemBody,
  ListFriendItemContainer,
  ListItemHint,
} from "../../styles/ListFriend.decorate";
import BannedButton from "../ui/BannedButton";
import RoleIcon from "../ui/RoleIcon";

const FriendItem: FC<FriendItemProps> = ({
  user,
  role,
  canBanned = false,
  currentStatus = false,
}) => {
  const { id = "" } = useParams();
  const socket = useSocket();
  const breakpoint = useBreakpoint();

  const [isOnline, setOnline] = useState<boolean>(currentStatus);
  const [isPending, startTransition] = useTransition();

  const userId = useMemo(() => string.getId(user), [user]);

  useEffect(() => {
    socket.emit(
      Event.EVENT_PARTICIPANT_STATUS_RESPONSE,
      { userId, conversationId: id },
      (response: StatusActions) => {
        startTransition(() => setOnline(response === "online"));
      }
    );
    socket.on(
      Event.EVENT_NOTIFICATION_CHANGE_STATUS,
      (payload: StatusUserPayload) => {
        if (userId === payload.id) {
          startTransition(() => setOnline(payload.action === "online"));
        }
      }
    );
    return () => {
      socket.off(Event.EVENT_NOTIFICATION_CHANGE_STATUS);
    };
  }, [socket, userId, id]);

  return (
    <Items>
      <ListFriendItemContainer id={userId}>
        <ListFriendItemBody>
          <CircleAvatar className='status' online={isPending || isOnline} />
          {breakpoint.up("laptop") && (
            <span>{string.getFullName(user, { short: true })}</span>
          )}
        </ListFriendItemBody>
      </ListFriendItemContainer>
      {breakpoint.down("laptop") && (
        <ListItemHint
          id='tooltip'
          anchorId={userId}
          content={`${string.getFullName(user, { short: true })} (${
            user.email
          })`}
          place={"right"}
          delayShow={100}
        />
      )}
      <RoleIcon role={role} id={string.getId(user)} />
      <BannedButton conversationId={id} user={user} canBanned={canBanned} />
    </Items>
  );
};

export default memo(FriendItem);

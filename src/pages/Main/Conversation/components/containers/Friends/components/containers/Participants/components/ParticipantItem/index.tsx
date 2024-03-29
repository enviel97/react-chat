import { Event } from "@common/socket.define";
import useBreakpoint from "@hooks/useBreakpoint";
import useSocket from "@hooks/useSocket";
import CircleAvatar from "@pages/Main/components/ui/CircleAvatar";
import string from "@utils/string";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import BannedButton from "./components/ui/BannedButton";
import RoleIcon from "./components/ui/RoleIcon";

import {
  ParticipantItemBody,
  ParticipantItemContainer,
  ParticipantItemHint,
  ParticipantItemContent,
} from "./styles/ParticipantItem.decorate";

interface FriendItemProps {
  user: User;
  role?: Role;
  canBanned?: boolean;
  currentStatus?: boolean;
}
type StatusActions = "online" | "offline";

interface StatusUserPayload {
  id: string;
  message: string;
  action: StatusActions;
}

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

  const userId = useMemo(() => string.getId(user), [user]);

  useEffect(() => {
    socket.emit(
      Event.EVENT_PARTICIPANT_STATUS_RESPONSE,
      { userId, conversationId: id },
      (response: StatusActions) => {
        setOnline(response === "online");
      }
    );
    socket.on(
      Event.EVENT_NOTIFICATION_CHANGE_STATUS,
      (payload: StatusUserPayload) => {
        if (userId === payload.id) {
          setOnline(payload.action === "online");
        }
      }
    );
    return () => {
      socket.off(Event.EVENT_NOTIFICATION_CHANGE_STATUS);
    };
  }, [socket, userId, id]);

  return (
    <ParticipantItemContainer>
      <ParticipantItemContent id={userId}>
        <ParticipantItemBody>
          <span>
            <CircleAvatar
              className='status'
              online={isOnline}
              src={user.profile?.avatar}
            />
          </span>
          {breakpoint.up("laptop") && (
            <span>{string.getFullName(user, { short: true })}</span>
          )}
        </ParticipantItemBody>
      </ParticipantItemContent>
      {breakpoint.down("laptop") && (
        <ParticipantItemHint
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
    </ParticipantItemContainer>
  );
};

export default memo(FriendItem);

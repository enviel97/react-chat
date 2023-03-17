import { ButtonIcon } from "@components/Button";
import ModalConfirm from "@components/Modal/components/ModalConfirm";
import { useModals } from "@components/Modal/hooks/useModals";
import { PromiseToast } from "@components/Toast/promise";
import useAppDispatch from "@hooks/useAppDispatch";
import useAuthenticate from "@hooks/useAuthenticate";
import useBreakpoint from "@hooks/useBreakpoint";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import { fetchDeleteMember } from "@store/repo/conversation";
import string from "@utils/string";
import { FC, memo, useCallback, useMemo, useState } from "react";
import { MdKey, MdPerson } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { useParams } from "react-router-dom";
import {
  Items,
  ListFriendItemBody,
  ListFriendItemContainer,
  ListItemHint,
} from "../styles/ListFriend.decorate";

const CONFIRM_MODALS_KEY = "confirmModalKey";
const optionModal = {
  height: "fit-content",
  width: "fit-content",
  showCloseButton: false,
  isDialog: false,
  modalId: CONFIRM_MODALS_KEY,
};

const Content: FC<{ user: User }> = memo(({ user }) => (
  <span>
    User
    <strong className='highlight'>{string.getFullName(user)}</strong>
    has been banned
  </span>
));

const FriendItem: FC<FriendItemProps> = ({ user, role, canBanned }) => {
  const { id = "" } = useParams();
  const { isUser } = useAuthenticate();
  const breakpoint = useBreakpoint();
  const dispatch = useAppDispatch();

  const [isOnline] = useState(isUser(user));
  const userId = useMemo(() => string.getId(user), [user]);
  const isCurrentUser = useMemo(() => isUser(user), [user, isUser]);

  const controller = useModals();
  const onConfirmBanned = useCallback(() => {
    PromiseToast({
      action: async () =>
        await dispatch(
          fetchDeleteMember({
            idParticipant: string.getId(user),
            conversationId: id,
          })
        ).unwrap(),
    });
  }, [id, user, dispatch]);

  const onBannedClick = useCallback(() => {
    controller.show(
      <ModalConfirm
        modalKey={CONFIRM_MODALS_KEY}
        content={<Content user={user} />}
        onConfirm={onConfirmBanned}
      />,
      optionModal
    );
  }, [user, controller, onConfirmBanned]);

  return (
    <Items isUser={isCurrentUser}>
      <ListFriendItemContainer id={userId}>
        <ListFriendItemBody>
          <CircleAvatar className='status' online={isOnline} />
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
      {role === "Admin" ? (
        <MdKey id={`role-${string.getId(user)}`} size={28} />
      ) : (
        <MdPerson id={`role-${string.getId(user)}`} size={28} />
      )}
      <ListItemHint
        id='tooltip'
        anchorId={`role-${string.getId(user)}`}
        content={role}
        place={"top"}
        delayShow={100}
      />
      {canBanned && !isCurrentUser && (
        <ButtonIcon
          icon={<TiCancel />}
          size='2em'
          hintBackgroundColor='red'
          hint='banned'
          onClick={onBannedClick}
          circle
          isTransparent
        />
      )}
    </Items>
  );
};

export default memo(FriendItem);

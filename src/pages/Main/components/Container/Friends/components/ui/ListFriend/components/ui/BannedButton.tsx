import { ButtonIcon } from "@components/Button";
import ModalConfirm from "@components/Modal/components/ModalConfirm";
import { useModals } from "@components/Modal/hooks/useModals";
import { PromiseToast } from "@components/Toast/promise";
import useAppDispatch from "@hooks/useAppDispatch";
import useAuthenticate from "@hooks/useAuthenticate";
import { fetchDeleteMember } from "@store/repo/conversation";
import string from "@utils/string";
import { FC, memo, useCallback, useMemo } from "react";
import { TiCancel } from "react-icons/ti";
import styled from "styled-components";
interface BannedButtonProps {
  conversationId: string;
  user: User;
  canBanned: boolean;
}

const CONFIRM_MODALS_KEY = "confirmModalKey";

const BannedButtonWrap = styled(ButtonIcon)`
  & button:hover,
  & button:focus {
    color: red;
  }
`;

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

const BannedButton: FC<BannedButtonProps> = ({
  user,
  conversationId,
  canBanned,
}) => {
  const { isUser } = useAuthenticate();
  const isCurrentUser = useMemo(() => isUser(user), [user, isUser]);
  const dispatch = useAppDispatch();
  const controller = useModals();

  const onConfirmBanned = useCallback(() => {
    PromiseToast({
      action: async () =>
        await dispatch(
          fetchDeleteMember({
            idParticipant: string.getId(user),
            conversationId: conversationId,
          })
        ).unwrap(),
    });
  }, [conversationId, user, dispatch]);

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

  if (isCurrentUser || !canBanned) return <></>;
  return (
    <BannedButtonWrap
      icon={<TiCancel />}
      size='2em'
      hintBackgroundColor='red'
      hint='Banned'
      onClick={onBannedClick}
      circle
      isTransparent
    />
  );
};

export default memo(BannedButton);

import { ButtonIconNeumorphism } from "@components/Button";
import { useModals } from "@components/Modal/hooks/useModals";
import SkeletonContainer from "@components/Skeleton";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import CircleAvatar from "@pages/Main/components/UI/CircleAvatar";
import HeaderConversation from "@pages/Main/components/UI/HeaderConversation";
import { fetchAddMembers } from "@store/repo/conversation";
import { selectConversationById } from "@store/slices/conversations";
import string from "@utils/string";
import { FC, useCallback, useMemo } from "react";
import { TiUserAdd } from "react-icons/ti";
import { ChannelHeaderContainer } from "../../styles/Channel.decorate";
import ModalAddUser from "../ui/ModalAddUser";

const idModal = "ChannelHeaderId";

const modalOptions: ModalOptions = {
  modalId: idModal,
  isDialog: false,
  height: "fit-content",
  width: "30%",
};
interface ChannelHeaderProps {
  conversationId: string;
}

const ChannelHeader: FC<ChannelHeaderProps> = ({ conversationId }) => {
  const channel = useAppSelector((state) =>
    selectConversationById(state, conversationId)
  );

  const dispatch = useAppDispatch();
  const modal = useModals();

  const members = useMemo(() => channel?.participant.members ?? [], [channel]);

  const onConfirmAddUser = useCallback(
    (ids: string[]) => {
      modal.close(idModal);
      dispatch(
        fetchAddMembers({
          conversationId: conversationId,
          idParticipant: ids,
        })
      );
    },
    [conversationId]
  );

  const onAddUserHandler = useCallback(() => {
    modal.show(
      <ModalAddUser
        onSelectedUsers={onConfirmAddUser}
        participantIds={members.map((m) => string.getId(m))}
      />,
      modalOptions
    );
  }, [members]);

  return (
    <SkeletonContainer>
      <ChannelHeaderContainer>
        <CircleAvatar isLoading={!conversationId} />
        <HeaderConversation channel={channel} />
        {members.length > 2 && (
          <ButtonIconNeumorphism
            size='2em'
            icon={<TiUserAdd />}
            onClick={onAddUserHandler}
          />
        )}
      </ChannelHeaderContainer>
    </SkeletonContainer>
  );
};

export default ChannelHeader;

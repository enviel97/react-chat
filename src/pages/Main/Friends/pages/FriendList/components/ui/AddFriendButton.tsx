import { ButtonText } from "@components/Button";
import { useModals } from "@components/Modal/hooks/useModals";
import { memo } from "react";
import styled from "styled-components";
import ModalFriendRequest from "../modal/ModalFriendRequest";

const FriendRequestModalId = "friendRequestModalId";
const ModalOption: ModalOptions = {
  modalId: FriendRequestModalId,
  height: "80vh",
  width: "90vw",
};

const AddFriendButtonContainer = styled(ButtonText)`
  position: absolute;
  padding: 0;
  width: fit-content;
  height: fit-content;
  right: 0;
  top: 0;
  margin: 1rem;
  & button {
    padding: 0.5rem;
  }
`;

const AddFriendButton = () => {
  const modal = useModals();
  const onClickAddFriends = () => {
    modal.show(<ModalFriendRequest />, ModalOption);
  };
  return (
    <AddFriendButtonContainer
      text={"[+] Add friend"}
      onClick={onClickAddFriends}
      color='secondary'
    />
  );
};

export default memo(AddFriendButton);

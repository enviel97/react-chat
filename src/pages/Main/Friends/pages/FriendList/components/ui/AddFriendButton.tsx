import { ButtonText } from "@components/Button";
import { useModals } from "@components/Modal/hooks/useModals";
import { memo, useCallback } from "react";
import styled from "styled-components";
import ModalFriendRequest from "../modal/ModalFriendRequest";

const FriendRequestModalId = "friendRequestModalId";
const ModalOption: ModalOptions = {
  modalId: FriendRequestModalId,
  height: "fit-content",
  width: "75vw",
};

const AddFriendButtonContainer = styled(ButtonText)`
  position: absolute;
  padding: 0;
  width: fit-content;
  height: fit-content;
  right: 0;
  top: 0;
  margin: 1rem;
  & > button {
    padding: 0.5rem;
  }
`;

const AddFriendButton = () => {
  const modal = useModals();
  const onClickAddFriends = useCallback(() => {
    modal.show(<ModalFriendRequest />, ModalOption);
  }, [modal]);
  return (
    <AddFriendButtonContainer
      text={"[+] Add friend"}
      width='100px'
      onClick={onClickAddFriends}
      color='secondary'
    />
  );
};

export default memo(AddFriendButton);

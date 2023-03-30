import { memo } from "react";
import { FriendPageTitle } from "@pages/Main/Friends/styles/FriendPage.decorate";
import { BiPlusMedical } from "react-icons/bi";
import { ButtonIcon } from "@components/Button";
import { useModals } from "@components/Modal/hooks/useModals";
import ModalFriendRequest from "../modal/ModalFriendRequest";
import useAppSelector from "@hooks/useAppSelector";
import { selectUserIds } from "@store/slices/users";

const FriendRequestModalId = "friendRequestModalId";
const ModalOption: ModalOptions = {
  modalId: FriendRequestModalId,
  height: "80vh",
  width: "90vw",
};
const FriendListTitle = () => {
  const modal = useModals();
  const ids = useAppSelector(selectUserIds);
  const onClickAddFriends = () => {
    modal.show(<ModalFriendRequest />, ModalOption);
  };

  return (
    <FriendPageTitle>
      <span>
        Friend List
        {Number.isSafeInteger(ids.length) && (
          <strong>{`|${ids.length}|`}</strong>
        )}
      </span>

      <ButtonIcon
        icon={<BiPlusMedical />}
        circle
        hint='Add friends'
        hintPosition='top'
        onClick={onClickAddFriends}
      />
    </FriendPageTitle>
  );
};

export default memo(FriendListTitle);

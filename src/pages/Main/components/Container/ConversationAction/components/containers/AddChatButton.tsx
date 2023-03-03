import { useModals } from "@components/Modal/hooks/useModals";
import { fetchAddConversation } from "@store/repo/conversation";
import useAppDispatch from "@hooks/useAppDispatch";
import AddChannelModal from "../modals/AddChannelModal";
import { useNavigate } from "react-router-dom";
import string from "@utils/string";
import { PromiseToast } from "@components/Toast/promise";
import { memo, useCallback } from "react";
import ActionButton from "../ui/ActionButton";

const modalKey = "CreateConversationModal";
const modalOption = {
  modalId: modalKey,
  height: "25rem",
  width: "35rem",
  isDialog: false,
};
interface ConversationCreate {
  message: string;
  user: string;
}

const AddChatButton = () => {
  const modelController = useModals();
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  const onAction = useCallback(
    async (data: ConversationCreate) =>
      await dispatch(
        fetchAddConversation({
          emailParticipant: data.user.split(",").map((mail) => mail.trim()),
          message: data.message ?? "",
        })
      ).unwrap(),
    [dispatch]
  );

  const onSuccess = useCallback(
    (res: Response<any>) => {
      if (res.data) {
        modelController.close(modalKey);
        navigator(`messenger/${string.getId(res.data)}`);
      }
    },
    [modelController, navigator]
  );

  const _editButton = () => {
    modelController.show(
      <AddChannelModal
        onSubmitted={(data) => {
          PromiseToast({
            pending: "Create conversation",
            action: async () => await onAction(data),
            onSuccess: onSuccess,
          });
        }}
      />,
      modalOption
    );
  };

  return <ActionButton icon='Add conversation' onClick={_editButton} />;
};

export default memo(AddChatButton);

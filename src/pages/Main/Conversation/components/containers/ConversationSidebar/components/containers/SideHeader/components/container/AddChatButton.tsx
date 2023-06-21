import { useModals } from "@components/Modal/hooks/useModals";
import { fetchAddConversation } from "@store/repo/conversation";
import useAppDispatch from "@hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import string from "@utils/string";
import { PromiseToast } from "@components/Toast/promise";
import { memo, useCallback, useMemo } from "react";
import { ButtonIconNeumorphism } from "@components/Button";
import AddChannelModal from "../modals/AddChannelModal";
import { useTheme } from "styled-components";
import { colorBrightness } from "@theme/helper/tools";
import { BiMessageAdd } from "react-icons/bi";

const modalKey = "CreateConversationModal";
const modalOption = {
  modalId: modalKey,
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
  const theme = useTheme();

  const onAction = useCallback(
    async (data: ConversationCreate) => {
      const result = await dispatch(
        fetchAddConversation({
          idParticipant: data.user.split(",").map((id) => id.trim()),
          message: data.message ?? "",
        })
      ).unwrap();
      return result.conversation;
    },
    [dispatch]
  );

  const onSuccess = useCallback(
    (res: Response<any>) => {
      if (!res.data) return;
      modelController.close(modalKey);
      navigator(`/conversation/messenger/${string.getId(res.data)}`);
    },
    [modelController, navigator]
  );

  const colorIcons = useMemo(() => {
    return colorBrightness(theme.onBackgroundColor, -5);
  }, [theme]);

  const _addChannelClick = () => {
    modelController.show(
      <AddChannelModal
        onSubmitted={(data) => {
          PromiseToast({
            action: async () => await onAction(data),
            onSuccess: onSuccess,
          });
        }}
      />,
      modalOption
    );
  };

  return (
    <ButtonIconNeumorphism
      icon={<BiMessageAdd size={24} />}
      textColor={colorIcons}
      size={"2.5em"}
      onClick={_addChannelClick}
    />
  );
};

export default memo(AddChatButton);

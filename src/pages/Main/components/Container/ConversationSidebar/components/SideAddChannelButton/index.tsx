import { ButtonIconNeumorphism } from "@components/Button";
import { useModals } from "@components/Modal/hooks/useModals";
import { fetchAddConversation } from "@store/repo/conversation";
import useAppDispatch from "@hooks/useAppDispatch";
import { TbEdit } from "react-icons/tb";
import AddChannelModal from "./components/AddChannelModal";
import { useNavigate } from "react-router-dom";
import string from "@utils/string";
import { PromiseToast } from "@components/Toast/promise";
const modalKey = "CreateConversationModal";

const SideAddChannelButton = () => {
  const modelController = useModals();
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  const _editButton = () => {
    modelController.show(
      <AddChannelModal
        onSubmitted={(data) => {
          PromiseToast({
            pending: "Create conversation",
            action: async () =>
              await dispatch(
                fetchAddConversation({
                  emailParticipant: data.user.trim(),
                  message: data.message ?? "",
                })
              ).unwrap(),
            onSuccess: (res) => {
              if (res.data) {
                modelController.close(modalKey);
                navigator(`messenger/${string.getId(res.data)}`);
              }
            },
          });
        }}
      />,
      {
        key: modalKey,
        height: "18.75rem",
        width: "30rem",
        isDialog: false,
      }
    );
  };

  return (
    <ButtonIconNeumorphism
      onClick={_editButton}
      icon={<TbEdit className='AddOn' size={"1.5rem"} />}
    />
  );
};

export default SideAddChannelButton;

import { ButtonIconNeumorphism } from "@components/Button";
import { useModals } from "@components/Modal/hooks/useModals";
import { PromiseToast } from "@components/Toast/promise";
import { createConversation } from "@pages/Main/repo/conversation";
import { TbEdit } from "react-icons/tb";
import AddChannelModal from "./components/AddChannelModal";

const SideAddChannelButton = () => {
  const modelController = useModals();
  const modalKey = "CreateConversationModal";
  const _editButton = () => {
    modelController.show(
      <AddChannelModal
        onSubmitted={(data) => {
          modelController.close(modalKey);
          PromiseToast({
            action: () =>
              createConversation({
                participantId: data.user,
                message: data.message,
              }),
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

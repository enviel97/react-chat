import { ButtonIconNeumorphism } from "@components/Button";
import { useModals } from "@components/Modal/hooks/useModals";
import { TbEdit } from "react-icons/tb";
import AddChannelModal from "./components/AddChannelModal";

const SideAddChannelButton = () => {
  const modelController = useModals();
  const _editButton = () => {
    modelController.show(
      <AddChannelModal
        onSubmitted={(data) => {
          modelController.close("CreateConversationModal");
        }}
      />,
      {
        key: "CreateConversationModal",
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

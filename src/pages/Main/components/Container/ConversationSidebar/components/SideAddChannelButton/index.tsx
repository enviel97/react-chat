import { ButtonIconNeumorphism } from "@components/Button";
import { useModals } from "@components/Modal/hooks/useModals";
// import useAppDispatch from "@hooks/useAppDispatch";
import { TbEdit } from "react-icons/tb";
import AddChannelModal from "./components/AddChannelModal";
const modalKey = "CreateConversationModal";

const SideAddChannelButton = () => {
  const modelController = useModals();
  // const dispatch = useAppDispatch();

  const _editButton = () => {
    modelController.show(
      <AddChannelModal
        onSubmitted={(data) => {
          modelController.close(modalKey);
          // dispatch(addConversation())
          // createConversation({
          //   participantId: data.user,
          //   message: data.message,
          // }),
          // PromiseToast({
          //   action: () => {

          //   }
          // });
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

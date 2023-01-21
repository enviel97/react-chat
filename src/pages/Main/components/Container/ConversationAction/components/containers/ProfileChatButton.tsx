import ActionButton from "../ui/ActionButton";

const ProfileChatButton = () => {
  return (
    <ActionButton
      icon={"Profile"}
      onClick={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export default ProfileChatButton;

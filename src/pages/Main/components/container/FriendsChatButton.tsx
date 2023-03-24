import { memo } from "react";
import ActionButton from "../ui/ActionButton";

const FriendsChatButton = () => {
  return (
    <ActionButton
      icon={"Friends"}
      onClick={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export default memo(FriendsChatButton);

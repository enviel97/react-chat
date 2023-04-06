import { memo } from "react";
import ActionButton from "../ui/ActionButton";

const FriendsChatButton = () => {
  return (
    <ActionButton
      icon={"Profiles"}
      onClick={function (): void {}}
      to={"/friends"}
    />
  );
};

export default memo(FriendsChatButton);

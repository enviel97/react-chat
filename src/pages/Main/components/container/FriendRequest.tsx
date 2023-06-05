import { memo } from "react";
import ActionButton from "../ui/ActionButton";

const FriendsChatButton = () => {
  return <ActionButton icon={"Profiles"} to={"/friends"} />;
};

export default memo(FriendsChatButton);

import { memo } from "react";
import ActionButton from "../ui/ActionButton";

const LogoutButton = () => {
  return <ActionButton icon='Sign out' onClick={() => {}} to={"/"} />;
};

export default memo(LogoutButton);

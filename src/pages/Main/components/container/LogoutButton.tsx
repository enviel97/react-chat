import { memo } from "react";
import ActionButton from "../ui/ActionButton";

const LogoutButton = () => {
  return <ActionButton icon='Sign out' onClick={() => {}} to={"/logout"} />;
};

export default memo(LogoutButton);

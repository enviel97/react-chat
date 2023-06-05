import { memo } from "react";
import ActionButton from "../ui/ActionButton";

const LogoutButton = () => {
  return <ActionButton icon='Sign out' to={"/logout"} />;
};

export default memo(LogoutButton);

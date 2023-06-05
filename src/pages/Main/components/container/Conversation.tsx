import { memo } from "react";
import ActionButton from "../ui/ActionButton";

const Conversation = () => {
  return <ActionButton icon={"Conversation"} to={"/conversation"} />;
};

export default memo(Conversation);

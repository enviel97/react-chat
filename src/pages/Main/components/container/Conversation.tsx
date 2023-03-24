import { memo } from "react";
import ActionButton from "../ui/ActionButton";

const Conversation = () => {
  return (
    <ActionButton
      icon={"Conversation"}
      onClick={function (): void {}}
      to={"/conversation"}
    />
  );
};

export default memo(Conversation);

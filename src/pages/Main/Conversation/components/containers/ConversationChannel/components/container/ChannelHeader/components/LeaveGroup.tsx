import { ButtonIconNeumorphism } from "@components/Button";
import useLeavingChannel from "@pages/Main/Conversation/hooks/useLeavingChannel";
import { FC } from "react";
import { TiEject } from "react-icons/ti";

interface LeaveGroupProps {
  conversationId: string;
}
const LeaveGroup: FC<LeaveGroupProps> = ({ conversationId }) => {
  const onLeaveChatHandler = useLeavingChannel();

  return (
    <ButtonIconNeumorphism
      size='2.5em'
      icon={<TiEject size={"2.5em"} />}
      onClick={() => onLeaveChatHandler(conversationId)}
      hint='Leaving Group'
    />
  );
};

export default LeaveGroup;

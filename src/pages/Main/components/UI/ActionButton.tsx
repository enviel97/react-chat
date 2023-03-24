import { ButtonIconNeumorphism } from "@components/Button";
import { FC, useCallback, useMemo } from "react";
import { BiLogOutCircle, BiUser, BiMessageSquareDots } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface ActionButtonProps {
  icon: "Conversation" | "Friends" | "Sign out";
  to: string;
  state?: any;
  onClick?: () => void;
}

const ActionButton: FC<ActionButtonProps> = ({ icon, onClick, to, state }) => {
  const navigator = useNavigate();
  const Icons = useMemo(() => {
    const size = "2em";
    switch (icon) {
      case "Conversation": {
        return <BiMessageSquareDots size={size} />;
      }
      case "Friends": {
        return <BiUser size={size} />;
      }
      case "Sign out": {
        return <BiLogOutCircle size={size} />;
      }
    }
  }, [icon]);

  const onActionClick = useCallback(() => {
    onClick && onClick();
    navigator(to, { replace: true, state });
  }, [to, onClick, state, navigator]);

  return (
    <ButtonIconNeumorphism
      onClick={onActionClick}
      icon={Icons}
      hint={icon}
      hintPosition='top'
      hintBackgroundColor='surface'
    />
  );
};

export default ActionButton;

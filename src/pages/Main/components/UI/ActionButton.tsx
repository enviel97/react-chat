import { ButtonIconNeumorphism } from "@components/Button";
import { FC, useMemo } from "react";
import { BiLogOutCircle, BiMessageSquareAdd, BiUser } from "react-icons/bi";

interface ActionButtonProps {
  icon: "Add conversation" | "Friends" | "Sign out";
  onClick: () => void;
}

const ActionButton: FC<ActionButtonProps> = ({ icon, onClick }) => {
  const Icons = useMemo(() => {
    const size = "2em";
    switch (icon) {
      case "Add conversation": {
        return <BiMessageSquareAdd size={size} />;
      }
      case "Friends": {
        return <BiUser size={size} />;
      }
      case "Sign out": {
        return <BiLogOutCircle size={size} />;
      }
    }
  }, [icon]);

  return (
    <ButtonIconNeumorphism
      onClick={onClick}
      icon={Icons}
      hint={icon}
      hintPosition='right'
      hintBackgroundColor='surface'
    />
  );
};

export default ActionButton;

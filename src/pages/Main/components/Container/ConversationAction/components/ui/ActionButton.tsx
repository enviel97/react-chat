import { ButtonIconNeumorphism } from "@components/Button";
import { FC, useMemo } from "react";
import { BiLogOutCircle, BiMessageSquareAdd, BiUser } from "react-icons/bi";

interface ActionButtonProps {
  icon: "Add conversation" | "Profile" | "Sign out";
  onClick: () => void;
}

const ActionButton: FC<ActionButtonProps> = ({ icon, onClick }) => {
  const Icons = useMemo(() => {
    const size = "2em";
    switch (icon) {
      case "Add conversation": {
        return <BiMessageSquareAdd size={size} />;
      }
      case "Profile": {
        return <BiUser size={size} />;
      }
      case "Sign out": {
        return <BiLogOutCircle size={size} />;
      }
    }
  }, []);

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

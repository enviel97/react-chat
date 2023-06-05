import { ButtonIconNeumorphism } from "@components/Button";
import { FC, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconCategoryContainer } from "./styles/ActionButton.decorate";

const ActionButton: FC<ActionButtonProps> = ({ icon, to, state }) => {
  const navigator = useNavigate();
  const location = useLocation();
  const isCurrentTab = useMemo(() => {
    const _to = to.replaceAll("/", "");
    if (_to === "") return false;
    return location.pathname.replaceAll("/", "").includes(_to);
  }, [location, to]);

  const onActionClick = useCallback(() => {
    navigator(to, { replace: true, state });
  }, [to, state, navigator]);

  return (
    <ButtonIconNeumorphism
      onClick={onActionClick}
      icon={<IconCategoryContainer iconName={icon} isSelected={isCurrentTab} />}
      hint={icon}
      hintPosition='top'
      hintBackgroundColor='surface'
    />
  );
};

export default ActionButton;

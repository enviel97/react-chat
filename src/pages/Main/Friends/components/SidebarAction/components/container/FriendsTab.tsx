import { FC, memo } from "react";
import { TiGroup } from "react-icons/ti";
import NavLinkActions, {
  NavLinkAnimationController,
} from "../ui/NavLinkActions";

interface RequestTabProps extends NavLinkAnimationController {}

const FriendsTab: FC<RequestTabProps> = ({ isActive, isSelected }) => {
  return (
    <NavLinkActions
      to={"list"}
      label={"Friends"}
      icon={<TiGroup />}
      isActive={isActive}
      isSelected={isSelected}
    />
  );
};
export default memo(FriendsTab);

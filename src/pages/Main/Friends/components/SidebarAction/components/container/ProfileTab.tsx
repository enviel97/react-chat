import { FC, memo } from "react";
import { TiUser } from "react-icons/ti";
import NavLinkActions, {
  NavLinkAnimationController,
} from "../ui/NavLinkActions";

interface RequestTabProps extends NavLinkAnimationController {}

const ProfileTab: FC<RequestTabProps> = ({ isActive, isSelected }) => {
  return (
    <NavLinkActions
      to={"profile"}
      label={"Profile"}
      icon={<TiUser />}
      isActive={isActive}
      isSelected={isSelected}
    />
  );
};
export default memo(ProfileTab);

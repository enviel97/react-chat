import { FC, memo } from "react";
import { TiUserAdd } from "react-icons/ti";
import NavLinkActions, {
  NavLinkAnimationController,
} from "../ui/NavLinkActions";

interface RequestTabProps extends NavLinkAnimationController {}

const RequestTab: FC<RequestTabProps> = ({ isActive, isSelected }) => {
  return (
    <NavLinkActions
      to={"request"}
      label={"Request"}
      icon={<TiUserAdd />}
      isSelected={isSelected}
      isActive={isActive}
      quantity={100}
    />
  );
};
export default memo(RequestTab);

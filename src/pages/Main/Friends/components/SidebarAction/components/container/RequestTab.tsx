import useAppSelector from "@hooks/useAppSelector";
import BadgeQuantity from "@pages/Main/components/ui/BadgeQuantity";
import { selectTotalFriendRequest } from "@store/slices/ui";
import { FC, memo } from "react";
import { TiUserAdd } from "react-icons/ti";
import NavLinkActions, {
  NavLinkAnimationController,
} from "../ui/NavLinkActions";

interface RequestTabProps extends NavLinkAnimationController {}

const RequestTab: FC<RequestTabProps> = ({ isActive, isSelected }) => {
  const quantity = useAppSelector(selectTotalFriendRequest);
  return (
    <NavLinkActions
      to={"request"}
      label={"Request"}
      icon={<TiUserAdd />}
      isSelected={isSelected}
      isActive={isActive}
    >
      <BadgeQuantity quantity={quantity} position={{ top: -10, right: -6 }} />
    </NavLinkActions>
  );
};
export default memo(RequestTab);

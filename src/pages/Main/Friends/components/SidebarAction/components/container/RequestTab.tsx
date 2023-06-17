import { Event } from "@common/socket.define";
import useSocket from "@hooks/useSocket";
import BadgeQuantity from "@pages/Main/components/ui/BadgeQuantity";
import { FC, memo, useEffect, useState } from "react";
import { TiUserAdd } from "react-icons/ti";
import NavLinkActions, {
  NavLinkAnimationController,
} from "../ui/NavLinkActions";

interface RequestTabProps extends NavLinkAnimationController {}

const RequestTab: FC<RequestTabProps> = ({ isActive, isSelected }) => {
  const [quantity, setQuantity] = useState<number>();
  const socket = useSocket();
  useEffect(() => {
    const _id = setInterval(() => {
      socket.emit(
        Event.EVENT_FRIEND_REQUEST_QUANTITY,
        { quantity: quantity ?? 0 },
        (payload?: number) => {
          if (!payload) return;
          setQuantity(payload);
        }
      );
      // 5s emit once
    }, 5000);
    return () => {
      clearInterval(_id);
    };
  }, [socket, quantity]);

  return (
    <NavLinkActions
      to={"request"}
      label={"Request"}
      icon={<TiUserAdd />}
      isSelected={isSelected}
      isActive={isActive}
    >
      <BadgeQuantity quantity={quantity} />
    </NavLinkActions>
  );
};
export default memo(RequestTab);

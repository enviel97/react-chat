import Divider from "@components/Divider";
import { FC, Fragment, useMemo } from "react";
import { FriendListHeaderTitle } from "../../styles/FriendList.decorate";

interface Props {
  title: string;
  quantity?: number;
}

const FriendListHeader: FC<Props> = ({ title, quantity = 0 }) => {
  const size = useMemo(
    () => `(${Math.min(quantity, 99)}${quantity > 99 ? "+" : ""})`,
    [quantity]
  );
  return (
    <Fragment>
      <FriendListHeaderTitle>
        <span>{title}</span>
        <span>{size}</span>
      </FriendListHeaderTitle>
      <Divider />
    </Fragment>
  );
};

export default FriendListHeader;

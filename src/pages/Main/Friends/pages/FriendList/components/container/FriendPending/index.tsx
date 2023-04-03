import { FriendPageTitle } from "@pages/Main/Friends/styles/FriendPage.decorate";
import { Fragment, memo } from "react";
import FriendPendingBody from "./components/container/FriendPendingBody";

const FiendPending = () => {
  return (
    <Fragment>
      <FriendPageTitle>Friend Pending</FriendPageTitle>
      <FriendPendingBody />
    </Fragment>
  );
};

export default memo(FiendPending);

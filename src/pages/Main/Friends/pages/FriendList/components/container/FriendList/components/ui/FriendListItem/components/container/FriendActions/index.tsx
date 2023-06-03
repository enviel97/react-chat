import useCLoseOnClickOutside from "@hooks/useCloseOnClickOutside";
import { AnimatePresence } from "framer-motion";
import { FC, useCallback } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import FriendActionDropdown from "./components/FriendActionDropdown";
import { FriendActionButtonAnimate } from "./styles/FriendAction.animate";
import * as Styles from "./styles/FriendActions.decorate";

interface FriendAction {
  friend: UserProfile;
}

const FriendActions: FC<FriendAction> = ({ friend }) => {
  const { isOpen, toggle, targetRef, close } = useCLoseOnClickOutside();
  const handleAction = useCallback(
    (callback?: ActionCallback) => {
      close();
      if (!callback) return;
      callback(friend);
    },
    [friend, close]
  );

  return (
    <Styles.Container ref={targetRef}>
      <Styles.Button {...FriendActionButtonAnimate} onClick={toggle}>
        <MdOutlineMoreVert size={"1em"} />
      </Styles.Button>
      <AnimatePresence>
        {isOpen && <FriendActionDropdown onAction={handleAction} />}
      </AnimatePresence>
    </Styles.Container>
  );
};

export default FriendActions;

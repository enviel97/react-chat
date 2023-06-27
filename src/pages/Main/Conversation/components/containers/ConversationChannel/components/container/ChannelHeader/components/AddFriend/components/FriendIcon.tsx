import { AnimatePresence } from "framer-motion";
import { FC, memo } from "react";
import { TiUser } from "react-icons/ti";
import { ClassicSpinner } from "react-spinners-kit";
import {
  Animation,
  IconContainer,
  NotificationContainer,
  SvgIconContainer,
} from "../styles/FriendIcon.decorate";
import { IconBlocked, IconCheck, IconPending, IconPlus } from "./Icon";
interface FriendIconProps {
  relationship: Relationship;
  loadState: LoadState;
}

const FriendIcon: FC<FriendIconProps> = ({ relationship, loadState }) => {
  return (
    <SvgIconContainer>
      <TiUser size='2em' color='var(--white)' />
      <NotificationContainer>
        <AnimatePresence mode='wait'>
          {loadState === "loading" && (
            <IconContainer {...Animation} custom={0}>
              <ClassicSpinner size={16} color='var(--white)' />
            </IconContainer>
          )}
          {loadState !== "loading" && (
            <>
              <AnimatePresence mode='wait'>
                {relationship === "guest" && (
                  <IconContainer {...Animation} custom={1}>
                    <IconPlus />
                  </IconContainer>
                )}
              </AnimatePresence>
              <AnimatePresence mode='wait'>
                {relationship === "friend" && (
                  <IconContainer {...Animation} custom={1}>
                    <IconCheck />
                  </IconContainer>
                )}
              </AnimatePresence>
              <AnimatePresence mode='wait'>
                {relationship === "pending" && (
                  <IconContainer {...Animation} custom={1}>
                    <IconPending />
                  </IconContainer>
                )}
              </AnimatePresence>
              <AnimatePresence mode='wait'>
                {relationship === "block" && (
                  <IconContainer {...Animation} custom={1}>
                    <IconBlocked />
                  </IconContainer>
                )}
              </AnimatePresence>
            </>
          )}
        </AnimatePresence>
      </NotificationContainer>
    </SvgIconContainer>
  );
};

export default memo(FriendIcon);

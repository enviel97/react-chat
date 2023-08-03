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
import { IconRelationShip } from "./Icon";
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
            <AnimatePresence mode='popLayout'>
              {Object.entries(IconRelationShip).map(
                ([key, Component], index) =>
                  relationship === key && (
                    <IconContainer {...Animation} key={index} custom={1}>
                      <Component />
                    </IconContainer>
                  )
              )}
            </AnimatePresence>
          )}
        </AnimatePresence>
      </NotificationContainer>
    </SvgIconContainer>
  );
};

export default memo(FriendIcon);

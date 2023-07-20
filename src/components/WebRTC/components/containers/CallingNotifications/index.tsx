import useAppSelector from "@hooks/useAppSelector";
import { callSelector } from "@store/slices/call";
import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import CallNotification from "./components/CallNotification";
import {
  CallNotificationContainer,
  CallNotificationItem,
} from "./styles/CallingNotifications.decorate";
import { CallNotificationAnimation } from "./styles/CallNotification.animate";

const CallingNotifications = () => {
  const incomingCalls = useAppSelector(callSelector.selectIncomingCalls);
  return (
    <CallNotificationContainer>
      <AnimatePresence mode='popLayout'>
        {incomingCalls.map((connectionId, index) => {
          return (
            <CallNotificationItem
              {...CallNotificationAnimation.item}
              layout
              custom={index}
              key={connectionId}
            >
              <CallNotification connectionId={`${connectionId}`} />
            </CallNotificationItem>
          );
        })}
      </AnimatePresence>
    </CallNotificationContainer>
  );
};

export default memo(CallingNotifications);

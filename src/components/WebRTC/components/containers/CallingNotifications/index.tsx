import useAppSelector from "@hooks/useAppSelector";
import { selectCallIds } from "@store/slices/call";
import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import CallNotification from "./components/CallNotification";
import {
  CallNotificationContainer,
  CallNotificationItem,
} from "./styles/CallingNotifications.decorate";
import { CallNotificationAnimation } from "./styles/CallNotification.animate";

const CallingNotifications = () => {
  const callingNotification = useAppSelector(selectCallIds);
  return (
    <CallNotificationContainer>
      <AnimatePresence mode='popLayout'>
        {callingNotification.map((call, index) => {
          return (
            <CallNotificationItem
              {...CallNotificationAnimation.item}
              layout
              custom={index}
              key={call}
            >
              <CallNotification connectionId={call.toString()} />
            </CallNotificationItem>
          );
        })}
      </AnimatePresence>
    </CallNotificationContainer>
  );
};

export default memo(CallingNotifications);

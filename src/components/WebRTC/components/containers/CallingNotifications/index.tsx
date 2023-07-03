import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import {
  addConnectionModel,
  selectCallIds,
  selectPeer,
} from "@store/slices/call";
import { AnimatePresence } from "framer-motion";
import { memo, useEffect } from "react";
import CallNotification from "./components/CallNotification";
import {
  CallNotificationContainer,
  CallNotificationItem,
} from "./styles/CallingNotifications.decorate";
import { CallNotificationAnimation } from "./styles/CallNotification.animate";

const CallingNotifications = () => {
  const callingNotification = useAppSelector(selectCallIds);
  const dispatch = useAppDispatch();
  const peer = useAppSelector(selectPeer);

  useEffect(() => {
    if (!peer || !peer.id) return;

    peer.on("call", (connection) => {
      console.log(`Has calling`);
      console.log({ connection });
      dispatch(
        addConnectionModel({
          caller: connection.peer,
          connection: connection,
          type: connection.metadata["type"] ?? "VideoCall",
        })
      );

      connection.on("close", () => {
        console.log(`Call end`);
        console.log({ connection });
      });
    });
    // Listener
  }, [peer, dispatch]);

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

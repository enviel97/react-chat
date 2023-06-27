import CallObserver from "@components/WebRTC/common/peer";
import useWebRTC from "@components/WebRTC/hooks/useWebRTC";
import string from "@utils/string";
import { AnimatePresence } from "framer-motion";
import { FC, memo, useCallback, useEffect, useState } from "react";
import CallNotification from "./components/CallNotification";
import {
  CallNotificationContainer,
  CallNotificationItem,
} from "./styles/CallingNotifications.decorate";
import { CallNotificationAnimation } from "./styles/CallNotification.animate";

interface CallingNotification {
  onStop: () => void;
  onAnswer: (caller: CallModel) => void;
}

const CallingNotifications: FC<CallingNotification> = ({
  onStop,
  onAnswer,
}) => {
  const [callingNotification, setCallingNotification] = useState<string[]>();
  const { peer } = useWebRTC();

  useEffect(() => {
    if (!peer) return;
    peer.on("call", async (caller) => {
      // add call to list waiting
      console.log({ receiver: caller });
      CallObserver.set(caller.connectionId, caller);
      setCallingNotification((prev) => [...(prev ?? []), caller.peer]);
    });
  }, [peer]);

  const clearNotification = useCallback((caller: string) => {
    setCallingNotification((prev) => prev?.filter((id) => id !== caller));
  }, []);

  const handleRejectCall = useCallback(
    (caller: string) => {
      clearNotification(caller);
      onStop();
    },
    [clearNotification, onStop]
  );

  const handleAnswerCall = useCallback(
    (caller: string, type: CallType) => {
      clearNotification(caller);
      onAnswer({ id: caller, type });
    },
    [clearNotification, onAnswer]
  );

  return (
    <>
      <button
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          background: "black",
          pointerEvents: "auto",
        }}
        onClick={() => {
          setCallingNotification((prev) => [...(prev ?? []), string.genId()]);
        }}
      >
        Add
      </button>
      <CallNotificationContainer>
        <AnimatePresence mode='popLayout'>
          {callingNotification?.map((connectionId, index) => {
            return (
              <CallNotificationItem
                {...CallNotificationAnimation.item}
                layout
                custom={index}
                key={connectionId}
              >
                <CallNotification
                  onAnswerCall={handleAnswerCall}
                  onRejectCall={handleRejectCall}
                  connectionId={connectionId}
                />
              </CallNotificationItem>
            );
          })}
        </AnimatePresence>
      </CallNotificationContainer>
    </>
  );
};

export default memo(CallingNotifications);

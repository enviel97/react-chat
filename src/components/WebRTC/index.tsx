import Peer from "peerjs";
import { createContext, memo, useMemo } from "react";
import CallingNotifications from "./components/containers/CallingNotifications";
import { WebRTCContainer } from "./styles/WebRTC.decorate";
import CallingView from "./components/containers/CallingView";
import { AnimatePresence } from "framer-motion";
import usePeer from "./hooks/usePeer";
import useCallController from "./hooks/useCallController";

export const WebRTCContext = createContext<IWebRTCContext<Peer>>({
  peer: new Peer(),
  state: "Idle",
  call(receiver: CallModel) {
    throw new Error("Method not implement");
  },
});

const WebRTCProvider = ({ children }: Components) => {
  const { peer, state } = usePeer();
  const { selectAnswer, controller } = useCallController(peer);

  const value = useMemo(
    () => ({ peer, state, call: controller.call }),
    [peer, state, controller.call]
  );

  return (
    <WebRTCContext.Provider value={value}>
      {children}
      <WebRTCContainer>
        <AnimatePresence mode='wait'>
          {selectAnswer && (
            <CallingView
              callerId={selectAnswer.id}
              type={selectAnswer.type}
              onStop={controller.stop}
            />
          )}
        </AnimatePresence>
        <CallingNotifications
          onStop={controller.stop}
          onAnswer={controller.answer}
        />
      </WebRTCContainer>
    </WebRTCContext.Provider>
  );
};

export default memo(WebRTCProvider);

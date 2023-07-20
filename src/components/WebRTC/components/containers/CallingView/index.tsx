import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import { callSelector, peerSelector } from "@store/slices/call";
import { AnimatePresence } from "framer-motion";
import { FC, memo, useCallback, useEffect, useState } from "react";
import CallingAction from "./components/container/CallingAction";
import LocalPersonCall from "./components/container/LocalPersonCall";
import RemotePersonCall from "./components/container/RemotePersonCall";
import usePeerCall from "./hooks/usePeerCall";
import { CallingViewAnimation } from "./styles/CallingView.animate";
import {
  CallingContainer,
  CallingViewContainer,
  CallingViewOverplay,
} from "./styles/CallingView.decorate";

const CallingView = () => {
  const { localStream, remoteStream } = usePeerCall();

  return (
    <CallingViewOverplay {...CallingViewAnimation.overlay}>
      <AnimatePresence mode='wait'>
        <CallingViewContainer {...CallingViewAnimation.container}>
          <CallingContainer>
            <LocalPersonCall stream={localStream} />
            <RemotePersonCall stream={remoteStream} />
          </CallingContainer>
          <CallingAction />
        </CallingViewContainer>
      </AnimatePresence>
    </CallingViewOverplay>
  );
};
export default memo(CallingView);

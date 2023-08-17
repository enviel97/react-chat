import { Event } from "@common/socket.define";
import { safeLog } from "@core/api/utils/logger";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import {
  peerSelector,
  setCallError,
  setMediaConnection,
} from "@store/slices/call";
import { useEffect, useState } from "react";

const usePeerCall = (callId: string, localStream?: MediaStream) => {
  const socket = useSocket();
  const peer = useAppSelector(peerSelector.selectPeer);
  const dispatch = useAppDispatch();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const call = useAppSelector(peerSelector.selectMediaConnection);

  /**
   * Handler catch incoming call
   */
  useEffect(() => {
    safeLog("Receiver get catch call");
    if (!peer) return;
    safeLog({ peer });
    peer.on("call", (incomingCall) => {
      incomingCall.answer(localStream);
      dispatch(setMediaConnection(incomingCall));
    });

    return () => {
      peer.off("call");
    };
  }, [peer, localStream, dispatch]);

  /**
   * Handler call to receiver when it accept call
   */
  useEffect(() => {
    socket.on(
      Event.CALL_VIDEO.LISTEN.ACCEPT,
      (payload: CallPayload<CallAcceptPayload>) => {
        if (!localStream || !peer) return;
        const receiver = payload.data.connecterId;
        const mediaConnection = peer.call(receiver, localStream);
        safeLog("Caller do action");
        dispatch(setMediaConnection(mediaConnection));
      }
    );
    return () => {
      socket.off(Event.CALL_VIDEO.LISTEN.ACCEPT);
    };
  }, [socket, peer, localStream, dispatch]);

  useEffect(() => {
    if (!call) return;
    call.on("iceStateChanged", (state) => {
      safeLog({ iceStateChanged: state });
      switch (state) {
        case "disconnected": {
          dispatch(setCallError("user-unavailable"));
          setRemoteStream(undefined);
        }
      }
    });
    call.on("stream", (stream) => {
      setRemoteStream(stream);
    });

    return () => {
      call.off("iceStateChanged");
    };
  }, [dispatch, call]);

  return remoteStream;
};

export default usePeerCall;

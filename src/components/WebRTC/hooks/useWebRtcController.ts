import { Event } from "@common/socket.define";
import { safeLog } from "@core/api/utils/logger";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import { connect, localStream } from "@store/repo/call";
import { peerSelector, setConnection } from "@store/slices/call";
import { useEffect } from "react";

const useWebRtcController = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const peer = useAppSelector(peerSelector.selectPeer);

  // Handle on caller action
  useEffect(() => {
    if (!peer) return;
    peer.on("call", (incomingCall) => {
      dispatch(localStream())
        .unwrap()
        .then((stream) => {
          incomingCall.answer(stream);
          dispatch(setConnection(incomingCall));
        });
    });
    return () => {
      peer.off("call");
    };
  }, [dispatch, peer]);

  // Handle on caller action
  useEffect(() => {
    socket.on(
      Event.CALL_VIDEO.LISTEN.ACCEPT,
      (payload: CallPayload<CallAcceptPayload>) => {
        dispatch(connect())
          .unwrap()
          .then((peer) => {
            dispatch(localStream())
              .unwrap()
              .then((stream) => {
                const receiver = payload.data.to;
                const mediaConnection = peer.call(receiver, stream);
                dispatch(setConnection(mediaConnection));
              });
          })
          .catch((error) => {
            safeLog(error);
          });
      }
    );
    return () => {
      socket.off(Event.CALL_VIDEO.LISTEN.ACCEPT);
    };
  }, [socket, dispatch]);
};

export default useWebRtcController;

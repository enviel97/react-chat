import { Event } from "@common/socket.define";
import {
  DEVICE_PERMISSION_NOT_ALLOW,
  PEER_SERVER_UNDEFINED,
} from "@components/WebRTC/commons/error.quotes";
import { safeLog } from "@core/api/utils/logger";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useSocket from "@hooks/useSocket";
import { connect } from "@store/repo/call";
import { peerSelector } from "@store/slices/call";
import { MediaConnection } from "peerjs";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const usePeerCall = () => {
  // const connection = useAppSelector(peerSelector.selectConnection);
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const peer = useAppSelector(peerSelector.selectPeer);
  const [connection, setConnection] = useState<MediaConnection>();
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();

  const peerUndefine = useCallback(() => {
    socket.emit(Event.CALL_VIDEO.EMIT.ERROR.P2P_NOT_FOUND, () => {
      toast.error(PEER_SERVER_UNDEFINED);
    });
  }, [socket]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
      })
      .catch((error) => {
        safeLog({ error });
        toast.error(DEVICE_PERMISSION_NOT_ALLOW);
        socket.emit(Event.CALL_VIDEO.EMIT.ERROR.DEVICE_NOT_FOUND);
        return false;
      });
  }, [socket]);

  useEffect(() => {
    console.log({
      peer: peer?.id,
      localStream: localStream,
      remoteStream: remoteStream,
      connect: connection,
    });
  }, [connection, localStream, remoteStream, peer]);

  // Handle on caller action
  useEffect(() => {
    if (!peer) return peerUndefine();
    peer.on("call", (incomingCall) => {
      console.log({ incomingCall });
      incomingCall.answer(localStream);
      setConnection(incomingCall);
      incomingCall.on("stream", (stream) => {
        setRemoteStream(stream);
      });
    });
    return () => {
      peer.off("call");
      localStream?.close();
    };
  }, [peer, localStream, peerUndefine]);

  // Handle on caller action
  useEffect(() => {
    socket.on(
      Event.CALL_VIDEO.LISTEN.ACCEPT,
      (payload: CallPayload<CallAcceptPayload>) => {
        const receiver = payload.data.to;
        if (!localStream) return;
        dispatch(connect())
          .unwrap()
          .then((peer) => {
            const mediaConnection = peer.call(receiver, localStream);
            setConnection(mediaConnection);
          })
          .catch((error) => {
            safeLog({ error });
            peerUndefine();
          });
      }
    );
    return () => {
      socket.off(Event.CALL_VIDEO.LISTEN.ACCEPT);
      localStream?.close();
    };
  }, [socket, localStream, peerUndefine, dispatch]);

  useEffect(() => {
    if (!connection) return;
    connection.on("close", () => {
      safeLog({ connection, state: "close" });
      // setConnection(undefined);
    });
    connection.on("stream", (remoteStream) => {
      safeLog({ connection, state: "stream" });
      setRemoteStream(remoteStream);
    });

    return () => {
      connection.off("close");
      connection.off("stream");
      connection.close();
    };
  }, [connection]);

  return {
    localStream,
    remoteStream,
  };
};

export default usePeerCall;

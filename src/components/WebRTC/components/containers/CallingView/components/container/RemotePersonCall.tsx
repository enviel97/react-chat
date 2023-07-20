import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import { callSelector } from "@store/slices/call";
import { selectRemoteInfo } from "@store/slices/call/selectors/call.selector";
import type { MediaConnection } from "peerjs";
import { FC, memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import PersonCall from "../ui/PersonCall";

const Container = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: var(--surface-color);
`;

interface RemotePersonCallProps {
  stream?: MediaStream;
}

const RemotePersonCall: FC<RemotePersonCallProps> = ({ stream }) => {
  const remoteInfo = useAppSelector(selectRemoteInfo);

  return (
    <Container>
      <PersonCall
        metadata={remoteInfo}
        webcam={true}
        stream={stream}
        isRemote
        isConnected={!!stream}
        // microphone={true}
      />
    </Container>
  );
};
export default memo(RemotePersonCall);

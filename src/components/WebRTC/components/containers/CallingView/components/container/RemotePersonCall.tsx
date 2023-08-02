import useAppSelector from "@hooks/useAppSelector";
import { selectRemoteInfo } from "@store/slices/call/selectors/call.selector";
import { FC, memo } from "react";
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
      />
    </Container>
  );
};
export default memo(RemotePersonCall);

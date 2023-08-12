import useAppSelector from "@hooks/useAppSelector";
import { callSelector } from "@store/slices/call";
import { FC, memo } from "react";
import styled from "styled-components";
// import PersonCall from "../../../../ui/PersonCall";

const Container = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: var(--surface-color);
`;
interface LocalPersonCallProps {
  stream?: MediaStream;
}

const LocalPersonCall: FC<LocalPersonCallProps> = ({ stream }) => {
  const localInfo = useAppSelector(callSelector.selectLocalInfo);
  return (
    <Container>
      {/* <PersonCall metadata={localInfo} stream={stream} webcam={true} /> */}
    </Container>
  );
};
export default memo(LocalPersonCall);

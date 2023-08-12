import { MagicSpinner } from "react-spinners-kit";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Notification = styled.h4`
  color: var(--gray);
  font-weight: bold;
`;

const CallingNotification = () => {
  return (
    <Container>
      <MagicSpinner size={100} color={"#888888"} />
      <Notification>Calling to receiver</Notification>
    </Container>
  );
};

export default CallingNotification;

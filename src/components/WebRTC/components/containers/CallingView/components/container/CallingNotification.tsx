import { motion } from "framer-motion";
import { MagicSpinner } from "react-spinners-kit";
import styled from "styled-components";

const Container = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--gray);
`;
const Notification = styled.h4`
  color: inherit;
  font-weight: bold;
`;

const CallingNotification = () => {
  return (
    <Container
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ x: "100%", opacity: 0 }}
      layoutId='CallingModal'
    >
      <MagicSpinner size={150} color={"inherit"} />
      <Notification>Calling to receiver</Notification>
    </Container>
  );
};

export default CallingNotification;

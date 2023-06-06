import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export const AuthContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const AuthLayout = () => {
  return (
    <AnimatePresence mode='wait'>
      <AuthContainer>
        <Outlet />
      </AuthContainer>
    </AnimatePresence>
  );
};

export default AuthLayout;

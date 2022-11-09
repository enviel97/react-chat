import { Outlet } from "react-router-dom";
import styled from "styled-components";
import useAutoScrollTop from "@hooks/useAutoScrollTop";

export const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.backgroundColor};
  display: flex;
  overflow: hidden;
  flex-direction: row;
`;

const MainLayout = () => {
  useAutoScrollTop();

  return (
    <MainContainer id='app'>
      <Outlet />
    </MainContainer>
  );
};

export default MainLayout;

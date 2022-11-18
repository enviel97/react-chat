import { Navigate, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import useAutoScrollTop from "@hooks/useAutoScrollTop";
import PageLoading from "@components/Loading/PageLoading";
import useAuthFetch from "@pages/Auth/hooks/useAuthFetch";

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
  const { user, loading } = useAuthFetch();
  const location = useLocation();

  if (loading) {
    return <PageLoading />;
  }
  if (!user) {
    return <Navigate to={"/auth"} state={{ from: location }} replace />;
  }
  return (
    <MainContainer id='app'>
      <Outlet />
    </MainContainer>
  );
};

export default MainLayout;

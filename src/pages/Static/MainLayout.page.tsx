import { Navigate, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import useAutoScrollTop from "@hooks/useAutoScrollTop";
import PageLoading from "@components/Loading/PageLoading";
import useAuthFetch from "@pages/Auth/hooks/useAuthFetch";
import { Page } from "@utils/styles";
import SidebarAction from "@pages/Main/components/container/SidebarAction";

export const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
  display: flex;
  /* TODO */
  /* overflow: hidden; */
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
      <Page display='flex'>
        <SidebarAction />
        <Outlet />
      </Page>
    </MainContainer>
  );
};

export default MainLayout;

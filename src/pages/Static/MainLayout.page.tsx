import { Navigate, Outlet, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import useAutoScrollTop from "@hooks/useAutoScrollTop";
import PageLoading from "@components/Loading/PageLoading";
import useAuthFetch from "@pages/Auth/hooks/useAuthFetch";
import { Page } from "@utils/styles";
import SidebarAction from "@pages/Main/components/container/SidebarAction";
import { useEffect, useState } from "react";
import { SidebarContainer } from "@pages/Main/components/styles/Sidebar.decorate";
import useNotificationFriendToast from "@pages/Main/hooks/useNotificationFriendsToast";
import useQuantityNotification from "@pages/Main/hooks/useQuantityNotification";
import WebRTCProvider from "@components/WebRTC";
import useAppSelector from "@hooks/useAppSelector";

interface Props {
  $sidebarWidth: string;
}
const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
  display: flex;
  /* TODO */
  /* overflow: hidden; */
  flex-direction: row;
`;

const MainLayoutContainer = styled.div<Props>`
  display: flex;
  box-sizing: border-box;
  flex: 1;
  height: 100%;
  ${({ $sidebarWidth }) => {
    return css`
      width: calc(100% - ${$sidebarWidth});
    `;
  }}
`;

const MainLayout = () => {
  useAutoScrollTop();
  const { user } = useAuthFetch();
  const process = useAppSelector((state) => state.profile.process);
  const location = useLocation();
  const [sidebarWidth, setSidebarWidth] = useState<string>("74px");

  useNotificationFriendToast();
  useQuantityNotification();

  useEffect(() => {
    const sidebar = document.querySelector(SidebarContainer.toString());
    if (!sidebar) return;
    const width = window.getComputedStyle(sidebar).width;
    setSidebarWidth(width);
  }, []);

  if (["idle", "loading"].includes(process)) return <PageLoading />;

  if (user) {
    return (
      <MainContainer id='app'>
        <Page display='flex'>
          <SidebarAction />
          <MainLayoutContainer $sidebarWidth={sidebarWidth}>
            <Outlet />
          </MainLayoutContainer>
          <WebRTCProvider />
        </Page>
      </MainContainer>
    );
  }
  return <Navigate to={"/auth"} state={{ from: location }} replace />;
};

export default MainLayout;

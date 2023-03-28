import { lazy, Suspense } from "react";
import { Outlet, Route } from "react-router-dom";
import SidebarAction from "./components/SidebarAction";
import SidebarController from "./components/SidebarController";
import FriendListLoading from "./pages/FriendList/components/ui/FriendListLoading";
import FriendRequestLoading from "./pages/FriendRequest/components/container/FriendRequestLoading";
import Profile from "./pages/Profile";
import {
  FriendPageDecorate,
  FriendPageLayout,
} from "./styles/FriendPage.decorate";

const FriendRequest = lazy(() => import("./pages/FriendRequest"));
const FriendList = lazy(() => import("./pages/FriendList"));

const FriendPage = () => {
  return (
    <FriendPageDecorate>
      <SidebarAction />
      <FriendPageLayout>
        <Outlet />
      </FriendPageLayout>
    </FriendPageDecorate>
  );
};

const FriendsRoute = (
  <Route path='/friends' key='friends' element={<FriendPage />}>
    <Route path='' element={<SidebarController />} />
    <Route
      path='request'
      element={
        <Suspense fallback={<FriendRequestLoading />}>
          <FriendRequest />
        </Suspense>
      }
    />
    <Route
      path='list'
      element={
        <Suspense fallback={<FriendListLoading />}>
          <FriendList />
        </Suspense>
      }
    />
    <Route
      path='profile'
      element={
        <Suspense fallback={<FriendListLoading />}>
          <Profile />
        </Suspense>
      }
    />
  </Route>
);

export default FriendsRoute;

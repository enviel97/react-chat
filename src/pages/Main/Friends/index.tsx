import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import SidebarAction from "./components/SidebarAction";
import FriendListLoading from "./pages/FriendList/components/container/FriendListLoading";
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
    <Route path='' element={<Navigate to={"list"} replace />} />
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

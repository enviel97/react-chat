import { Outlet, Route } from "react-router-dom";
import SidebarAction from "./components/SidebarAction";
import SidebarController from "./components/SidebarController";
import useNotificationFriendToast from "./hooks/useNotificationFriendsToast";
import FriendList from "./pages/FriendList";
import FriendRequest from "./pages/FriendRequest";
import Profile from "./pages/Profile";
import {
  FriendPageDecorate,
  FriendPageLayout,
} from "./styles/FriendPage.decorate";

const FriendPage = () => {
  // Notification toast
  useNotificationFriendToast();

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
    <Route path='' element={<SidebarController />} index />
    <Route path='request' element={<FriendRequest />} />
    <Route path='list' element={<FriendList />} />
    <Route path='profile' element={<Profile />} />
  </Route>
);

export default FriendsRoute;

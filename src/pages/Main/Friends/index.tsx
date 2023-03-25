import { Navigate, Outlet, Route } from "react-router-dom";
import SidebarAction from "./components/SidebarAction";
import { FriendList, FriendRequest } from "./pages";
import { FriendPageDecorate } from "./styles/FriendPage.decorate";

const FriendPage = () => {
  return (
    <FriendPageDecorate>
      <SidebarAction initTabDefault={0} />
      <Outlet />
    </FriendPageDecorate>
  );
};

const FriendsRoute = (
  <Route path='/friends' key='friends' element={<FriendPage />}>
    <Route path='' element={<Navigate to={"list"} replace />} />
    <Route path='request' element={<FriendRequest />} />
    <Route path='list' element={<FriendList />} />
  </Route>
);

export default FriendsRoute;

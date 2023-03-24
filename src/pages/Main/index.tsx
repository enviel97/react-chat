import MainLayout from "@pages/Static/MainLayout.page";
import { Navigate, Route } from "react-router-dom";
import ConversationRoute from "./Conversation";
import FriendRoute from "./Friends";

const MainRoute = (
  <Route path='/' key='Main' element={<MainLayout />}>
    <Route path='home' element={<Navigate to={"/conversation"} replace />} />
    <Route path='' element={<Navigate to={"/conversation"} replace />} />
    {ConversationRoute}
    {FriendRoute}
  </Route>
);

export default MainRoute;

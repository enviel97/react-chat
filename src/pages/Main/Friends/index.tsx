import { Route } from "react-router-dom";

const FriendPage = () => {
  return <div>Friends</div>;
};

const FriendsRoute = (
  <Route path='/friends' key='friends' element={<FriendPage />}></Route>
);

export default FriendsRoute;

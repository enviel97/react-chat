import AuthLayout from "@pages/Static/AuthLayout.page";
import { Route } from "react-router-dom";
import { SIGN_IN } from "./common/page";
import Auth from "./pages";

const AuthRoute = (
  <Route path={SIGN_IN} key='auth' element={<AuthLayout />}>
    <Route index element={<Auth />} />
  </Route>
);

export default AuthRoute;

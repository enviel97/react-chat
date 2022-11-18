import AuthLayout from "@pages/Static/AuthLayout.page";
import { Route } from "react-router-dom";
import { SIGN_IN } from "./common/page";

import { useRef, useState } from "react";
import Action from "./components/Action";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import {
  Container,
  Box,
  FormContainer,
  FormBox,
  AuthPage,
} from "./decorates/decorates.page";

const Auth = () => {
  const [active, setActive] = useState(false);
  const registerForm = useRef<FormHandler>(null);
  const loginForm = useRef<FormHandler>(null);

  const toggleSlice = () => {
    setActive((prev) => {
      if (prev) {
        registerForm.current?.reset();
        registerForm.current?.clearError();
      } else {
        loginForm.current?.reset();
        loginForm.current?.clearError();
      }
      return !prev;
    });
  };

  return (
    <AuthPage active={active}>
      <Container>
        {/* Behind side */}
        <Box>
          <Action
            className='signInLink'
            action={toggleSlice}
            type={"Sign In"}
          />
          <Action
            className='signUpLink'
            action={toggleSlice}
            type={"Sign Up"}
          />
        </Box>

        {/* Behind side */}
        <FormContainer active={active}>
          <FormBox className='loginForm'>
            <LoginForm ref={loginForm} />
          </FormBox>
          <FormBox className='registerForm'>
            <RegisterForm
              ref={registerForm}
              changeLoginValue={loginForm.current?.changeValue}
            />
          </FormBox>
        </FormContainer>
      </Container>
    </AuthPage>
  );
};

const AuthRoute = (
  <Route path={SIGN_IN} key='auth' element={<AuthLayout />}>
    <Route index element={<Auth />} />
  </Route>
);

export default AuthRoute;

import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export const AuthContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AuthLayout = () => {
  // useEffect(() => {
  //   setLoading(true);
  //   loadAuth()
  //     .then((res) => {
  //       toast.success(res, {
  //         pauseOnFocusLoss: false,
  //         pauseOnHover: false,
  //         autoClose: 700,
  //       });
  //       setIsAuthenticate(true);
  //     })
  //     .catch((error) => {
  //       if (isOK(error?.code ?? 200)) {
  //         return;
  //       }
  //       toast.error(error.message ?? error);
  //     })
  //     .finally(() => {
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 1200);
  //     });
  // }, [setIsAuthenticate]);

  // if (isAuthenticate) {
  //   return <Navigate to={"/"} replace />;
  // }

  return (
    <AnimatePresence mode='wait'>
      <AuthContainer>
        <Outlet />
      </AuthContainer>
    </AnimatePresence>
  );
};

export default AuthLayout;

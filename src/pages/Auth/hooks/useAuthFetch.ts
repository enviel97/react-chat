import useAppDispatch from "@hooks/useAppDispatch";
import useAuthenticate from "@hooks/useAuthenticate";
import { useEffect } from "react";
import { authStatus } from "@store/repo/authenticate/authenticate";

const useAuthFetch = () => {
  const { user } = useAuthenticate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) return;
    const promise = dispatch(authStatus());
    return () => {
      promise.abort();
    };
  }, [dispatch, user]);

  return { user };
};

export default useAuthFetch;

import useAuthenticate from "@hooks/useAuthenticate";
import { useEffect, useMemo, useState } from "react";
import { authStatus } from "../repo/authenticate/authenticate";

const useAuthFetch = () => {
  const { user, updateAuthUser } = useAuthenticate();
  const [loading, setLoading] = useState<boolean>(true);
  const controller = useMemo(() => new AbortController(), []);

  useEffect(() => {
    setLoading(true);

    authStatus()
      .then((user) => {
        if (!!user) updateAuthUser(user);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [controller, updateAuthUser]);
  return { user, loading };
};

export default useAuthFetch;

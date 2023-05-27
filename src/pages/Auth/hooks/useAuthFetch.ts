import useAuthenticate from "@hooks/useAuthenticate";
import { useEffect, useState } from "react";
import { authStatus } from "../../../store/repo/authenticate/authenticate";

const useAuthFetch = () => {
  const { user, updateAuthUser } = useAuthenticate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    authStatus()
      .then((user) => {
        if (!!user) updateAuthUser(user);
        setLoading(false);
      })
      .catch((error) => {
        updateAuthUser(undefined);
        setLoading(false);
      });
  }, [updateAuthUser]);
  return { user, loading };
};

export default useAuthFetch;

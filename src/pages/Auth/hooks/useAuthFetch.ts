import useAuthenticate from "@hooks/useAuthenticate";
import { useEffect, useState } from "react";
import { authStatus } from "../../../store/repo/authenticate/authenticate";

const useAuthFetch = () => {
  const { user, updateAuthUser } = useAuthenticate();
  const [loadState, setLoadState] = useState<LoadState>("idle");

  useEffect(() => {
    setLoadState("loading");

    authStatus()
      .then((user) => {
        if (!!user) updateAuthUser(user);
        setLoadState("success");
      })
      .catch((error) => {
        updateAuthUser(undefined);
        setLoadState("error");
      });
  }, [updateAuthUser]);

  return { user, loadState };
};

export default useAuthFetch;

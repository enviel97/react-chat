import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import { fetchProfile } from "@store/repo/user";
import string from "@utils/string";
import { createContext, FC, useCallback, useEffect } from "react";

interface AuthenticateController {
  user?: User;
  isUser: (another: any) => boolean;
}

export const AuthContext = createContext<AuthenticateController>({
  isUser: (another) => false,
});

export const AuthProvider: FC<Components> = ({ children }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.user);

  const isUser = useCallback(
    (another: any) => {
      if (!user) return false;
      return string.getId(another) === string.getId(user);
    },
    [user]
  );

  useEffect(() => {
    if (!user) return;
    const promise = dispatch(fetchProfile());
    return () => promise.abort();
  }, [user, dispatch]);

  return (
    <AuthContext.Provider value={{ user, isUser }}>
      {children}
    </AuthContext.Provider>
  );
};

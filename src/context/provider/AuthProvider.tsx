import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import { fetchProfile } from "@store/repo/user";
import string from "@utils/string";
import { createContext, FC, useCallback, useEffect, useMemo } from "react";

interface AuthenticateController {
  user?: User;
  userId?: string;
  isUser: (another: any) => boolean;
  isAuthenticate: boolean;
}

export const AuthContext = createContext<AuthenticateController>({
  isUser: (another) => false,
  isAuthenticate: false,
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

  const value = useMemo(
    () => ({
      user,
      isUser,
      userId: user?.getId(),
      isAuthenticate: !!user?.getId(),
    }),
    [user, isUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

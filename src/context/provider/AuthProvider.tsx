import useAppDispatch from "@hooks/useAppDispatch";
import { fetchProfile } from "@store/repo/user";
import { updateUser } from "@store/slices/profiles";
import string from "@utils/string";
import { createContext, FC, useCallback, useState, useEffect } from "react";

interface AuthenticateController {
  user?: User;
  updateAuthUser: (user?: User) => void;
  isUser: (another: User) => boolean;
}

export const AuthContext = createContext<AuthenticateController>({
  updateAuthUser: (user?: User) => {
    throw new Error("Feature not implement");
  },
  isUser: (another) => false,
});

export const AuthProvider: FC<Components> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const dispatch = useAppDispatch();
  const updateAuthUser = useCallback((user?: User) => {
    setUser(user);
  }, []);

  const isUser = useCallback(
    (another: User) => {
      return !!user && string.getId(another) === string.getId(user);
    },
    [user]
  );

  useEffect(() => {
    if (!user) return;
    dispatch(updateUser(user));
    const promise = dispatch(fetchProfile());
    return () => promise.abort();
  }, [user, dispatch]);

  return (
    <AuthContext.Provider value={{ user, updateAuthUser, isUser }}>
      {children}
    </AuthContext.Provider>
  );
};

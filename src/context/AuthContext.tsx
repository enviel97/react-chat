import { createContext, FC, useCallback, useState, useEffect } from "react";

interface AuthenticateController {
  user?: User;
  updateAuthUser: (user: User) => void;
}

export const AuthContext = createContext<AuthenticateController>({
  updateAuthUser: (user: User) => {},
});

export const AuthProvider: FC<Components> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const updateAuthUser = useCallback((user: User) => {
    setUser(user);
  }, []);

  useEffect(() => {
    if (user) {
      console.log({ user });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, updateAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

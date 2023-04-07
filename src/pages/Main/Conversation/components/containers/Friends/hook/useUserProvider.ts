import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const useUserProvider = () => {
  return useContext(UserContext);
};

export default useUserProvider;

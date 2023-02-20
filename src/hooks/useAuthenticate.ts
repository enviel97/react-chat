import { AuthContext } from "@context/provider/AuthProvider";
import { useContext } from "react";

const useAuthenticate = () => {
  return useContext(AuthContext);
};
export default useAuthenticate;

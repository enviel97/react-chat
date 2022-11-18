import { AuthContext } from "@context/AuthContext";
import { useContext } from "react";

const useAuthenticate = () => {
  return useContext(AuthContext);
};
export default useAuthenticate;

import { useContext } from "react";
import { MenuContext } from "..";

const useContextMenu = () => {
  const context = useContext(MenuContext);
  return context;
};

export default useContextMenu;

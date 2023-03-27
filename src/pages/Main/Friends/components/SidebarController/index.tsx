import useAppSelector from "@hooks/useAppSelector";
import selectTabFriends from "@store/slices/ui/selector/getTabFriends";
import { Navigate } from "react-router-dom";

const SidebarController = () => {
  const tabSelected = useAppSelector(selectTabFriends);
  return <Navigate to={tabSelected} replace />;
};
export default SidebarController;

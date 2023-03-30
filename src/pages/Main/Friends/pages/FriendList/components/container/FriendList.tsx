import useAppSelector from "@hooks/useAppSelector";
import { selectUserIds } from "@store/slices/users";
import { lazy, useMemo } from "react";
import { FriendListItemsContainer } from "../../styles/FriendList.decorate";
import ListFriendEmpty from "./ListFriendEmpty";

const FriendListItem = lazy(() => import("../ui/FriendListItem"));

const FriendList = () => {
  const data = useAppSelector(selectUserIds);
  const Friends = useMemo(() => {
    if (!data) return <>Loading...</>;
    if (data.length === 0) return <ListFriendEmpty />;
    return data.map((value, index) => {
      const id = value.toString();
      return <FriendListItem key={`${value}$${index}`} friendId={id} />;
    });
  }, [data]);

  return <FriendListItemsContainer>{Friends}</FriendListItemsContainer>;
};
export default FriendList;

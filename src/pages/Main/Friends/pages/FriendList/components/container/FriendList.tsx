import useAppSelector from "@hooks/useAppSelector";
import { selectUserIds } from "@store/slices/users";
import { Suspense, lazy, useMemo } from "react";
import { FriendListItemsContainer } from "../../styles/FriendList.decorate";
import ListFriendEmpty from "./ListFriendEmpty";
import { isSuccess } from "@utils/validate";
import FriendListItemLoading from "../ui/FriendListItemLoading";

const FriendListItem = lazy(() => import("../ui/FriendListItem"));

const FriendList = () => {
  const data = useAppSelector(selectUserIds);
  const status = useAppSelector((state) => state.user.process);
  const Friends = useMemo(() => {
    if (!data) return <>Loading...</>;
    if (data.length === 0 && isSuccess(status)) {
      return <ListFriendEmpty />;
    }
    return data.map((value, index) => {
      const id = value.toString();
      return (
        <Suspense
          key={`${value}$${index}`}
          fallback={<FriendListItemLoading />}
        >
          <FriendListItem friendId={id} />
        </Suspense>
      );
    });
  }, [data, status]);

  return <FriendListItemsContainer>{Friends}</FriendListItemsContainer>;
};
export default FriendList;

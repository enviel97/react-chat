import useAppSelector from "@hooks/useAppSelector";
import { selectUserIds } from "@store/slices/users";
import { lazy, Suspense } from "react";
import { FriendListItemsContainer } from "../../styles/FriendList.decorate";
import FriendListItemLoading from "../ui/FriendListItemLoading";
import ListFriendEmpty from "./ListFriendEmpty";

const FriendListItem = lazy(() => import("../ui/FriendListItem"));

const FriendList = () => {
  const data = useAppSelector(selectUserIds);

  return (
    <FriendListItemsContainer>
      {data === undefined ? (
        "Loading..."
      ) : data.length === 0 ? (
        <ListFriendEmpty />
      ) : (
        data.map((value, index) => {
          const id = value.toString();
          return (
            <Suspense
              key={`${id}$${index}`}
              fallback={<FriendListItemLoading />}
            >
              <FriendListItem friendId={id} />
            </Suspense>
          );
        })
      )}
    </FriendListItemsContainer>
  );
};
export default FriendList;

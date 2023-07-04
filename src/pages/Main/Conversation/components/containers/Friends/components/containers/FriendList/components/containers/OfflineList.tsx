import useAppSelector from "@hooks/useAppSelector";
import { selectOffline } from "@store/slices/users";
import { AnimatePresence } from "framer-motion";
import { lazy, memo, Suspense } from "react";
import { FriendListAnimate } from "../../styles/FriendList.animate";
import { FriendListPartContainer } from "../../styles/FriendList.decorate";
import { FriendListItemContainer } from "../../styles/FriendListItem.decorate";
import FriendListEmpty from "../ui/FriendListEmpty";
import FriendListHeader from "../ui/FriendListHeader";
import FriendListItemLoading from "../ui/FriendListItemLoading";
const FriendListItem = lazy(() => import("../ui/FriendListItem"));

const OfflineList = () => {
  const ids = useAppSelector(selectOffline);
  return (
    <FriendListPartContainer>
      <FriendListHeader title='Offline' quantity={ids.length} />
      {ids.length === 0 && <FriendListEmpty />}
      <AnimatePresence mode='popLayout'>
        {ids.map((id, index) => {
          return (
            <FriendListItemContainer
              key={`${id}$${index}`}
              {...FriendListAnimate.item}
              custom={index}
              layout
            >
              <Suspense
                key={`${id}$${index}`}
                fallback={<FriendListItemLoading />}
              >
                <FriendListItem friendId={id.toString()} />
              </Suspense>
            </FriendListItemContainer>
          );
        })}
      </AnimatePresence>
    </FriendListPartContainer>
  );
};

export default memo(OfflineList);
